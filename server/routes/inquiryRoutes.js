const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protect } = require('../middleware/authMiddleware');

// @desc    Create a new inquiry (Sent by Buyer/Booker)
// @route   POST /api/inquiries
router.post('/', protect, async (req, res) => {
  try {
    const { propertyId, ownerId, message, propertyTitle, propertyCategory, senderName } = req.body;
    
    const inquiry = await Inquiry.create({
      property: propertyId,
      owner: ownerId,
      sender: req.user._id,
      senderName,
      propertyTitle,
      propertyCategory,
      message
    });

    res.status(201).json(inquiry);
  } catch (error) {
    res.status(400).json({ message: "Failed to send inquiry" });
  }
});

// @desc    Get all inquiries for the logged-in owner (The Inbox)
// @route   GET /api/inquiries/my-inbox
router.get('/my-inbox', protect, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ owner: req.user._id })
      .sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Get count of unread (pending) inquiries for the owner
// @route   GET /api/inquiries/unread-count
// Used by Navbar to display notification badge
router.get('/unread-count', protect, async (req, res) => {
  try {
    const count = await Inquiry.countDocuments({ 
      owner: req.user._id, 
      status: 'pending' 
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error counting messages" });
  }
});

// @desc    Update inquiry status (Mark as Read/Contacted/Completed)
// @route   PATCH /api/inquiries/:id/status
// Allows owners to clear notifications and manage lead lifecycle
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    // Security Check: Ensure only the owner of the property can update the status
    if (inquiry && inquiry.owner.toString() === req.user._id.toString()) {
      inquiry.status = req.body.status || 'contacted';
      const updatedInquiry = await inquiry.save();
      res.json(updatedInquiry);
    } else {
      res.status(404).json({ message: "Inquiry not found or unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;