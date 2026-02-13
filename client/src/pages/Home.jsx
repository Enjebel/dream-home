import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, Star } from 'lucide-react';
import API from '../api';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await API.get('/properties');
        setProperties(data);
      } catch (err) {
        console.error("Could not load properties", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(p => 
    p.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[500px] flex items-center justify-center bg-slate-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Luxury Home"
        />
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Find Your Next <span className="text-blue-500">Luxury</span> Stay
          </h1>
          <p className="text-xl text-gray-200 mb-10 font-medium">
            Browse thousands of high-end properties curated by top-tier agents worldwide.
          </p>

          {/* SEARCH BOX */}
          <div className="bg-white p-2 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 px-6 py-3 w-full border-b md:border-b-0 md:border-r border-gray-100">
              <MapPin className="text-blue-600" size={20} />
              <input 
                type="text" 
                placeholder="Enter city, neighborhood, or zip..."
                className="w-full outline-none text-gray-700 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition active:scale-95">
              <Search size={20} /> Search
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Featured Properties</h2>
            <p className="text-gray-500 mt-1">{filteredProperties.length} hand-picked stays found</p>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:border-blue-500 transition">Price</button>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-sm hover:border-blue-500 transition">Rating</button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[400px] bg-gray-200 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {filteredProperties.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No properties found</h3>
            <p className="text-gray-500">Try adjusting your search filters or city name.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;