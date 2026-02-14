const express = require('express');
const router = express.Router();
const { 
  getProperties, 
  getMyProperties,
  getPropertyById, 
  createProperty, 
  addPropertyReview,
  deleteProperty 
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/properties
// @desc    Public can view all properties (Supports ?category= query param)
// @route   POST /api/properties
// @desc    Only logged-in users can create listings
router.route('/')
  .get(getProperties)
  .post(protect, createProperty);

// @route   GET /api/properties/myproperties
// @desc    Dashboard view: Only logged-in users see their own listings
router.get('/myproperties', protect, getMyProperties);

// @route   GET /api/properties/:id
// @desc    Public can view property details
// @route   DELETE /api/properties/:id
// @desc    Only the owner (verified in controller) can delete
router.route('/:id')
  .get(getPropertyById)
  .delete(protect, deleteProperty);

// @route   POST /api/properties/:id/reviews
// @desc    Authenticated users can leave feedback
router.route('/:id/reviews').post(protect, addPropertyReview);

module.exports = router;