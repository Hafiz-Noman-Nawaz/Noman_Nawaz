const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { protect } = require('../middleware/auth');

// @route   GET /api/settings
// @desc    Get profile settings & contact info
// @access  Public
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        fullName: 'Noman Nawaz',
        email: 'nawaznoman7766@gmail.com',
        phone: '+92 300 1234567',
        location: 'Available Worldwide / Remote',
        bio: 'Passionate Full-Stack MERN Developer and UI/UX Motion Designer focused on building dynamic, high-performance web applications and fluid interactive animations.',
        github: 'https://github.com/nomannawaz',
        linkedin: 'https://linkedin.com/in/nomannawaz',
        twitter: 'https://twitter.com/nomannawaz',
        instagram: 'https://instagram.com/nomannawaz',
        resumeUrl: '',
      });
    }

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve settings',
      error: error.message,
    });
  }
});

// @route   PUT /api/settings
// @desc    Update profile & contact info
// @access  Private (Admin)
router.put('/', protect, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    const {
      fullName,
      email,
      phone,
      location,
      bio,
      github,
      linkedin,
      twitter,
      instagram,
      resumeUrl,
      skills,
      hireRoles,
      statusText,
      currentActivity,
      musicTrack,
      isAvailable,
    } = req.body;

    if (fullName) settings.fullName = fullName;
    if (email) settings.email = email;
    if (phone) settings.phone = phone;
    if (location) settings.location = location;
    if (bio) settings.bio = bio;
    if (github !== undefined) settings.github = github;
    if (linkedin !== undefined) settings.linkedin = linkedin;
    if (twitter !== undefined) settings.twitter = twitter;
    if (instagram !== undefined) settings.instagram = instagram;
    if (resumeUrl !== undefined) settings.resumeUrl = resumeUrl;
    if (statusText !== undefined) settings.statusText = statusText;
    if (currentActivity !== undefined) settings.currentActivity = currentActivity;
    if (musicTrack !== undefined) settings.musicTrack = musicTrack;
    if (isAvailable !== undefined) settings.isAvailable = isAvailable === 'true' || isAvailable === true;

    // Handle hireRoles array
    if (hireRoles !== undefined) {
      if (typeof hireRoles === 'string') {
        try {
          settings.hireRoles = JSON.parse(hireRoles);
        } catch {
          // ignore error
        }
      } else if (Array.isArray(hireRoles)) {
        settings.hireRoles = hireRoles;
      }
    }

    // Handle skills array
    if (skills !== undefined) {
      if (typeof skills === 'string') {
        try {
          settings.skills = JSON.parse(skills);
        } catch {
          settings.skills = skills.split(',').map((s) => s.trim()).filter(Boolean);
        }
      } else if (Array.isArray(skills)) {
        settings.skills = skills;
      }
    }

    await settings.save();

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings,
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update settings',
      error: error.message,
    });
  }
});

module.exports = router;
