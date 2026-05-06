import { Link } from "react-router-dom";
import { ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        // Just take the first 3 for featured
        setFeaturedProducts(data.products?.slice(0, 3) || []);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-100 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1600" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-6 font-serif">
            Student Life, <br/><span className="text-indigo-600 italic font-light">Elevated.</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            High-quality bags, accessories, study materials, and lifestyle items designed for the modern student. Find the balance between affordability and uncompromising style.
          </p>
          <Link
            to="/gallery"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-full font-medium transition-transform hover:scale-105 hover:bg-indigo-700 shadow-xl"
          >
            Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Featured Essentials</h2>
              <p className="text-slate-500 mt-2">Curated for your daily campus hustle.</p>
            </div>
            <Link to="/gallery" className="hidden sm:flex text-slate-600 hover:text-indigo-600 items-center font-medium">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-200">
                <div className="aspect-[4/5] overflow-hidden bg-white relative p-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.status === "sold" && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 border-t border-slate-100">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-slate-900">{product.name}</h3>
                    <span className="font-medium text-indigo-600">₦{parseFloat(product.price).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1 capitalize">{product.category.replace("-", " ")}</p>
                  <Link 
                    to={`/gallery`} 
                    className="mt-6 w-full inline-block text-center border font-medium border-slate-200 text-slate-900 py-2.5 rounded-full hover:bg-slate-50 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/gallery" className="text-stone-600 hover:text-stone-900 items-center font-medium inline-flex">
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Highlights */}
      <section className="py-20 bg-stone-900 text-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-stone-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-stone-400">Crafted with durable materials to survive campus life and beyond.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-stone-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Student Affordability</h3>
              <p className="text-stone-400">Luxury feels without the luxury price tag. Accessible for everyone.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-stone-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Service</h3>
              <p className="text-stone-400">Dedicated support to ensure you get exactly what you need, fast.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-center text-stone-900 mb-16">Loved by Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Sarah K.", role: "Design Student", text: "The Varsity Backpack perfectly fits my laptop and sketchbooks. The quality is unreal for the price." },
                { name: "Micheal O.", role: "Engineering Major", text: "I ordered via WhatsApp and got my bag the next day. Fast, easy, and the minimalist look is exactly what I wanted." },
                { name: "Amina T.", role: "Law Student", text: "Finally, a brand that understands we want stylish bags without breaking the bank. Highly recommend Luxe Student!" }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                  <div className="flex text-yellow-400 mb-4">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-stone-600 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-stone-900">{testimonial.name}</p>
                    <p className="text-xs text-stone-400 uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>
    </div>
  );
}
