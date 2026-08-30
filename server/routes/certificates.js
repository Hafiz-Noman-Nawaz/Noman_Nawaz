const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadStream } = require('../config/cloudinary');

// @route   GET /api/certificates
// @desc    Get all certifications and awards
// @access  Public
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve certificates',
      error: error.message,
    });
  }
});

// @route   POST /api/certificates
// @desc    Create a certificate
// @access  Private (Admin)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, issuer, issueDate, credentialUrl, badgeColor, order, imageUrl } = req.body;

    if (!title || !issuer) {
      return res.status(400).json({
        success: false,
        message: 'Certificate title and issuing organization are required',
      });
    }

    let finalImage = imageUrl || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80';
    if (req.file) {
      finalImage = await uploadStream(req.file.buffer, 'noman_portfolio/certificates');
    }

    const certificate = await Certificate.create({
      title,
      issuer,
      issueDate: issueDate || '2025',
      credentialUrl: credentialUrl || '',
      badgeColor: badgeColor || 'emerald',
      order: Number(order) || 0,
      image: finalImage,
    });

    res.status(201).json({
      success: true,
      message: 'Certificate created successfully',
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create certificate',
      error: error.message,
    });
  }
});

// @route   PUT /api/certificates/:id
// @desc    Update a certificate
// @access  Private (Admin)
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found',
      });
    }

    const { title, issuer, issueDate, credentialUrl, badgeColor, order, imageUrl } = req.body;

    if (title) certificate.title = title;
    if (issuer) certificate.issuer = issuer;
    if (issueDate !== undefined) certificate.issueDate = issueDate;
    if (credentialUrl !== undefined) certificate.credentialUrl = credentialUrl;
    if (badgeColor !== undefined) certificate.badgeColor = badgeColor;
    if (order !== undefined) certificate.order = Number(order);

    if (req.file) {
      certificate.image = await uploadStream(req.file.buffer, 'noman_portfolio/certificates');
    } else if (imageUrl) {
      certificate.image = imageUrl;
    }

    await certificate.save();

    res.json({
      success: true,
      message: 'Certificate updated successfully',
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update certificate',
      error: error.message,
    });
  }
});

// @route   DELETE /api/certificates/:id
// @desc    Delete certificate
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found',
      });
    }

    res.json({
      success: true,
      message: 'Certificate deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete certificate',
      error: error.message,
    });
  }
});

module.exports = router;
