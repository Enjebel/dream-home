import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Heart, LayoutDashboard, PlusCircle, LogOut, Search, Key, Users, BookOpen } from 'lucide-react';
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
          <span className="text-2xl font-black tracking-tighter text-gray-900 uppercase">
            DREAM<span className="text-blue-600">HOME</span>
          </span>
        </Link>

        {/* NAVIGATION LINKS - Expanded for Buyers & Renters */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/" className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 font-bold transition">
            <Search size={18} /> Buy
          </Link>
          <Link to="/rent" className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 font-bold transition">
            <Key size={18} /> Rent
          </Link>
          <Link to="/agents" className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 font-bold transition">
            <Users size={18} /> Agents
          </Link>
          <Link to="/favorites" className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600 font-bold transition">
            <Heart size={18} /> Favorites
          </Link>
          
          {/* Technical Documentation Link */}
          <Link to="/documentation" className="flex items-center gap-1.5 text-blue-500 bg-blue-50 px-3 py-1 rounded-lg text-xs font-black uppercase hover:bg-blue-100 transition">
            <BookOpen size={14} /> The Blueprint
          </Link>
        </div>

        {/* AUTH / ACTIONS */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* List a Home Action (Owners/Agents) */}
              <Link 
                to="/add-property" 
                className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-lg shadow-blue-100"
              >
                <PlusCircle size={18} /> Sell
              </Link>

              <Link to="/dashboard" className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition" title="Dashboard">
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