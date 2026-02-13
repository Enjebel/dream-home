const Property = require('../models/Property');

// @desc    Get all properties
// @route   GET /api/properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get logged-in user's properties
// @route   GET /api/properties/myproperties
exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings" });
  }
};

// @desc    Get single property details
// @route   GET /api/properties/:id
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Invalid Property ID" });
  }
};

// @desc    Create a new property
// @route   POST /api/properties
exports.createProperty = async (req, res) => {
  try {
    const { title, description, price, location, bedrooms, bathrooms, size, images } = req.body;

    // Force Number conversion so the database saves actual digits
    const property = new Property({
      owner: req.user._id,
      title,
      description,
      price: Number(price),
      location,
      bedrooms: Number(bedrooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      size: Number(size) || 0,
      images: images || [],
      reviews: [] // Initialize as empty to prevent the 'map' error on frontend
    });

    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error("Creation Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Add a review
// @route   POST /api/properties/:id/reviews
exports.addPropertyReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const property = await Property.findById(req.params.id);

    if (property) {
      // Check if user already reviewed this property
      const alreadyReviewed = property.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Property already reviewed' });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      property.reviews.push(review);

      // Optional: Calculate overall rating of the property
      if (property.reviews.length > 0) {
        property.rating = 
          property.reviews.reduce((acc, item) => item.rating + acc, 0) / 
          property.reviews.length;
      }

      await property.save();
      res.status(201).json({ message: 'Review added successfully' });
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    console.error("Review Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      // Check if user is the owner
      if (property.owner.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "User not authorized" });
      }
      
      await property.deleteOne();
      res.status(200).json({ message: "Property removed" });
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting property" });
  }
};