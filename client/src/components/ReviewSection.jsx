import React from 'react';

const ReviewSection = ({ reviews = [] }) => {
  return (
    <div className="mt-12 border-t pt-10">
      <h3 className="text-2xl font-black text-gray-900 mb-8">User Reviews</h3>
      
      <div className="space-y-6">
        {/* FIX: Check if reviews exists and has items before mapping */}
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-800">{review.name || "Anonymous"}</span>
                <div className="flex text-yellow-400 text-sm">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <p className="text-gray-600 italic">"{review.comment}"</p>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 rounded-3xl p-8 text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium italic">No reviews yet for this property.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;