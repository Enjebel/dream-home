import React, { useState, useEffect } from 'react';
import { Mail, Clock, CheckCircle2, ArrowRight, User, Tag, AlertCircle } from 'lucide-react';
import API from '../api';

const Inbox = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, completed

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/inquiries/my-inbox');
      setInquiries(data);
    } catch (err) {
      console.error("Inbox Fetch Error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Update inquiry status in DB and local state
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await API.patch(`/inquiries/${id}/status`, { status: newStatus });
      setInquiries(prev => 
        prev.map(msg => msg._id === id ? { ...msg, status: newStatus } : msg)
      );
    } catch (err) {
      alert("Failed to update message status");
    }
  };

  // Logic to filter the list based on sidebar selection
  const filteredInquiries = inquiries.filter(msg => {
    if (filter === 'all') return true;
    return msg.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic">Communications</h1>
            <p className="text-gray-500 font-medium">Manage your leads and booking requests in real-time.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
            {inquiries.filter(m => m.status === 'pending').length} Action Required
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-2">
            {['all', 'pending', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`w-full text-left px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-between ${
                  filter === f ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-white text-gray-400 hover:bg-gray-100'
                }`}
              >
                {f} Messages
                {f === 'pending' && inquiries.filter(m => m.status === 'pending').length > 0 && (
                  <span className={`w-2 h-2 rounded-full ${filter === 'pending' ? 'bg-white' : 'bg-blue-600'}`}></span>
                )}
              </button>
            ))}
          </div>

          {/* Messages List */}
          <div className="lg:col-span-3 space-y-4">
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-[2.5rem]" />)
            ) : filteredInquiries.length === 0 ? (
              <div className="bg-white p-20 rounded-[3rem] text-center border border-gray-100 shadow-sm">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase italic">No {filter !== 'all' ? filter : ''} items</h3>
                <p className="text-gray-500 font-medium">Your communication channel is currently clear.</p>
              </div>
            ) : (
              filteredInquiries.map((msg) => (
                <div 
                  key={msg._id} 
                  className={`bg-white p-6 rounded-[2.5rem] border transition-all flex flex-col md:flex-row md:items-center gap-6 ${
                    msg.status === 'pending' ? 'border-blue-100 shadow-md ring-1 ring-blue-50' : 'border-gray-50 opacity-75'
                  }`}
                >
                  <div className="flex-shrink-0 relative">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${
                      msg.status === 'pending' ? 'bg-slate-900' : 'bg-gray-200'
                    }`}>
                      <User size={24} />
                    </div>
                    {msg.status === 'pending' && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-md">
                        <Tag size={10} /> {msg.propertyCategory}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                        <Clock size={10} /> {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-gray-900 uppercase italic leading-tight">
                      {msg.senderName} <span className="text-gray-400 text-sm font-medium lowercase tracking-normal">via</span> {msg.propertyTitle}
                    </h4>
                    <p className="text-gray-500 mt-1 font-medium italic">"{msg.message}"</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <a 
                      href={`mailto:?subject=Inquiry regarding ${msg.propertyTitle}`}
                      className="bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-xs hover:bg-blue-600 transition shadow-lg flex items-center gap-2"
                    >
                      REPLY <ArrowRight size={14} />
                    </a>
                    
                    {msg.status === 'pending' ? (
                      <button 
                        onClick={() => handleStatusUpdate(msg._id, 'completed')}
                        className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition group"
                        title="Mark as Completed"
                      >
                        <CheckCircle2 size={20} />
                      </button>
                    ) : (
                      <div className="p-3 text-green-600 bg-green-50 rounded-xl">
                        <CheckCircle2 size={20} />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;