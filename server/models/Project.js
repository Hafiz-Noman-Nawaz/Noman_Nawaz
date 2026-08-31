const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Project date is required'],
      default: () => new Date().getFullYear().toString(),
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail image is required'],
    },
    gallery: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      required: [true, 'At least one tech stack item is required'],
      default: [],
    },
    description: {
      type: String,
      required: [true, 'Short description is required'],
    },
    caseStudy: {
      type: String,
      default: '',
    },
    liveUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    previewVideo: {
      type: String,
      default: '',
    },
    metrics: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    showOnResume: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
