const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, enum: ['monthly', 'yearly'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: {
    type: String,
    enum: ['pending', 'active', 'cancelled', 'expired'],
    default: 'pending'
  },
  paymentProvider: { type: String, enum: ['razorpay', 'stripe'], required: true },
  paymentId: { type: String, trim: true },
  orderId: { type: String, trim: true },
  startedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  cancelledAt: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
