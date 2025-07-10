const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    default: null
  },
  clickCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
urlSchema.index({ shortCode: 1 });
urlSchema.index({ createdAt: 1 });

// Method to increment click count
urlSchema.methods.incrementClicks = function() {
  this.clickCount += 1;
  return this.save();
};

// Static method to check if URL is expired
urlSchema.statics.isExpired = function(expiryDate) {
  if (!expiryDate) return false;
  return new Date() > expiryDate;
};

module.exports = mongoose.model('Url', urlSchema); 