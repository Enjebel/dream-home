const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const propertySchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    bedrooms: { type: Number, required: true, default: 0 },
    bathrooms: { type: Number, required: true, default: 0 },
    size: { type: Number, required: true, default: 0 },
    
    // NEW: Media array to handle both images and videos
    media: [
      {
        url: { type: String, required: true },
        type: { 
          type: String, 
          required: true, 
          enum: ['image', 'video'], 
          default: 'image' 
        },
      }
    ],

    // Original images array kept for safety/legacy display
    images: { type: [String], default: [] },
    
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;