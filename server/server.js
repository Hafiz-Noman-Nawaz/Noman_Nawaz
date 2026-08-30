require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const heroRoutes = require('./routes/hero');
const projectRoutes = require('./routes/projects');
const settingsRoutes = require('./routes/settings');
const messagesRoutes = require('./routes/messages');
const testimonialsRoutes = require('./routes/testimonials');
const timelineRoutes = require('./routes/timeline');
const certificatesRoutes = require('./routes/certificates');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow any origin in dev or if origin is undefined (e.g. mobile/Postman/curl)
      // or matches configured client url, custom domain, or vercel deployments
      if (
        !origin ||
        origin === process.env.CLIENT_URL ||
        origin.includes('nouman-nawaz.dev') ||
        origin.includes('localhost') ||
        origin.includes('vercel.app')
      ) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all for seamless portfolio accessibility
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Base API route & Health check
app.get(['/', '/api', '/api/health', '/health'], (req, res) => {
  res.json({
    status: 'ok',
    message: 'Noman Nawaz Portfolio API is active and healthy ⚡',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes (with and without /api prefix for maximum reliability)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/hero', heroRoutes);
app.use('/hero', heroRoutes);

app.use('/api/projects', projectRoutes);
app.use('/projects', projectRoutes);

app.use('/api/settings', settingsRoutes);
app.use('/settings', settingsRoutes);

app.use('/api/messages', messagesRoutes);
app.use('/messages', messagesRoutes);

app.use('/api/testimonials', testimonialsRoutes);
app.use('/testimonials', testimonialsRoutes);

app.use('/api/timeline', timelineRoutes);
app.use('/timeline', timelineRoutes);

app.use('/api/certificates', certificatesRoutes);
app.use('/certificates', certificatesRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`⚡ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
