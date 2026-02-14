import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Instagram, Twitter, Facebook, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Home className="text-white" size={20} />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">
              DREAM<span className="text-blue-500">HOME</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Making the search for your next luxury stay effortless and secure since 2026.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6">Explore</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/" className="hover:text-blue-400 transition">Search Properties</Link></li>
            <li><Link to="/add-property" className="hover:text-blue-400 transition">List Your Home</Link></li>
            <li><Link to="/agents" className="hover:text-blue-400 transition">Agents</Link></li>
            <li><Link to="/reviews" className="hover:text-blue-400 transition">Reviews</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/help" className="hover:text-blue-400 transition">Help Center</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400 transition">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
           <li><Link to="/safety" className="hover:text-blue-400 transition">Safety Center</Link></li>
          <li><Link to="/documentation" className="hover:text-blue-500 transition-colors">
  Project Documentation
</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6">Stay Updated</h4>
          <div className="relative mb-4">
            <form onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-slate-800 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-white"
              />
            </form>
          </div>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <Instagram size={20} className="hover:text-white cursor-pointer transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter size={20} className="hover:text-white cursor-pointer transition" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <Facebook size={20} className="hover:text-white cursor-pointer transition" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center gap-4">
        <p className="text-xs text-slate-500 font-medium">
          © 2026 DreamHome Real Estate. Built with passion for modern living.
        </p>
        <button 
          onClick={scrollToTop}
          className="bg-slate-800 p-3 rounded-full hover:bg-blue-600 transition group"
        >
          <ArrowUp size={16} className="text-white group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;