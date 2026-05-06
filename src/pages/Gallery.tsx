import { useState, useEffect } from "react";
import { MessageSquare, Filter, X } from "lucide-react";

export default function Gallery() {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(console.error);
  }, []);

  const filteredProducts = category === "all" 
    ? products 
    : products.filter(p => p.category === category);

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  const handleOrder = (product: any) => {
    const text = `Hello TUTORSEM'S EMPIRE, I am interested in purchasing the *${product.name}* (Price: ₦${parseFloat(product.price).toLocaleString()}). Is it still available?`;
    window.open(`https://wa.me/08154405635?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-slate-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 font-serif">Collection</h1>
            <p className="text-slate-500 mt-2">Find the perfect piece to complement your style.</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-slate-400 mr-2" />
            {categories.map((c: any) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === c 
                  ? "bg-indigo-600 text-white" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {c.replace("-", " ").charAt(0).toUpperCase() + c.replace("-", " ").slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 cursor-pointer flex flex-col h-full"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-[4/5] overflow-hidden bg-white relative p-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                {product.status === "sold" && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                    <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider shadow-lg">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between border-t border-slate-100">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                  </div>
                  <p className="text-sm text-slate-400 mt-1 capitalize">{product.category.replace("-", " ")}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-medium text-lg text-indigo-600">₦{parseFloat(product.price).toLocaleString()}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (product.status === "available") handleOrder(product);
                    }}
                    disabled={product.status === "sold"}
                    className={`p-2 rounded-full transition-colors ${
                      product.status === "available"
                      ? "bg-slate-100 text-slate-900 hover:bg-green-500 hover:text-white"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                    title={product.status === "available" ? "Order via WhatsApp" : "Sold out"}
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-slate-400">
            No products found in this category.
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row">
            <button 
              className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full text-slate-900 hover:bg-slate-200 z-10"
              onClick={() => setSelectedProduct(null)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="md:w-1/2 aspect-square md:aspect-auto bg-white p-6">
               <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-contain" />
            </div>
            
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center overflow-y-auto">
              <div className="uppercase tracking-widest text-xs font-semibold text-slate-400 mb-2">{selectedProduct.category.replace("-", " ")}</div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{selectedProduct.name}</h2>
              <p className="text-2xl font-medium text-indigo-600 mb-8">₦{parseFloat(selectedProduct.price).toLocaleString()}</p>
              
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-slate-900 mb-2 tracking-wide uppercase">Details</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Crafted for the modern student. Features premium materials, durable construction, and a minimalist aesthetic that perfectly blends utility and style. Fast shipping and exceptional customer service directly via WhatsApp.
                </p>
              </div>

              {selectedProduct.status === "available" ? (
                <button
                  onClick={() => handleOrder(selectedProduct)}
                  className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-colors flex items-center justify-center shadow-md shadow-green-200"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Order via WhatsApp
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-4 bg-slate-200 text-slate-500 rounded-full font-medium cursor-not-allowed border border-slate-300"
                >
                  Currently Sold Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
