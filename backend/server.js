require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');
const path = require('path');

const app = express();

// Trust proxy (Railway ke behind proxy ke liye zaroori)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: true,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Stricter limit for payment endpoints
const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { success: false, error: 'Too many payment attempts.' }
});
app.use('/api/payments/', paymentLimiter);

app.use(express.json({ limit: '10mb' }));

// Database connection
if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI environment variable is not set');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// ===== STATIC FILES (Frontend Web App) - API se PEHLE =====
app.use(express.static(path.join(__dirname, 'public')));

// ===== API ROUTES =====
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/notifications', require('./routes/notifications'));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Scheduled scraper (runs daily at 6 AM)
cron.schedule('0 6 * * *', () => {
  console.log('Running daily event scraper...');
  require('./services/auctionScraper').runScraper();
});

// ===== SPA FALLBACK - API ke BAAD, Error se PEHLE =====
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Elite Events Hub API running on port ${PORT}`);
});
