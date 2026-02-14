import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Clock, CheckCircle2, ArrowRight, User, Tag, RefreshCcw } from 'lucide-react';
import API from '../api';

const Inbox = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pending, completed

  const fetchInquiries = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      else setRefreshing(true);
      
      const { data } = await API.get('/inquiries/my-leads');
      setInquiries(data);
    } catch (err) {
      console.error("Inbox Fetch Error", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
    const interval = setInterval(() => fetchInquiries(true), 60000);
    return () => clearInterval(interval);
  }, [fetchInquiries]);

  // Main status update function
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await API.patch(`/inquiries/${id}`, { status: newStatus });
      setInquiries(prev => 
        prev.map(msg => msg._id === id ? { ...msg, status: newStatus } : msg)
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  // NEW: Specifically handles the reply click
  const handleReplyClick = (msgId, currentStatus) => {
    // Only auto-update if it's currently pending
    if (currentStatus === 'pending') {
      handleStatusUpdate(msgId, 'contacted');
    }
  };

  const filteredInquiries = inquiries.filter(msg => {
    if (filter === 'all') return true;
    return msg.status === filter;
  });

  const pendingCount = inquiries.filter(m => m.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic">Communications</h1>
              <button 
                onClick={() => fetchInquiries(true)} 
                className={`p-2 rounded-full hover:bg-white transition-all ${refreshing ? 'animate-spin text-blue-600' : 'text-gray-300'}`}
              >
                <RefreshCcw size={20} />
              </button>
            </div>
            <p className="text-gray-500 font-medium">Manage your leads and booking requests in real-time.</p>
          </div>
          <div className={`px-4 py-2 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${
            pendingCount > 0 ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-white border-gray-100 text-gray-400'
          }`}>
            {pendingCount} Action Required
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {['all', 'pending', 'contacted', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`w-full text-left px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-between ${
                  filter === f ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-white text-gray-400 hover:bg-gray-100'
                }`}
              >
                {f}
                {f === 'pending' && pendingCount > 0 && (
                  <span className={`w-2 h-2 rounded-full ${filter === 'pending' ? 'bg-white' : 'bg-blue-600'}`}></span>
                )}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="lg:col-span-3 space-y-4">
            {loading ? (
              [1, 2].map(i => <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-[2.5rem]" />)
            ) : filteredInquiries.length === 0 ? (
              <div className="bg-white p-20 rounded-[3rem] text-center border border-gray-100">
                <Mail className="text-blue-600 mx-auto mb-4" size={24} />
                <h3 className="text-xl font-black uppercase italic">No {filter} items</h3>
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
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded-md">
                        <Tag size={10} className="inline mr-1" /> {msg.propertyCategory}
                      </span>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                        msg.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-gray-900 uppercase italic">
                      {msg.senderName} <span className="text-gray-400 text-sm font-medium lowercase">via</span> {msg.propertyTitle}
                    </h4>
                    <p className="text-gray-500 mt-1 font-medium italic">"{msg.message}"</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* The Reply Button with Auto-Status logic */}
                    <a 
                      href={`mailto:${msg.sender?.email}?subject=Re: Inquiry for ${msg.propertyTitle}`}
                      onClick={() => handleReplyClick(msg._id, msg.status)}
                      className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-xs hover:bg-blue-600 transition shadow-lg flex items-center gap-2"
                    >
                      REPLY <ArrowRight size={14} />
                    </a>
                    
                    {msg.status !== 'completed' && (
                      <button 
                        onClick={() => handleStatusUpdate(msg._id, 'completed')}
                        className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition"
                        title="Mark as Completed"
                      >
                        <CheckCircle2 size={20} />
                      </button>
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