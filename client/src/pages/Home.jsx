import React, { useState, useEffect } from 'react';
import { Search, MapPin, Home as HomeIcon, Key, Hotel, Filter, SlidersHorizontal } from 'lucide-react';
import API from '../api';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // NEW: Category state to handle the specific needs of Buyers, Renters, and Bookers
  const [activeCategory, setActiveCategory] = useState('buy'); 

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // Fetch properties filtered by category from the server
        const { data } = await API.get(`/properties?category=${activeCategory}`);
        setProperties(data);
      } catch (err) {
        console.error("Could not load properties", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [activeCategory]); // Refetch whenever the user switches roles/categories

  // Client-side search filtering within the active category
  const filteredProperties = properties.filter(p => 
    p.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[650px] flex items-center justify-center bg-slate-900 overflow-hidden">
        {/* Dynamic Background Image based on Category */}
        <img 
          src={
            activeCategory === 'buy' ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" :
            activeCategory === 'rent' ? "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80" :
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
          }
          className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-1000"
          alt="Luxury Real Estate"
        />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic leading-[0.85]">
            {activeCategory === 'buy' && <>Find Your <span className="text-blue-500">Sanctuary.</span></>}
            {activeCategory === 'rent' && <>Premium <span className="text-blue-500">Living.</span></>}
            {activeCategory === 'book' && <>Luxury <span className="text-blue-500">Escapes.</span></>}
          </h1>
          
          <p className="text-xl text-gray-200 mb-10 font-medium max-w-2xl mx-auto">
            The world's most exclusive marketplace for elite buyers, long-term renters, and global travelers.
          </p>

          {/* --- CATEGORY TOGGLE (The Choice Engine) --- */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { id: 'buy', label: 'Buy', icon: <HomeIcon size={18} /> },
              { id: 'rent', label: 'Rent', icon: <Key size={18} /> },
              { id: 'book', label: 'Stay', icon: <Hotel size={18} /> },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl ${
                  activeCategory === cat.id 
                  ? 'bg-blue-600 text-white shadow-blue-500/20 scale-105' 
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* SEARCH BOX */}
          <div className="bg-white p-2 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto border border-gray-100">
            <div className="flex items-center gap-3 px-6 py-4 w-full md:border-r border-gray-100">
              <MapPin className="text-blue-600" size={24} />
              <input 
                type="text" 
                placeholder={activeCategory === 'book' ? "Search resorts or hotels..." : "Enter city, state or zip..."}
                className="w-full outline-none text-gray-900 font-bold placeholder:text-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="w-full md:w-auto bg-slate-900 hover:bg-blue-600 text-white px-12 py-5 rounded-[1.5rem] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg">
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* --- MARKETPLACE FEED --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="h-[2px] w-8 bg-blue-600"></span>
               <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">Curated Collection</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 uppercase italic tracking-tighter">
              {activeCategory}ing <span className="text-gray-300">/</span> Marketplace
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <SlidersHorizontal size={14} /> {filteredProperties.length} Results
            </div>
            <select className="px-5 py-3 bg-white border border-gray-100 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-blue-500 transition outline-none cursor-pointer">
              <option>Sort: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[500px] bg-white border border-gray-100 animate-pulse rounded-[3rem]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {/* --- EMPTY STATE --- */}
        {filteredProperties.length === 0 && !loading && (
          <div className="text-center py-32 bg-white rounded-[4rem] border border-gray-100 shadow-sm">
            <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-blue-600" size={40} />
            </div>
            <h3 className="text-3xl font-black text-gray-900 uppercase italic">No Matches Found</h3>
            <p className="text-gray-500 font-medium max-w-md mx-auto mt-2">
              Our inventory for {activeCategory} is updating daily. Try adjusting your search or switching categories.
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-8 text-blue-600 font-black uppercase tracking-widest text-xs hover:underline"
            >
              Clear Search Query
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;