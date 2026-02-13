import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const InfoPage = ({ title, content }) => {
  const navigate = useNavigate();

  // Ensure page starts at the top when opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 text-gray-400 hover:text-blue-600 mb-12 font-bold transition-all"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          BACK
        </button>
        
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-gray-900 leading-none">
            {title}<span className="text-blue-600">.</span>
          </h1>
          <div className="h-2 w-24 bg-blue-600 mt-4"></div>
        </header>

        {/* Content Body */}
        <div className="prose prose-xl max-w-none">
          <p className="text-xl text-gray-600 font-medium leading-relaxed whitespace-pre-line">
            {content}
          </p>
        </div>

        {/* Action Footer */}
        <div className="mt-20 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Still have questions?</h3>
            <p className="text-gray-500">Our luxury support team is ready to help.</p>
          </div>
          <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;