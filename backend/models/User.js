const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true, minlength: 6 },
  name: { type: String, trim: true },
  phone: { type: String, trim: true },
  avatar: { type: String, trim: true },
  tier: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  subscription: {
    plan: { type: String, enum: ['monthly', 'yearly'] },
    startedAt: Date,
    expiresAt: Date,
    razorpaySubscriptionId: { type: String, trim: true },
    razorpayOrderId: { type: String, trim: true },
    stripeCustomerId: { type: String, trim: true },
    stripeSubscriptionId: { type: String, trim: true }
  },
  preferences: {
    auctions: { type: Boolean, default: true },
    sports: { type: Boolean, default: true },
    yachts: { type: Boolean, default: false },
    arts: { type: Boolean, default: true },
    wine: { type: Boolean, default: false },
    experiences: { type: Boolean, default: false },
    notifications: { type: Boolean, default: true },
    emailDigest: { type: Boolean, default: true },
    smsAlerts: { type: Boolean, default: false },
    whatsappAlerts: { type: Boolean, default: false }
  },
  reminders: [{
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    remindAt: Date,
    sent: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
