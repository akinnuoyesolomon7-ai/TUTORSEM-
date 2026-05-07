import express from "express";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";
import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

// Initialize Supabase Client
let supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
let supabase: any = null;

if (supabaseUrl && supabaseKey) {
  // If the user accidentally provided the REST URL instead of the Project URL, fix it
  if (supabaseUrl.endsWith('/rest/v1/')) {
    supabaseUrl = supabaseUrl.replace('/rest/v1/', '');
  } else if (supabaseUrl.endsWith('/rest/v1')) {
    supabaseUrl = supabaseUrl.replace('/rest/v1', '');
  }
  
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log("Supabase client initialized with URL:", supabaseUrl);
}

// Initialize Data Storage
const DATA_DIR = path.resolve(process.cwd(), "data");
const DATA_FILE = path.resolve(DATA_DIR, "products.json");
const UPLOADS_DIR = path.resolve(process.cwd(), "uploads");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Initial dummy products if none exist
if (!fs.existsSync(DATA_FILE)) {
  const initialData = [
    {
      id: "1",
      name: "Classic Student Tote",
      price: 15000,
      category: "bags",
      status: "available",
      image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "2",
      name: "Minimal Varsity Backpack",
      price: 25000,
      category: "bags",
      status: "available",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "3",
      name: "Standard Ruled Notebooks (Pack of 5)",
      price: 3500,
      category: "materials",
      status: "sold",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "4",
      name: "Scientific Calculator FX-991EX",
      price: 18000,
      category: "materials",
      status: "available",
      image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "5",
      name: "Premium Female Care Bundle",
      price: 9500,
      category: "female-care",
      status: "available",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "6",
      name: "Skincare Travel Kit",
      price: 12000,
      category: "female-care",
      status: "available",
      image: "https://images.unsplash.com/photo-1556228720-1c27bef92bc6?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: "7",
      name: "Wireless ANC Earbuds",
      price: 14500,
      category: "electronics",
      status: "available",
      image: "https://images.unsplash.com/photo-1628191010210-a59de33e5941?auto=format&fit=crop&q=80&w=600",
    }
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// Multer Setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  
  // Serve uploaded images statically
  app.use("/uploads", express.static(UPLOADS_DIR));

  // Helper to read data
  const readData = () => {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  };

  // Helper to write data
  const writeData = (data: any) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  };

  // ---- API ROUTES ----

  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      if (supabase) {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        return res.json({ products: data || [] });
      }
      const data = readData();
      res.json({ products: data });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Failed to read products", details: err.message });
    }
  });

  // Admin login check
  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    if (password === "Solomon12") {
      res.json({ success: true, token: "admin-auth-token-123" });
    } else {
      res.status(401).json({ success: false, error: "Invalid password" });
    }
  });

  // Middleware to check admin token (very simple for this use-case)
  const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token === "admin-auth-token-123") {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  // Add a new product
  app.post("/api/products", requireAuth, upload.single("image"), async (req, res) => {
    try {
      const { name, price, category } = req.body;
      const file = req.file;

      if (!name || !price || !category) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // If a file was uploaded, use the server's URL. Else fallback to an unsplash image or placeholder.
      const imageUrl = file 
        ? `/uploads/${file.filename}` 
        : (req.body.imageUrl || `https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600`); // Fallback

      if (supabase) {
        const { data, error } = await supabase
          .from('products')
          .insert([{ name, price: parseFloat(price), category, status: 'available', image: imageUrl }])
          .select()
          .single();
        
        if (error) throw error;
        return res.status(201).json({ product: data });
      }

      const newProduct = {
        id: Date.now().toString(),
        name,
        price: parseFloat(price),
        category,
        status: "available",
        image: imageUrl,
      };

      const products = readData();
      products.push(newProduct);
      writeData(products);

      res.status(201).json({ product: newProduct });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Failed to add product", details: err.message });
    }
  });

  // Update product status (e.g. available <-> sold)
  app.put("/api/products/:id/status", requireAuth, async (req, res) => {
    try {
      const { status } = req.body;
      
      if (supabase) {
        const { data, error } = await supabase
          .from('products')
          .update({ status })
          .eq('id', req.params.id)
          .select()
          .single();
          
        if (error) throw error;
        return res.json({ product: data });
      }
      
      const products = readData();
      const productIndex = products.findIndex((p: any) => p.id === req.params.id);

      if (productIndex === -1) return res.status(404).json({ error: "Product not found" });

      products[productIndex].status = status;
      writeData(products);

      res.json({ product: products[productIndex] });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Failed to update product", details: err.message });
    }
  });

  // Delete product
  app.delete("/api/products/:id", requireAuth, async (req, res) => {
    try {
      if (supabase) {
        const { error } = await supabase.from('products').delete().eq('id', req.params.id);
        if (error) throw error;
        return res.json({ success: true });
      }
      
      let products = readData();
      products = products.filter((p: any) => p.id !== req.params.id);
      writeData(products);
      res.json({ success: true });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete product", details: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support React Router fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
