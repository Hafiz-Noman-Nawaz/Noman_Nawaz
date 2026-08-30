const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadStream } = require('../config/cloudinary');

// @route   GET /api/testimonials
// @desc    Get all testimonials (sorted by order)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve testimonials',
      error: error.message,
    });
  }
});

// @route   POST /api/testimonials/public
// @desc    Public review submission by clients and colleagues
// @access  Public
router.post('/public', upload.single('avatar'), async (req, res) => {
  try {
    const { name, role, company, content, rating, avatarUrl } = req.body;

    if (!name || !role || !content) {
      return res.status(400).json({
        success: false,
        message: 'Your name, role, and recommendation message are required',
      });
    }

    let finalAvatar = avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
    if (req.file) {
      finalAvatar = await uploadStream(req.file.buffer, 'noman_portfolio/testimonials');
    }

    const count = await Testimonial.countDocuments();

    const testimonial = await Testimonial.create({
      name: name.trim(),
      role: role.trim(),
      company: (company || '').trim(),
      content: content.trim(),
      rating: Math.min(Math.max(Number(rating) || 5, 1), 5),
      order: count + 1,
      avatar: finalAvatar,
      approved: true,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your endorsement has been published successfully.',
      data: testimonial,
    });
  } catch (error) {
    console.error('Public testimonial submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit recommendation',
      error: error.message,
    });
  }
});

// @route   POST /api/testimonials
// @desc    Create a testimonial (Admin)
// @access  Private (Admin)
router.post('/', protect, upload.single('avatar'), async (req, res) => {
  try {
    const { name, role, company, content, rating, order, avatarUrl } = req.body;

    if (!name || !role || !content) {
      return res.status(400).json({
        success: false,
        message: 'Name, role, and recommendation content are required',
      });
    }

    let finalAvatar = avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
    if (req.file) {
      finalAvatar = await uploadStream(req.file.buffer, 'noman_portfolio/testimonials');
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      company: company || '',
      content,
      rating: Number(rating) || 5,
      order: Number(order) || 0,
      avatar: finalAvatar,
      approved: true,
    });

    res.status(201).json({
      success: true,
      message: 'Testimonial added successfully',
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create testimonial',
      error: error.message,
    });
  }
});

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial
// @access  Private (Admin)
router.put('/:id', protect, upload.single('avatar'), async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    const { name, role, company, content, rating, order, avatarUrl, approved } = req.body;

    if (name) testimonial.name = name;
    if (role) testimonial.role = role;
    if (company !== undefined) testimonial.company = company;
    if (content) testimonial.content = content;
    if (rating !== undefined) testimonial.rating = Number(rating);
    if (order !== undefined) testimonial.order = Number(order);
    if (approved !== undefined) testimonial.approved = approved === 'true' || approved === true;

    if (req.file) {
      testimonial.avatar = await uploadStream(req.file.buffer, 'noman_portfolio/testimonials');
    } else if (avatarUrl) {
      testimonial.avatar = avatarUrl;
    }

    await testimonial.save();

    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update testimonial',
      error: error.message,
    });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete testimonial',
      error: error.message,
    });
  }
});

module.exports = router;
