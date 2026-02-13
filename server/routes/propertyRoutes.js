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

// @route   GET & POST /api/properties
// Public can view all, but only logged-in users (protect) can create
router.route('/')
  .get(getProperties)
  .post(protect, createProperty);

// @route   GET /api/properties/myproperties
// Only logged-in users can see their own listings
router.get('/myproperties', protect, getMyProperties);

// @route   GET & DELETE /api/properties/:id
// Public can view details, but only owners (protected in controller) can delete
router.route('/:id')
  .get(getPropertyById)
  .delete(protect, deleteProperty);

// @route   POST /api/properties/:id/reviews
// This opens the "door" that was giving you the 404 error
router.route('/:id/reviews').post(protect, addPropertyReview);

module.exports = router;