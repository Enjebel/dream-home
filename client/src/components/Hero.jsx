import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const Hero = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // This will eventually filter the properties on the Home page
    if (onSearch) onSearch(query);
  };

  return (
    <div className="relative h-[550px] flex items-center justify-center text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')",
          filter: "brightness(0.5)"
        }}
      ></div>

      <div className="relative z-10 text-center px-4 max-w-4xl w-full">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
          Find Your Next Luxury Stay
        </h1>
        <p className="text-xl mb-10 text-gray-200">
          Browse thousands of properties uploaded by top-tier agents.
        </p>

        {/* Search Bar for Searching Clients */}
        <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-3 flex-1">
            <MapPin className="text-blue-600" size={20} />
            <input 
              type="text" 
              placeholder="Enter city, neighborhood, or address..." 
              className="w-full outline-none text-gray-800"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition flex items-center gap-2 w-full md:w-auto justify-center">
            <Search size={20} /> Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;