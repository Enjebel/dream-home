import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, MapPin, DollarSign, Bed, Bath, Maximize, Film, Image as ImageIcon } from 'lucide-react';
import API from '../api';

const AddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Changed state to handle objects containing URL and TYPE (image/video)
  const [mediaFiles, setMediaFiles] = useState([]); 
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    size: ''
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const isVideo = file.type.startsWith('video/');
      const reader = new FileReader();
      
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setMediaFiles(prev => [...prev, {
          url: reader.result,
          type: isVideo ? 'video' : 'image'
        }]);
      };
    });
  };

  const removeMedia = (index) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (mediaFiles.length === 0) {
      return alert("Please upload at least one image or video.");
    }

    setLoading(true);
    try {
      // payload now includes the 'media' array for your updated Mongoose model
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        location: formData.location,
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        size: Number(formData.size) || 0,
        media: mediaFiles, // Array of {url, type}
        images: mediaFiles.filter(m => m.type === 'image').map(m => m.url) // Fallback for legacy code
      };

      await API.post('/properties', payload);
      alert('Property listed successfully with multi-media!');
      navigate('/dashboard');
    } catch (err) {
      console.error("Upload Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-10 text-white">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">List Your Home</h2>
          <p className="opacity-80 mt-2 font-medium">Add high-quality photos and videos to showcase your property.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-4">
            <input 
              className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-bold text-lg" 
              placeholder="Property Title"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required 
            />
            <textarea 
              rows="4"
              className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-medium" 
              placeholder="Property Description"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <DollarSign className="absolute left-4 top-5 text-gray-400" size={20} />
              <input 
                type="number"
                className="w-full p-5 pl-12 bg-gray-50 rounded-2xl outline-none font-bold" 
                placeholder="Price (USD)"
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required 
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-5 text-gray-400" size={20} />
              <input 
                className="w-full p-5 pl-12 bg-gray-50 rounded-2xl outline-none font-bold" 
                placeholder="Location"
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="relative">
              <Bed className="absolute left-4 top-5 text-blue-500" size={20} />
              <input type="number" placeholder="Beds" className="w-full p-5 pl-12 bg-gray-50 rounded-2xl outline-none font-bold" onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} />
            </div>
            <div className="relative">
              <Bath className="absolute left-4 top-5 text-blue-500" size={20} />
              <input type="number" placeholder="Baths" className="w-full p-5 pl-12 bg-gray-50 rounded-2xl outline-none font-bold" onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} />
            </div>
            <div className="relative">
              <Maximize className="absolute left-4 top-5 text-blue-500" size={20} />
              <input type="number" placeholder="Sqft" className="w-full p-5 pl-12 bg-gray-50 rounded-2xl outline-none font-bold" onChange={(e) => setFormData({...formData, size: e.target.value})} />
            </div>
          </div>

          {/* UPDATED MULTI-MEDIA UPLOAD SECTION */}
          <div className="space-y-4">
            <label className="flex flex-col items-center justify-center w-full h-44 border-4 border-dashed border-gray-100 rounded-[2.5rem] cursor-pointer hover:bg-gray-50 transition-all group">
              <Upload className="text-gray-300 mb-2 group-hover:text-blue-500 transition-colors" size={40} />
              <span className="text-gray-400 font-black uppercase text-xs tracking-widest">Upload Images & Videos</span>
              <input type="file" className="hidden" multiple onChange={handleFileChange} accept="image/*,video/*" />
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mediaFiles.map((file, i) => (
                <div key={i} className="relative h-32 rounded-2xl overflow-hidden group shadow-md border-2 border-white">
                  {file.type === 'video' ? (
                    <video src={file.url} className="w-full h-full object-cover" />
                  ) : (
                    <img src={file.url} className="w-full h-full object-cover" alt="preview" />
                  )}
                  
                  {/* Remove Button */}
                  <button 
                    type="button"
                    onClick={() => removeMedia(i)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:scale-110 transition"
                  >
                    <X size={14} />
                  </button>

                  {/* Type Indicator Icon */}
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm p-1.5 rounded-lg text-white">
                    {file.type === 'video' ? <Film size={14} /> : <ImageIcon size={14} />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl shadow-blue-100 disabled:bg-gray-400"
          >
            {loading ? "Publishing to Marketplace..." : "List Home Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;