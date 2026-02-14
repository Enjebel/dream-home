import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, DollarSign, Camera, Info, Tag, Key, Hotel, Home as HomeIcon } from 'lucide-react';
import API from '../api';

const AddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    city: '',
    image: '',
    category: 'buy', // Matches the backend category filter
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Data preparation: Wrap the image in an array to match the Property Model
      const submissionData = {
        ...formData,
        images: [formData.image], 
        price: Number(formData.price)
      };

      // Sends the data to your updated controller
      await API.post('/properties', submissionData);
      navigate('/');
    } catch (err) {
      console.error("Error adding property:", err);
      alert("Failed to add property. Please ensure all fields are filled correctly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">List Your Asset</h1>
            <p className="text-gray-400 font-medium mt-1">Target buyers, renters, or travelers worldwide.</p>
          </div>
          {/* Decorative design element */}
          <div className="absolute top-0 right-0 w-32 h-full bg-blue-600 skew-x-12 translate-x-10 opacity-20"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {/* --- CATEGORY SELECTION --- */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
              <Tag size={14} className="text-blue-600" /> Select Listing Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'buy', label: 'For Sale', icon: <HomeIcon size={18} />, desc: 'Real Estate' },
                { id: 'rent', label: 'Rental', icon: <Key size={18} />, desc: 'Long-term' },
                { id: 'book', label: 'Stay', icon: <Hotel size={18} />, desc: 'Hospitality' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`flex flex-col items-start gap-1 p-5 rounded-[2rem] border-2 transition-all ${
                    formData.category === cat.id
                      ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-lg shadow-blue-100'
                      : 'border-gray-50 bg-gray-50/30 text-gray-400 hover:border-gray-200'
                  }`}
                >
                  <span className={formData.category === cat.id ? 'text-blue-600' : 'text-gray-300'}>
                    {cat.icon}
                  </span>
                  <span className="font-black uppercase tracking-tighter text-sm mt-2">{cat.label}</span>
                  <span className="text-[10px] opacity-60 font-bold uppercase tracking-widest">{cat.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Property Title</label>
              <div className="relative">
                <Building2 className="absolute left-5 top-4 text-gray-300" size={18} />
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Modern Penthouse..."
                  className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-bold"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">
                Price ({formData.category === 'buy' ? 'Total' : 'per Night'})
              </label>
              <div className="relative">
                <DollarSign className="absolute left-5 top-4 text-gray-300" size={18} />
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="0.00"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-bold"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Location & City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Full Address</label>
              <div className="relative">
                <MapPin className="absolute left-5 top-4 text-gray-300" size={18} />
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="123 Luxury Way..."
                  className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-bold"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">City</label>
              <input
                type="text"
                name="city"
                required
                placeholder="Beverly Hills"
                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-bold"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">High-Res Image URL</label>
            <div className="relative">
              <Camera className="absolute left-5 top-4 text-gray-300" size={18} />
              <input
                type="text"
                name="image"
                required
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-bold"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Executive Summary</label>
            <div className="relative">
              <Info className="absolute left-5 top-5 text-gray-300" size={18} />
              <textarea
                name="description"
                required
                rows="4"
                placeholder="Describe the unique value proposition of this property..."
                className="w-full pl-14 pr-6 py-5 bg-gray-50/50 border border-gray-100 rounded-[2rem] focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition font-medium italic"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Verifying & Publishing..." : "Deploy Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;