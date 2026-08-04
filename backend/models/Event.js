const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  category: {
    type: String,
    enum: ['auctions', 'sports', 'yachts', 'arts', 'wine', 'experiences'],
    required: true
  },
  subcategory: { type: String, trim: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  location: {
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    venue: { type: String, trim: true },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  pricing: {
    currency: { type: String, default: 'USD' },
    minPrice: Number,
    maxPrice: Number,
    entryFee: Number,
    displayPrice: { type: String, trim: true }
  },
  ticketUrl: { type: String, trim: true },
  officialUrl: { type: String, trim: true },
  imageUrl: { type: String, trim: true },
  tier: {
    type: String,
    enum: ['free', 'premium'],
    default: 'premium'
  },
  source: {
    name: { type: String, trim: true },
    url: { type: String, trim: true },
    scrapedAt: Date
  },
  tags: [{ type: String, trim: true }],
  attendees: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

eventSchema.index({ category: 1, startDate: 1 });
eventSchema.index({ tier: 1 });
eventSchema.index({ tags: 1 });
eventSchema.index({ isFeatured: 1 });
eventSchema.index({ startDate: 1 });

eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', eventSchema);
