const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const crypto = require('crypto');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order
router.post('/razorpay/order', async (req, res) => {
  try {
    const { amount, plan, userId } = req.body;
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { plan, userId }
    };
    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Verify Razorpay payment
router.post('/razorpay/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, plan } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }

    const expiresAt = new Date();
    if (plan === 'yearly') expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    else expiresAt.setMonth(expiresAt.getMonth() + 1);

    await User.findByIdAndUpdate(userId, {
      tier: 'premium',
      subscription: {
        plan,
        startedAt: new Date(),
        expiresAt,
        razorpaySubscriptionId: razorpay_payment_id
      }
    });

    await Subscription.create({
      user: userId,
      plan,
      amount: plan === 'yearly' ? 9988 : 999,
      currency: 'INR',
      status: 'active',
      paymentProvider: 'razorpay',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      expiresAt
    });

    res.json({ success: true, message: 'Payment verified. Welcome to Premium!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Stripe checkout session
router.post('/stripe/session', async (req, res) => {
  try {
    const { plan, userId } = req.body;
    const isYearly = plan === 'yearly';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: `Elite Events Hub ${isYearly ? 'Yearly' : 'Monthly'} Premium`,
            description: 'Unlimited access to luxury events'
          },
          unit_amount: isYearly ? 998800 : 99900,
          recurring: isYearly ? { interval: 'year' } : { interval: 'month' }
        },
        quantity: 1
      }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: { userId, plan }
    });

    res.json({ success: true, sessionId: session.id, url: session.url });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Stripe webhook
router.post('/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { userId, plan } = session.metadata;

    const expiresAt = new Date();
    if (plan === 'yearly') expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    else expiresAt.setMonth(expiresAt.getMonth() + 1);

    await User.findByIdAndUpdate(userId, {
      tier: 'premium',
      subscription: {
        plan,
        startedAt: new Date(),
        expiresAt,
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription
      }
    });
  }

  res.json({ received: true });
});

module.exports = router;
