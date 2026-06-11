const express = require('express');
const { requireAuth, signAdminToken } = require('../middleware/auth');
const { getConversations, getAnalytics } = require('../services/vectorStore');

const router = express.Router();

// POST /api/admin/token — exchange admin credentials for JWT
router.post('/token', (req, res) => {
  const { username, password } = req.body || {};
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = signAdminToken({ username, role: 'admin' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// GET /api/admin/analytics
router.get('/analytics', requireAuth, async (_req, res) => {
  try {
    const data = await getAnalytics();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/conversations
router.get('/conversations', requireAuth, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 100, 500);
    const offset = parseInt(req.query.offset) || 0;
    const data = await getConversations({ limit, offset });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
