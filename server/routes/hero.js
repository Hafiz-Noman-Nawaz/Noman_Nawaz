const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadStream } = require('../config/cloudinary');

// @route   GET /api/hero
// @desc    Get hero section information
// @access  Public
router.get('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      // Create default if not found
      hero = await Hero.create({
        name: 'Noman Nawaz',
        title: 'Full-Stack MERN Developer & UI/UX Motion Designer',
        subtitle: 'Crafting ultra-fluid, high-contrast, scalable digital experiences with modern web technologies.',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        ctaText: 'Explore Projects',
        ctaLink: '#projects',
        availableForHire: true,
      });
    }

    res.json({
      success: true,
      data: hero,
    });
  } catch (error) {
    console.error('Error fetching hero:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hero information',
      error: error.message,
    });
  }
});

// @route   PUT /api/hero
// @desc    Update hero section data & optional image upload
// @access  Private (Admin)
router.put('/', protect, upload.single('image'), async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = new Hero();
    }

    const { name, title, subtitle, ctaText, ctaLink, resumeUrl, availableForHire, imageUrl: manualImageUrl } = req.body;

    if (name) hero.name = name;
    if (title) hero.title = title;
    if (subtitle) hero.subtitle = subtitle;
    if (ctaText) hero.ctaText = ctaText;
    if (ctaLink) hero.ctaLink = ctaLink;
    if (resumeUrl !== undefined) hero.resumeUrl = resumeUrl;
    if (availableForHire !== undefined) hero.availableForHire = availableForHire === 'true' || availableForHire === true;
    if (manualImageUrl && !req.file) hero.imageUrl = manualImageUrl;

    // Handle uploaded image to Cloudinary
    if (req.file) {
      const uploadedUrl = await uploadStream(req.file.buffer, 'noman_portfolio/hero');
      hero.imageUrl = uploadedUrl;
    }

    await hero.save();

    res.json({
      success: true,
      message: 'Hero section updated successfully',
      data: hero,
    });
  } catch (error) {
    console.error('Error updating hero:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update hero section',
      error: error.message,
    });
  }
});

module.exports = router;
