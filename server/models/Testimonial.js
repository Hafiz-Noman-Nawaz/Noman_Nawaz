const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role or title is required'],
    },
    company: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    content: {
      type: String,
      required: [true, 'Recommendation content is required'],
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    order: {
      type: Number,
      default: 0,
    },
    approved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
