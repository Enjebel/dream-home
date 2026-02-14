import React, { useEffect, useState } from 'react';
import { Plus, Home, Building2, AlertTriangle, Trash2, ExternalLink, Tag, TrendingUp, BarChart3, Users } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Dashboard = () => {
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetches listings specifically owned by the logged-in user
      const { data } = await API.get('/properties/myproperties');
      setMyProperties(data);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      setError(err.response?.data?.message || "Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing? This action cannot be undone.")) {
      try {
        await API.delete(`/properties/${id}`);
        setMyProperties(myProperties.filter(prop => prop._id !== id));
        alert("Property deleted successfully.");
      } catch (err) {
        console.error("Delete Error:", err);
        alert(err.response?.data?.message || "Failed to delete property.");
      }
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      <p className="mt-4 font-bold text-gray-500 uppercase tracking-widest italic">Syncing Portfolio...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="bg-red-50 p-4 rounded-full mb-4">
        <AlertTriangle className="text-red-500" size={40} />
      </div>
      <h2 className="text-2xl font-black text-gray-800">Connection Interrupted</h2>
      <p className="text-gray-600 mt-2 max-w-md">{error}</p>
      <button 
        onClick={fetchMyListings}
        className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
      >
        Retry Sync
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pt-28">
      {/* --- DASHBOARD HEADER & STATS --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic uppercase">Console Center</h1>
          <p className="text-gray-500 mt-2 text-lg font-medium flex items-center gap-2">
            <Building2 size={18} className="text-blue-600" />
            Active Portfolio: {myProperties.length} Properties
          </p>
        </div>
        <button 
          onClick={() => navigate('/add-property')}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-blue-100 hover:-translate-y-1"
        >
          <Plus size={20} /> LIST NEW ASSET
        </button>
      </div>

      {/* --- ANALYTICS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><TrendingUp size={24} /></div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Inquiries</p>
            <h4 className="text-2xl font-black text-gray-900">24 New</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-purple-50 p-4 rounded-2xl text-purple-600"><Users size={24} /></div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Visitors</p>
            <h4 className="text-2xl font-black text-gray-900">1.2k</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-green-50 p-4 rounded-2xl text-green-600"><BarChart3 size={24} /></div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Conversion</p>
            <h4 className="text-2xl font-black text-gray-900">8.4%</h4>
          </div>
        </div>
      </div>

      {myProperties.length === 0 ? (
        <div className="bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-gray-100 shadow-sm">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="text-blue-400" size={32} />
          </div>
          <h3 className="text-2xl font-black text-gray-800 mb-2">PORTFOLIO IS EMPTY</h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">You haven't added any listings. Buyers and Renters are waiting!</p>
          <Link to="/add-property" className="text-blue-600 font-black flex items-center justify-center gap-2 hover:underline uppercase tracking-tight">
            Launch First Listing <Plus size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myProperties.map(prop => (
            <div key={prop._id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={prop.image || 'https://via.placeholder.com/400x300'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={prop.title} 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl font-black text-blue-600 shadow-sm">
                  ${prop.price?.toLocaleString()}
                </div>
                {/* CATEGORY TAG */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black text-white uppercase tracking-tighter flex items-center gap-1.5">
                  <Tag size={12} className="text-blue-400" /> {prop.category || 'sale'}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-black text-gray-900 mb-1 truncate uppercase tracking-tighter italic">{prop.title}</h3>
                <p className="text-gray-400 font-bold text-sm mb-6 flex items-center gap-1">
                  <MapPin size={14} /> {prop.city || prop.location}
                </p>
                
                <div className="mt-auto flex gap-3">
                  <Link 
                    to={`/property/${prop._id}`}
                    className="flex-1 bg-gray-50 text-gray-600 py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink size={18} /> VIEW
                  </Link>
                  <button 
                    onClick={() => handleDelete(prop._id)}
                    className="p-4 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    title="Remove Asset"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Internal MapPin helper since it wasn't in the import list
const MapPin = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

export default Dashboard;