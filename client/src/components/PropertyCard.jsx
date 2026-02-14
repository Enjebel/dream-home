import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Star, Home as HomeIcon, Key, Hotel, Tag } from 'lucide-react';

const PropertyCard = ({ property }) => {
  // Logic to define the badge appearance based on category
  const getCategoryInfo = () => {
    switch (property.category) {
      case 'buy':
        return { 
          label: 'For Sale', 
          icon: <HomeIcon size={12} />, 
          styles: 'bg-blue-600 text-white shadow-blue-200',
          priceSuffix: '' 
        };
      case 'rent':
        return { 
          label: 'Rental', 
          icon: <Key size={12} />, 
          styles: 'bg-slate-900 text-white shadow-slate-200',
          priceSuffix: '/mo' 
        };
      case 'book':
        return { 
          label: 'Stay', 
          icon: <Hotel size={12} />, 
          styles: 'bg-amber-500 text-white shadow-amber-200',
          priceSuffix: '/night' 
        };
      default:
        return { 
          label: 'Featured', 
          icon: <Tag size={12} />, 
          styles: 'bg-gray-100 text-gray-600',
          priceSuffix: '' 
        };
    }
  };

  const category = getCategoryInfo();

  return (
    <Link 
      to={`/property/${property._id}`} 
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 block relative"
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={property.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image+Available'} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* THE CATEGORY BADGE */}
        <div className={`absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl z-10 ${category.styles}`}>
          {category.icon} {category.label}
        </div>

        {/* PRICE TAG */}
        <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl text-gray-900 font-black text-sm shadow-xl flex items-baseline gap-1">
          <span className="text-blue-600">$</span>
          {property.price?.toLocaleString()}
          <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{category.priceSuffix}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <MapPin size={14} className="mr-1.5 text-blue-500" /> {property.city || property.location}
          </div>
          <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
            <Star size={14} className="fill-current" /> 4.9
          </div>
        </div>

        <h3 className="text-xl font-black text-gray-900 mb-6 uppercase italic tracking-tighter group-hover:text-blue-600 transition-colors leading-tight">
          {property.title}
        </h3>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-50 text-gray-500 mb-6">
          <div className="flex flex-col items-center gap-1">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Bed size={16} /></div>
            <span className="text-xs font-black text-gray-900">{property.bedrooms || 0} Beds</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-gray-50">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Bath size={16} /></div>
            <span className="text-xs font-black text-gray-900">{property.bathrooms || 0} Baths</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Maximize size={16} /></div>
            <span className="text-xs font-black text-gray-900">{property.size ? `${(property.size / 1000).toFixed(1)}k` : '0'} ft²</span>
          </div>
        </div>

        <div className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 group-hover:bg-blue-600 transition-all shadow-xl shadow-slate-100 uppercase text-[10px] tracking-[0.2em]">
          Explore Residence
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;