import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, MapPin, Home as HomeIcon, Key, Hotel, 
  LayoutGrid, SlidersHorizontal, ArrowUpDown, ChevronDown 
} from 'lucide-react';
import API from '../api';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'low', 'high', 'newest'
  const [maxPrice, setMaxPrice] = useState(Infinity);
  
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl); 

  useEffect(() => {
    setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/properties?category=${activeCategory}`);
        setProperties(data);
      } catch (err) {
        console.error("Could not load properties", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [activeCategory]);

  // Handle Filtering and Sorting Logic
  const getProcessedProperties = () => {
    let list = properties.filter(p => 
      (p.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       p.title?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (p.price <= maxPrice)
    );

    if (sortOrder === 'low') list.sort((a, b) => a.price - b.price);
    if (sortOrder === 'high') list.sort((a, b) => b.price - a.price);
    
    return list;
  };

  const filteredProperties = getProcessedProperties();

  const getHeroImage = () => {
    switch(activeCategory) {
      case 'buy': return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80";
      case 'rent': return "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80";
      case 'book': return "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80";
      default: return "https://images.unsplash.com/photo-1512915920307-446f1f9d7f0a?auto=format&fit=crop&w=1920&q=80";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[600px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <img 
          key={activeCategory}
          src={getHeroImage()}
          className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-1000"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-50"></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic leading-[0.85]">
            {activeCategory === 'buy' && <>Find Your <span className="text-blue-500">Sanctuary.</span></>}
            {activeCategory === 'rent' && <>Premium <span className="text-blue-500">Living.</span></>}
            {activeCategory === 'book' && <>Luxury <span className="text-blue-500">Escapes.</span></>}
            {activeCategory === 'all' && <>The Global <span className="text-blue-500">Collection.</span></>}
          </h1>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['all', 'buy', 'rent', 'book'].map((id) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                  activeCategory === id ? 'bg-blue-600 text-white' : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
                }`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- QUICK FILTER BAR --- */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 p-4 border border-gray-100 flex flex-wrap items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl flex-grow">
            <Search size={18} className="text-blue-600" />
            <input 
              type="text" 
              placeholder="Quick search..."
              className="bg-transparent outline-none font-bold text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 rounded-2xl">
            <span className="text-[10px] font-black uppercase text-gray-400 mr-2">Budget</span>
            <select 
              className="bg-transparent font-bold text-sm outline-none cursor-pointer"
              onChange={(e) => setMaxPrice(e.target.value === 'all' ? Infinity : Number(e.target.value))}
            >
              <option value="all">Any Price</option>
              <option value="500000">Under $500k</option>
              <option value="1000000">Under $1M</option>
              <option value="5000000">Under $5M</option>
            </select>
          </div>

          {/* Sort Toggle */}
          <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 rounded-2xl">
            <ArrowUpDown size={16} className="text-blue-600" />
            <select 
              className="bg-transparent font-bold text-sm outline-none cursor-pointer"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- FEED --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
           <h2 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">
             {activeCategory} {activeCategory === 'all' ? 'Inventory' : 'Listings'}
           </h2>
           <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-widest">
             {filteredProperties.length} Properties Found
           </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;