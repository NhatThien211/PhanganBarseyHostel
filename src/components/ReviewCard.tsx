// src/components/ReviewCard.tsx
import React from 'react';

interface Review {
  author: string;
  rating: number;
  comment: string;
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex mb-4">{renderStars()}</div>
      <p className="text-gray-700 italic mb-4">"{review.comment}"</p>
      <p className="font-semibold text-gray-800">— {review.author}</p>
    </div>
  );
};

export default ReviewCard;