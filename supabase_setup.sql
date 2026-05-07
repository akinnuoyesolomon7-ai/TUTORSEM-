-- Supabase SQL script to create the products table

-- 1. Create the table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Insert dummy data (Optional)
INSERT INTO products (name, price, category, status, image)
VALUES
  ('Classic Student Tote', 15000, 'bags', 'available', 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=600'),
  ('Minimal Varsity Backpack', 25000, 'bags', 'available', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600'),
  ('Standard Ruled Notebooks (Pack of 5)', 3500, 'materials', 'sold', 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600'),
  ('Scientific Calculator FX-991EX', 18000, 'materials', 'available', 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=600'),
  ('Premium Female Care Bundle', 9500, 'female-care', 'available', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600'),
  ('Skincare Travel Kit', 12000, 'female-care', 'available', 'https://images.unsplash.com/photo-1556228720-1c27bef92bc6?auto=format&fit=crop&q=80&w=600'),
  ('Wireless ANC Earbuds', 14500, 'electronics', 'available', 'https://images.unsplash.com/photo-1628191010210-a59de33e5941?auto=format&fit=crop&q=80&w=600');

-- 3. Set up Row Level Security (RLS) policies
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all products
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- Allow authenticated users (admin) to insert/update/delete
CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON products
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated delete" ON products
  FOR DELETE TO authenticated USING (true);
