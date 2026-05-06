import React, { useState, useEffect } from "react";
import { LogIn, Plus, Trash2, Edit2, LogOut, Image as ImageIcon } from "lucide-react";

export default function Admin() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("adminToken"));
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "bags" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const fetchProducts = () => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(console.error);
  };
  
  useEffect(() => {
    fetchProducts();
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        setToken(data.token);
        localStorage.setItem("adminToken", data.token);
      } else {
        setError(data.error || "Invalid password");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
  };

  const handleDelete = async (id: string) => {
    // Remove window.confirm as it is blocked in iframes
    
    setError("");
    
    // Optimistic UI update
    setProducts(prev => prev.filter(p => p.id !== id));
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) {
        // Revert on failure
        fetchProducts();
        setError("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      fetchProducts();
      setError("Failed to delete product");
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "available" ? "sold" : "available";
    setError("");
    
    // Optimistic update
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    
    try {
      const res = await fetch(`/api/products/${id}/status`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) {
         fetchProducts();
         setError("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      fetchProducts();
      setError("Failed to update status");
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });
      
      if (!res.ok) throw new Error("Failed to add product");
      
      const result = await res.json();
      
      if (result.product) {
         setProducts(prev => [...prev, result.product]);
      } else {
         fetchProducts();
      }
      
      setNewProduct({ name: "", price: "", category: "bags" });
      setSelectedFile(null);
      setIsAdding(false);
    } catch (err) {
      console.error(err);
      // Remove alert because it doesn't work in iframes
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 font-serif">Admin Access</h2>
            <p className="text-slate-500 mt-2">Please enter the admin password</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Verifying..." : <><LogIn className="w-4 h-4 mr-2" /> Login</>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 font-serif mb-4 sm:mb-0">Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        </div>
        
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100">{error}</div>}

        {/* Add Product Form */}
        {isAdding && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Create New Product</h2>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price (₦)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="bags">Bags</option>
                  <option value="accessories">Accessories</option>
                  <option value="materials">Study Materials</option>
                  <option value="female-care">Female Care</option>
                  <option value="electronics">Electronics</option>
                  <option value="groceries">Groceries</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Image</label>
                <div className="flex items-center space-x-2">
                  <label className="flex-1 flex items-center justify-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                    <ImageIcon className="w-5 h-5 mr-2 text-slate-400" />
                    <span className="text-sm text-slate-600 truncate">
                      {selectedFile ? selectedFile.name : "Choose an image..."}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-2 text-slate-600 hover:text-slate-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Product List */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price (₦)</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.length === 0 ? (
                  <tr>
                     <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No products found.</td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-contain p-1 bg-white border border-slate-200 mr-4" />
                          <span className="font-medium text-slate-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">₦{parseFloat(product.price).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium capitalize">
                          {product.category.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStatus(product.id, product.status)}
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                            product.status === "available" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-rose-100 text-rose-700 hover:bg-rose-200"
                          }`}
                        >
                          {product.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
