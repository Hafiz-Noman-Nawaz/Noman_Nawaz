const express = require('express');
const router = express.Router();
const Timeline = require('../models/Timeline');
const { protect } = require('../middleware/auth');

// @route   GET /api/timeline
// @desc    Get all career milestones
// @access  Public
router.get('/', async (req, res) => {
  try {
    const milestones = await Timeline.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      count: milestones.length,
      data: milestones,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve timeline milestones',
      error: error.message,
    });
  }
});

// @route   POST /api/timeline
// @desc    Create a career milestone
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
  try {
    const { year, title, company, description, type, order } = req.body;

    if (!year || !title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Year, title, and description are required',
      });
    }

    const milestone = await Timeline.create({
      year,
      title,
      company: company || '',
      description,
      type: type || 'work',
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Timeline milestone created successfully',
      data: milestone,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create timeline milestone',
      error: error.message,
    });
  }
});

// @route   PUT /api/timeline/:id
// @desc    Update milestone
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const milestone = await Timeline.findById(req.params.id);
    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: 'Milestone not found',
      });
    }

    const { year, title, company, description, type, order } = req.body;

    if (year) milestone.year = year;
    if (title) milestone.title = title;
    if (company !== undefined) milestone.company = company;
    if (description) milestone.description = description;
    if (type) milestone.type = type;
    if (order !== undefined) milestone.order = Number(order);

    await milestone.save();

    res.json({
      success: true,
      message: 'Timeline milestone updated successfully',
      data: milestone,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update timeline milestone',
      error: error.message,
    });
  }
});

// @route   DELETE /api/timeline/:id
// @desc    Delete milestone
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const milestone = await Timeline.findByIdAndDelete(req.params.id);
    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: 'Milestone not found',
      });
    }

    res.json({
      success: true,
      message: 'Timeline milestone deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete timeline milestone',
      error: error.message,
    });
  }
});

module.exports = router;
