import { Mail, Phone, MapPin, Send } from "lucide-react";
import React, { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }, 500);
  };

  return (
    <div className="bg-stone-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-4 font-serif">Get in Touch</h1>
          <p className="text-lg text-stone-500">Have a question about a product, your order, or just want to say hi? We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-stone-100 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-stone-900 mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium text-stone-900">WhatsApp / Call</h3>
                  <p className="mt-1 text-stone-500">Order directly, or ask us anything.</p>
                  <p className="mt-2 text-stone-900 font-medium">08154405635</p>
                  <p className="text-stone-900 font-medium">09154179991</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium text-stone-900">Email</h3>
                  <p className="mt-1 text-stone-500">For business inquiries and support.</p>
                  <p className="mt-2 text-stone-900 font-medium">hello@luxestudent.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium text-stone-900">Location</h3>
                  <p className="mt-1 text-stone-500">Campus Lifestyle Plaza</p>
                  <p className="text-stone-500">Uni-City, NG</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-stone-100">
             <h2 className="text-2xl font-bold text-stone-900 mb-8">Send a Message</h2>
             {submitted ? (
               <div className="bg-green-50 text-green-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center h-64 border border-green-100">
                 <Send className="w-10 h-10 mb-4 text-green-500" />
                 <p className="font-semibold text-lg">Message sent!</p>
                 <p className="text-green-600 mt-2">We'll get back to you shortly.</p>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                   <label htmlFor="name" className="block text-sm font-medium text-stone-700">Name</label>
                   <input
                     type="text"
                     id="name"
                     required
                     value={formState.name}
                     onChange={e => setFormState({...formState, name: e.target.value})}
                     className="mt-2 block w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:ring-stone-500 focus:border-stone-500 transition-colors"
                     placeholder="John Doe"
                   />
                 </div>
                 <div>
                   <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
                   <input
                     type="email"
                     id="email"
                     required
                     value={formState.email}
                     onChange={e => setFormState({...formState, email: e.target.value})}
                     className="mt-2 block w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:ring-stone-500 focus:border-stone-500 transition-colors"
                     placeholder="john@school.edu"
                   />
                 </div>
                 <div>
                   <label htmlFor="message" className="block text-sm font-medium text-stone-700">Message</label>
                   <textarea
                     id="message"
                     rows={5}
                     required
                     value={formState.message}
                     onChange={e => setFormState({...formState, message: e.target.value})}
                     className="mt-2 block w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:ring-stone-500 focus:border-stone-500 transition-colors resize-none"
                     placeholder="How can we help you?"
                   ></textarea>
                 </div>
                 <button
                   type="submit"
                   className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900"
                 >
                   Send Message
                 </button>
               </form>
             )}
          </div>

        </div>
      </div>
    </div>
  );
}
