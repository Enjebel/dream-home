import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, Bed, Bath, Maximize, Mail, Star, Send, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import API from '../api';
import ReviewSection from '../components/ReviewSection';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // States for Gallery and Reviews
  const [activeMedia, setActiveMedia] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchDetails = async () => {
    try {
      const { data } = await API.get(`/properties/${id}`);
      setProperty(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleContactAgent = () => {
    const email = property?.owner?.email || "agent@dreamhome.com";
    window.location.href = `mailto:${email}?subject=Inquiry: ${property?.title}`;
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post(`/properties/${id}/reviews`, { rating, comment });
      setComment('');
      setRating(5);
      fetchDetails(); 
      alert("Review posted successfully!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to post review.";
      alert(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black text-blue-600 italic">LOADING...</div>;
  if (!property) return <div className="text-center py-20 font-black">PROPERTY NOT FOUND</div>;

  // Combine media array or fallback to old images array
  const gallery = property.media?.length > 0 
    ? property.media 
    : property.images?.map(img => ({ url: img, type: 'image' })) || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-8 font-bold transition">
        <ArrowLeft size={20} /> BACK
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          
          {/* DYNAMIC MEDIA PLAYER / GALLERY */}
          <div className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl mb-6 border-8 border-white bg-black group">
            {gallery[activeMedia]?.type === 'video' ? (
              <video 
                key={gallery[activeMedia].url}
                src={gallery[activeMedia].url} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            ) : (
              <img 
                src={gallery[activeMedia]?.url} 
                className="w-full h-full object-cover transition-opacity duration-500" 
                alt={property.title} 
              />
            )}

            {/* Navigation Arrows (Only show if multiple items) */}
            {gallery.length > 1 && (
              <>
                <button 
                  onClick={() => setActiveMedia(prev => prev === 0 ? gallery.length - 1 : prev - 1)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition shadow-lg"
                >
                  <ChevronLeft size={30} />
                </button>
                <button 
                  onClick={() => setActiveMedia(prev => prev === gallery.length - 1 ? 0 : prev + 1)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition shadow-lg"
                >
                  <ChevronRight size={30} />
                </button>
              </>
            )}
          </div>

          {/* THUMBNAILS STRIP */}
          <div className="flex gap-4 mb-10 overflow-x-auto pb-2 no-scrollbar">
            {gallery.map((item, index) => (
              <div 
                key={index}
                onClick={() => setActiveMedia(index)}
                className={`relative min-w-[120px] h-24 rounded-2xl overflow-hidden cursor-pointer border-4 transition-all ${activeMedia === index ? 'border-blue-600 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <Play className="text-white fill-current" size={24} />
                  </div>
                ) : (
                  <img src={item.url} className="w-full h-full object-cover" alt="thumb" />
                )}
              </div>
            ))}
          </div>

          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase italic">{property.title}</h1>
          <p className="flex items-center text-blue-600 font-bold italic text-lg mb-10">
            <MapPin size={22} className="mr-2" /> {property.location}
          </p>

          <div className="flex gap-10 py-8 border-y border-gray-100 mb-10 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><Bed size={28} /></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase">Bedrooms</p><p className="text-xl font-black">{property.bedrooms || 0}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><Bath size={28} /></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase">Bathrooms</p><p className="text-xl font-black">{property.bathrooms || 0}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><Maximize size={28} /></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase">Area</p><p className="text-xl font-black">{property.size || 0} sqft</p></div>
            </div>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-12">{property.description}</p>
          
          <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 mb-12">
            <h3 className="text-2xl font-black mb-6 uppercase">Leave a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={28} 
                    className={`cursor-pointer transition-colors ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-6 rounded-2xl border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-medium" 
                placeholder="Share your experience with this property..." 
                required 
              />
              <button disabled={submitting} type="submit" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-blue-100">
                <Send size={18} /> {submitting ? "Posting..." : "POST REVIEW"}
              </button>
            </form>
          </div>

          <ReviewSection reviews={property.reviews || []} />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-50">
            <p className="text-gray-400 font-bold uppercase text-xs mb-2 tracking-widest">Listing Price</p>
            <div className="text-5xl font-black text-blue-600 mb-10 italic">${property.price?.toLocaleString()}</div>
            <button 
              onClick={handleContactAgent}
              className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3"
            >
              <Mail size={24} /> Contact Agent
            </button>
            <p className="text-center text-gray-400 text-xs mt-6 font-bold">Listed by {property.owner?.name || "DreamHome Agent"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;