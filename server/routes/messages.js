const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');
const { sendInquiryAlert } = require('../utils/mailer');

// @route   POST /api/messages
// @desc    Submit a contact inquiry message
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message content are required',
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      message,
    });

    // Send real-time email alert in background
    sendInquiryAlert({ name, email, message }).catch((err) => {
      console.error('Email alert background error:', err.message);
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Thank you!',
      data: newMessage,
    });
  } catch (error) {
    console.error('Error submitting message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit message',
      error: error.message,
    });
  }
});

// @route   GET /api/messages
// @desc    Get all messages for admin inbox
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    const unreadCount = await Message.countDocuments({ read: false });

    res.json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages',
      error: error.message,
    });
  }
});

// @route   PUT /api/messages/:id/read
// @desc    Toggle message read status
// @access  Private (Admin)
router.put('/:id/read', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    message.read = req.body.read !== undefined ? req.body.read : !message.read;
    await message.save();

    res.json({
      success: true,
      message: 'Message status updated',
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update message status',
      error: error.message,
    });
  }
});

// @route   DELETE /api/messages/:id
// @desc    Delete message
// @access  Private (Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete message',
      error: error.message,
    });
  }
});

module.exports = router;
