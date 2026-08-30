const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Noman Nawaz',
    },
    title: {
      type: String,
      default: 'Full-Stack MERN Developer & UI/UX Motion Designer',
    },
    subtitle: {
      type: String,
      default: 'Crafting ultra-fluid, high-contrast, scalable digital experiences with modern web technologies.',
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    },
    ctaText: {
      type: String,
      default: 'Explore Projects',
    },
    ctaLink: {
      type: String,
      default: '#projects',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    availableForHire: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hero', heroSchema);
