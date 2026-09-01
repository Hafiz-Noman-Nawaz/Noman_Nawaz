const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

// @route   POST /api/analytics/track
// @desc    Record a privacy-friendly visitor event (pageview, resume download, project click)
// @access  Public
router.post('/track', async (req, res) => {
  try {
    const { eventType, target, visitorId, path, deviceType, referrer } = req.body;

    if (!eventType) {
      return res.status(400).json({ success: false, message: 'eventType is required' });
    }

    const event = await Analytics.create({
      eventType,
      target: target || '',
      visitorId: visitorId || 'anon_visitor',
      path: path || '/',
      deviceType: deviceType || 'Desktop',
      referrer: referrer || 'Direct',
    });

    res.status(201).json({ success: true, eventId: event._id });
  } catch (error) {
    // Non-blocking catch to prevent client disruptions
    res.status(200).json({ success: false, error: error.message });
  }
});

// @route   GET /api/analytics/stats
// @desc    Get aggregated visitor intelligence & lead conversion metrics
// @access  Private (Admin)
router.get('/stats', protect, async (req, res) => {
  try {
    const [
      totalPageViews,
      uniqueVisitorsList,
      resumeDownloads,
      inquiriesCount,
      projectClicksList,
      recentEvents,
    ] = await Promise.all([
      Analytics.countDocuments({ eventType: 'pageview' }),
      Analytics.distinct('visitorId', { eventType: 'pageview' }),
      Analytics.countDocuments({ eventType: 'resume_download' }),
      Message.countDocuments(),
      Analytics.aggregate([
        { $match: { eventType: 'project_click', target: { $ne: '' } } },
        { $group: { _id: '$target', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Analytics.find().sort({ createdAt: -1 }).limit(25),
    ]);

    const uniqueVisitors = uniqueVisitorsList.length || (totalPageViews > 0 ? 1 : 0);
    const conversionRate = uniqueVisitors > 0
      ? ((inquiriesCount / uniqueVisitors) * 100).toFixed(1)
      : '0.0';

    // Aggregate last 7 days page views
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const dailyViewsAgg = await Analytics.aggregate([
      {
        $match: {
          eventType: 'pageview',
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Build complete 7-day array
    const viewsLast7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const match = dailyViewsAgg.find((item) => item._id === dateStr);
      viewsLast7Days.push({
        date: dateStr,
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        count: match ? match.count : 0,
      });
    }

    res.json({
      success: true,
      data: {
        totalPageViews,
        uniqueVisitors,
        resumeDownloads,
        inquiriesCount,
        conversionRate,
        topProjects: projectClicksList.map((p) => ({ title: p._id, views: p.count })),
        viewsLast7Days,
        recentEvents,
      },
    });
  } catch (error) {
    console.error('Error calculating analytics stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve analytics',
      error: error.message,
    });
  }
});

// @route   DELETE /api/analytics/reset
// @desc    Clear analytics logs
// @access  Private (Admin)
router.delete('/reset', protect, async (req, res) => {
  try {
    await Analytics.deleteMany({});
    res.json({ success: true, message: 'Analytics logs cleared' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
