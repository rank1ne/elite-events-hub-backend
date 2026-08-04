const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Send push notification
router.post('/push', async (req, res) => {
  try {
    const { userId, title, message } = req.body;
    res.json({ success: true, message: 'Notification queued' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get user's reminders
router.get('/reminders/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('reminders');
    res.json({ success: true, reminders: user?.reminders || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
