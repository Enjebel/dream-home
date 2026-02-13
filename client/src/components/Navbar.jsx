import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Heart, LayoutDashboard, PlusCircle, LogOut, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <Home className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900">
            DREAM<span className="text-blue-600">HOME</span>
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-bold transition">Search</Link>
          <Link to="/favorites" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold transition">
            <Heart size={18} /> Favorites
          </Link>
        </div>

        {/* AUTH / ACTIONS */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Add Property Button (The "Listing Client" Action) */}
              <Link 
                to="/add-property" 
                className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-lg shadow-blue-100"
              >
                <PlusCircle size={18} /> List a Home
              </Link>

              <Link to="/dashboard" className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition">
                <LayoutDashboard size={22} />
              </Link>

              <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

              <div className="flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-2xl border border-gray-100">
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-black text-sm uppercase">
                  {user.name?.charAt(0)}
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 transition"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-bold px-4">Sign In</Link>
              <Link 
                to="/register" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition shadow-lg shadow-blue-100"
              >
                Join
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;