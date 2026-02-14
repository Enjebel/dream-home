import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, ArrowLeft, Bed, Bath, Maximize, Mail, Star, 
  Send, Play, ChevronLeft, ChevronRight, Calendar, 
  CreditCard, XCircle, MessageSquare 
} from 'lucide-react';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import ReviewSection from '../components/ReviewSection';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Gallery and Review States
  const [activeMedia, setActiveMedia] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Messaging/Inquiry States
  const [seekerMessage, setSeekerMessage] = useState('');
  const [sendingInquiry, setSendingInquiry] = useState(false);
  const [showInquirySent, setShowInquirySent] = useState(false);

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to leave a review");

    setSubmitting(true);
    try {
      const { data } = await API.post(`/properties/${id}/reviews`, {
        rating,
        comment,
        userName: user.name
      });
      setProperty(prev => ({
        ...prev,
        reviews: [data.review, ...(prev.reviews || [])]
      }));
      setComment('');
      alert("Review posted successfully!");
    } catch (err) {
      alert("Failed to post review.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- INTERNAL MESSAGING SYSTEM ---
  const handleSendInquiry = async () => {
    if (!user) return alert("Please login to send a message.");
    if (!seekerMessage.trim()) return alert("Message cannot be empty.");

    setSendingInquiry(true);
    try {
      await API.post(`/inquiries`, {
        propertyId: id,
        ownerId: property.owner?._id,
        message: seekerMessage,
        propertyTitle: property.title,
        propertyCategory: property.category
      });
      setShowInquirySent(true);
      setSeekerMessage('');
      setTimeout(() => setShowInquirySent(false), 5000);
    } catch (err) {
      alert("Error sending message.");
    } finally {
      setSendingInquiry(false);
    }
  };

  // --- EXTERNAL MAIL ACTION (FALLBACK) ---
  const handlePrimaryAction = () => {
    if (property.category === 'book') {
      alert(`Initiating booking for ${property.title}...`);
    } else {
      const email = property?.owner?.email || "agent@dreamhome.com";
      window.location.href = `mailto:${email}?subject=Inquiry: ${property?.title}`;
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-black text-blue-600 italic animate-pulse tracking-widest">LOADING LUXURY...</p>
    </div>
  );

  if (!property) return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <XCircle size={60} className="text-red-500 mb-4" />
      <h2 className="text-4xl font-black uppercase italic">Property Not Found</h2>
      <button onClick={() => navigate('/')} className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Return Home</button>
    </div>
  );

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
          
          {/* MEDIA GALLERY */}
          <div className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl mb-6 border-8 border-white bg-black group">
            {gallery[activeMedia]?.type === 'video' ? (
              <video key={gallery[activeMedia].url} src={gallery[activeMedia].url} controls autoPlay className="w-full h-full object-contain" />
            ) : (
              <img src={gallery[activeMedia]?.url} className="w-full h-full object-cover" alt={property.title} />
            )}

            {gallery.length > 1 && (
              <>
                <button onClick={() => setActiveMedia(prev => prev === 0 ? gallery.length - 1 : prev - 1)} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition"><ChevronLeft size={30} /></button>
                <button onClick={() => setActiveMedia(prev => prev === gallery.length - 1 ? 0 : prev + 1)} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition"><ChevronRight size={30} /></button>
              </>
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-4 mb-10 overflow-x-auto pb-2 no-scrollbar">
            {gallery.map((item, index) => (
              <div 
                key={index}
                onClick={() => setActiveMedia(index)}
                className={`relative min-w-[120px] h-24 rounded-2xl overflow-hidden cursor-pointer border-4 transition-all ${activeMedia === index ? 'border-blue-600 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center"><Play className="text-white fill-current" size={24} /></div>
                ) : (
                  <img src={item.url} className="w-full h-full object-cover" alt="thumb" />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-4">
             <span className="bg-blue-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                {property.category === 'buy' ? 'For Sale' : property.category === 'rent' ? 'For Rent' : 'Hotel/Stay'}
             </span>
          </div>

          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase italic">{property.title}</h1>
          <p className="flex items-center text-blue-600 font-bold italic text-lg mb-10">
            <MapPin size={22} className="mr-2" /> {property.location}, {property.city}
          </p>

          <div className="flex gap-10 py-8 border-y border-gray-100 mb-10 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><Bed size={28} /></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase">Beds</p><p className="text-xl font-black">{property.bedrooms || 0}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><Bath size={28} /></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase">Baths</p><p className="text-xl font-black">{property.bathrooms || 0}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><Maximize size={28} /></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase">Space</p><p className="text-xl font-black">{property.size || 0} sqft</p></div>
            </div>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-12">{property.description}</p>
          
          <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 mb-12">
            <h3 className="text-2xl font-black mb-6 uppercase">Guest Reviews</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={28} className={`cursor-pointer transition-colors ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} onClick={() => setRating(star)} />
                ))}
              </div>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-6 rounded-2xl border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-medium" placeholder="How was your experience here?" required />
              <button disabled={submitting} type="submit" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black flex items-center gap-2 hover:bg-black transition-all">
                <Send size={18} /> {submitting ? "POSTING..." : "SUBMIT REVIEW"}
              </button>
            </form>
          </div>

          <ReviewSection reviews={property.reviews || []} />
        </div>

        {/* --- STICKY CONTACT & INQUIRY CARD --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-50">
              <p className="text-gray-400 font-bold uppercase text-xs mb-2 tracking-widest">
                  {property.category === 'buy' ? 'Total Price' : property.category === 'rent' ? 'Monthly Rent' : 'Price per Night'}
              </p>
              <div className="text-5xl font-black text-blue-600 mb-8 italic">
                  ${property.price?.toLocaleString()}
                  {property.category !== 'buy' && <span className="text-lg text-gray-400 not-italic ml-2">/{property.category === 'rent' ? 'mo' : 'night'}</span>}
              </div>

              {/* NEW: QUICK INQUIRY FORM (Internal Messaging) */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                  <MessageSquare size={14} /> Send Inquiry
                </h4>
                <textarea 
                  value={seekerMessage}
                  onChange={(e) => setSeekerMessage(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full h-24 bg-white border border-slate-200 rounded-xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none mb-3"
                />
                <button 
                  onClick={handleSendInquiry}
                  disabled={sendingInquiry}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                >
                  {sendingInquiry ? "Sending..." : "Send Message"}
                </button>
                {showInquirySent && <p className="text-[10px] text-green-600 font-black mt-2 text-center uppercase animate-bounce">Message Sent to Dashboard!</p>}
              </div>

              {/* PRIMARY ACTION BUTTON (Email/Booking Fallback) */}
              <button 
                onClick={handlePrimaryAction}
                className={`w-full py-6 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 ${
                  property.category === 'book' ? 'bg-black text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-black'
                }`}
              >
                {property.category === 'book' ? <Calendar size={24} /> : <Mail size={24} />}
                {property.category === 'buy' ? 'Contact via Email' : property.category === 'rent' ? 'Apply Now' : 'Check Dates'}
              </button>
              
              <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-500 bg-gray-50 p-3 rounded-xl">
                      <CreditCard size={18} className="text-blue-600" />
                      Secure Guarantee
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;