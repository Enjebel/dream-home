import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Trash2, ExternalLink, Plus, MapPin, Tag, AlertCircle } from 'lucide-react';
import API from '../api';

const MyProperties = () => {
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null); // Tracking for delete confirmation

  const fetchMyProperties = async () => {
    try {
      const { data } = await API.get('/properties/myproperties');
      setMyProperties(data);
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/properties/${id}`);
      setMyProperties(myProperties.filter(p => p._id !== id));
      setDeleteId(null);
    } catch (err) {
      alert("Failed to remove property.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic">Inventory</h1>
            <p className="text-gray-500 font-medium">Manage your active listings across all categories.</p>
          </div>
          <Link 
            to="/add-property" 
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-100"
          >
            <Plus size={18} /> New Listing
          </Link>
        </header>

        {/* --- STATS SUMMARY --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Active Listings', value: myProperties.length, color: 'text-blue-600' },
            { label: 'Sales Value', value: `$${myProperties.filter(p => p.category === 'buy').reduce((acc, curr) => acc + curr.price, 0).toLocaleString()}`, color: 'text-slate-900' },
            { label: 'Rental/Stay Leads', value: myProperties.filter(p => p.category !== 'buy').length, color: 'text-green-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className={`text-3xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* --- LISTINGS TABLE/GRID --- */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-[2rem]" />)}
          </div>
        ) : myProperties.length === 0 ? (
          <div className="bg-white p-20 rounded-[4rem] text-center border border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 uppercase italic">Empty Portfolio</h3>
            <p className="text-gray-500 mt-2 mb-8 font-medium">You haven't listed any properties yet.</p>
            <Link to="/add-property" className="text-blue-600 font-black uppercase tracking-widest text-xs border-b-2 border-blue-600 pb-1">Start Listing</Link>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Property Details</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {myProperties.map((prop) => (
                  <tr key={prop._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={prop.images?.[0] || 'https://via.placeholder.com/100'} 
                          className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                          alt=""
                        />
                        <div>
                          <p className="font-black text-gray-900 uppercase italic tracking-tighter leading-tight">{prop.title}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-1 font-medium">
                            <MapPin size={12} /> {prop.city}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                        {prop.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-black text-gray-900">
                      ${prop.price?.toLocaleString()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/property/${prop._id}`} 
                          className="p-3 bg-gray-100 text-gray-500 rounded-xl hover:bg-slate-900 hover:text-white transition"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        
                        {deleteId === prop._id ? (
                          <div className="flex items-center gap-2 bg-red-50 p-1 rounded-xl border border-red-100">
                            <button 
                              onClick={() => handleDelete(prop._id)}
                              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-[10px] font-black uppercase"
                            >
                              Confirm
                            </button>
                            <button 
                              onClick={() => setDeleteId(null)}
                              className="px-3 py-1.5 text-gray-500 text-[10px] font-black uppercase"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setDeleteId(prop._id)}
                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;