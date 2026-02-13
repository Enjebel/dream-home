import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Star } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property._id}`} className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 block">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image+Available'} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-blue-600 font-black text-sm shadow-sm">
          ${property.price?.toLocaleString()}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
            <MapPin size={14} className="mr-1 text-blue-500" /> {property.location}
          </div>
          <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
            <Star size={14} className="fill-current" /> 4.5
          </div>
        </div>

        <h3 className="text-xl font-black text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">
          {property.title}
        </h3>

        {/* Stats Section */}
        <div className="flex justify-between items-center py-4 border-t border-gray-50 text-gray-500">
          <div className="flex items-center gap-2">
            <Bed size={18} className="text-blue-500" />
            <span className="font-bold text-gray-900">{property.bedrooms || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={18} className="text-blue-500" />
            <span className="font-bold text-gray-900">{property.bathrooms || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize size={18} className="text-blue-500" />
            <span className="font-bold text-gray-900">{property.size ? `${(property.size / 1000).toFixed(1)}k` : '0'}</span>
          </div>
        </div>

        <button className="w-full mt-4 bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 group-hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 uppercase text-xs tracking-widest">
          View Property
        </button>
      </div>
    </Link>
  );
};

export default PropertyCard;