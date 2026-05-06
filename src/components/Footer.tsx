import { Link } from "react-router-dom";
import { Instagram, Twitter, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">TUTORSEM'S EMPIRE</h3>
          <p className="text-sm text-slate-400 max-w-sm">
            Elevating the student lifestyle with minimalist, affordable, and high-quality materials and accessories.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-indigo-400 transition-colors">Shop</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
            <li><Link to="/admin" className="hover:text-indigo-400 transition-colors">Admin Login</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Get in Touch</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>akinnuoyesolomon7@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Campus Lifestyle Plaza</span>
            </li>
          </ul>
          <div className="flex space-x-4 mt-6">
            <a href="https://www.instagram.com/akinnnuoyesolomon?igsh=cnd3enAweDA4Mjc5" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="https://x.com/AkinnuoyeS10548" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} TUTORSEM'S EMPIRE. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for modern students.</p>
      </div>
    </footer>
  );
}
