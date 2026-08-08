const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET /api/events - List all events with filters (NO DEFAULT LIMIT)
router.get('/', async (req, res) => {
  try {
    const { category, tier, search, from, to, limit, page = 1, featured } = req.query;

    const query = { isActive: true };

    if (category) query.category = category;
    if (tier) query.tier = tier;
    if (featured === 'true') query.isFeatured = true;
    if (from || to) {
      query.startDate = {};
      if (from) query.startDate.$gte = new Date(from);
      if (to) query.startDate.$lte = new Date(to);
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const total = await Event.countDocuments(query);

    let eventsQuery = Event.find(query)
      .sort({ isFeatured: -1, startDate: 1 })
      .select('-__v');

    // Pagination sirf tab jab limit explicitly pass ho
    if (limit) {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      eventsQuery = eventsQuery.skip(skip).limit(parseInt(limit));
    }

    const events = await eventsQuery;

    res.json({
      success: true,
      count: events.length,
      total,
      page: limit ? parseInt(page) : 1,
      pages: limit ? Math.ceil(total / parseInt(limit)) : 1,
      data: events
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/events/:id - Single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, error: 'Event not found' });
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/events - Create event (admin)
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /api/events/categories/summary - Category counts
router.get('/categories/summary', async (req, res) => {
  try {
    const summary = await Event.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    res.json({ success: true, data: summary });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
