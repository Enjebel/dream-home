import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, X, Home as HomeIcon, Heart, 
  PlusSquare, LayoutDashboard, LogOut, 
  MessageSquare, Building2, ChevronDown 
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCategoryClick = (category) => {
    // Navigate to Home page with a query parameter
    navigate(`/?category=${category}`);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <HomeIcon className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">
            Dream<span className="text-blue-600">Home</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => handleCategoryClick('buy')} className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition">Buy</button>
          <button onClick={() => handleCategoryClick('rent')} className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition">Rent</button>
          <button onClick={() => handleCategoryClick('book')} className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition">Stay</button>
          
          <div className="h-4 w-[1px] bg-gray-200 mx-2"></div>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 bg-slate-900 text-white pl-5 pr-3 py-3 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-100/20"
              >
                <span className="text-xs font-black uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                <div className="bg-white/20 p-1 rounded-lg">
                  <ChevronDown size={14} />
                </div>
              </button>

              {showDropdown && (
                <div className="absolute top-full right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-3 flex flex-col gap-1 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <Link to="/dashboard" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-2xl transition group">
                    <LayoutDashboard size={18} className="text-gray-400 group-hover:text-blue-600" />
                    <span className="text-sm font-bold text-gray-700">Profile Dashboard</span>
                  </Link>
                  <Link to="/my-properties" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-2xl transition group">
                    <Building2 size={18} className="text-gray-400 group-hover:text-blue-600" />
                    <span className="text-sm font-bold text-gray-700">My Inventory</span>
                  </Link>
                  <Link to="/inbox" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-2xl transition group">
                    <MessageSquare size={18} className="text-gray-400 group-hover:text-blue-600" />
                    <span className="text-sm font-bold text-gray-700">Messages</span>
                  </Link>
                  <Link to="/favorites" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-2xl transition group">
                    <Heart size={18} className="text-gray-400 group-hover:text-blue-600" />
                    <span className="text-sm font-bold text-gray-700">Favorites</span>
                  </Link>
                  <hr className="my-2 border-gray-50" />
                  <button 
                    onClick={() => { logout(); setShowDropdown(false); }}
                    className="flex items-center gap-3 p-4 hover:bg-red-50 text-red-500 rounded-2xl transition"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-bold">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-xs font-black uppercase tracking-widest text-gray-900">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition shadow-lg shadow-blue-100">Join</Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col gap-6 animate-in slide-in-from-right">
          <button onClick={() => handleCategoryClick('buy')} className="text-lg font-black uppercase italic text-left">Buy</button>
          <button onClick={() => handleCategoryClick('rent')} className="text-lg font-black uppercase italic text-left">Rent</button>
          <button onClick={() => handleCategoryClick('book')} className="text-lg font-black uppercase italic text-left">Stay</button>
          <hr />
          {user ? (
            <>
              <Link to="/my-properties" className="font-bold text-gray-600">My Inventory</Link>
              <Link to="/inbox" className="font-bold text-gray-600">Messages</Link>
              <button onClick={logout} className="text-red-500 font-bold text-left">Sign Out</button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest">Login / Register</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;