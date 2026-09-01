const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: true,
      enum: ['pageview', 'resume_download', 'project_click', 'inquiry_submit'],
      index: true,
    },
    target: {
      type: String,
      default: '',
    },
    visitorId: {
      type: String,
      default: '',
      index: true,
    },
    path: {
      type: String,
      default: '/',
    },
    deviceType: {
      type: String,
      default: 'Desktop',
    },
    referrer: {
      type: String,
      default: 'Direct',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analytics', analyticsSchema);
