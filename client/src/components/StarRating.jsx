import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const StarRating = ({ rating = 0, reviews = 0, showCount = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={14} fill="currentColor" strokeWidth={1} />
        ))}
        {hasHalfStar && <StarHalf size={14} fill="currentColor" strokeWidth={1} />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={i} size={14} className="text-gray-200" strokeWidth={1} />
        ))}
      </div>
      
      {showCount && (
        <span className="text-[11px] font-bold text-gray-500">
          {rating.toFixed(1)} <span className="font-medium text-gray-400">({reviews})</span>
        </span>
      )}
    </div>
  );
};

export default StarRating;