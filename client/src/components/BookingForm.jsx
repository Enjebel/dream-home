import React, { useState } from 'react';
import { Calendar, Users, MessageSquare, Send } from 'lucide-react';

const BookingForm = ({ propertyType, propertyTitle }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    guests: 1,
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send notification to the landlord/agent
    alert(`Request sent for ${propertyTitle}! The host will contact you shortly.`);
  };

  return (
    <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
      <h4 className="text-lg font-black text-blue-900 mb-4 flex items-center gap-2">
        <Calendar size={20} /> 
        {propertyType === 'buy' ? 'Schedule a Private Tour' : 'Check Availability'}
      </h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {propertyType !== 'buy' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-blue-700 uppercase">Check In</label>
              <input 
                type="date" 
                className="w-full p-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-blue-700 uppercase">Check Out</label>
              <input 
                type="date" 
                className="w-full p-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold text-blue-700 uppercase">
            {propertyType === 'buy' ? 'Preferred Time' : 'Number of Guests'}
          </label>
          <div className="relative">
            {propertyType === 'buy' ? (
              <input type="time" className="w-full p-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
            ) : (
              <select className="w-full p-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-600 text-sm appearance-none">
                {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num}>{num} Guests</option>)}
              </select>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-blue-700 uppercase">Message to Host</label>
          <textarea 
            rows="3"
            placeholder="Any special requests?"
            className="w-full p-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm hover:bg-black transition-all flex items-center justify-center gap-2">
          <Send size={16} /> SEND REQUEST
        </button>
      </form>
    </div>
  );
};

export default BookingForm;