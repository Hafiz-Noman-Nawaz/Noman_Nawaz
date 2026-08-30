const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: [true, 'Timeline period or year is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Role or milestone title is required'],
      trim: true,
    },
    company: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Milestone description is required'],
    },
    type: {
      type: String,
      enum: ['work', 'education', 'award', 'project'],
      default: 'work',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Timeline', timelineSchema);
