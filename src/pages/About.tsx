import { Heart, Target, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800" 
                alt="Brand Story" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-indigo-600 rounded-full flex items-center justify-center p-8 text-center text-white italic font-serif z-10 hidden md:flex shadow-xl shadow-indigo-200">
              "Style isn't a luxury, it's a standard."
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6 font-serif">
              Our Story
            </h1>
            <div className="prose prose-slate prose-lg text-slate-600">
              <p>
                TUTORSEM'S EMPIRE began with a simple observation: students shouldn't have to choose between carrying their essentials in a generic, uninspiring way, or emptying their savings for premium lifestyle items.
              </p>
              <p>
                As students ourselves, we faced the daily struggle of lugging laptops, textbooks, and personal items across campus while needing necessary study materials and care items. We wanted bags, materials, and accessories that looked professional enough for a job interview, durable enough for daily commutes, and affordable enough on a student budget. When we couldn't find them, we created TUTORSEM'S EMPIRE.
              </p>
              <p>
                Today, TUTORSEM'S EMPIRE provides minimalist, high-quality bags, accessories, female care stuff, study materials, electronics, and lifestyle items designed specifically to elevate the everyday experience of students in higher institutions.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-slate-200 pt-16">
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 border border-slate-200 text-indigo-600">
                <Target className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-semibold mb-3 text-slate-900">Our Mission</h3>
             <p className="text-slate-600">To provide students with premium, stylish, and functional lifestyle accessories, study materials, and care items at an accessible price point, proving that luxury aesthetics don't require luxury price tags.</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 border border-slate-200 text-indigo-600">
                <Sparkles className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-semibold mb-3 text-slate-900">Our Vision</h3>
             <p className="text-slate-600">To become the go-to lifestyle and student empowerment brand for campuses nationwide, inspiring confidence and professionalism in students as they build their futures.</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 border border-slate-200 text-indigo-600">
                <Heart className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-semibold mb-3 text-slate-900">Our Values</h3>
             <p className="text-slate-600">We believe in minimalist design, enduring durability, and customer-centric service. Your success is our inspiration.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
