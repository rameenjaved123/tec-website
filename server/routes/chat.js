const express = require('express');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const { ragChat } = require('../services/ragPipeline');
const { saveConversation } = require('../services/vectorStore');
const { handleValidation } = require('../middleware/validate');

const router = express.Router();

// 20 messages per minute per IP
router.use(rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many messages. Please wait a moment.' },
}));

// 100 messages per hour per IP
router.use(rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: { error: 'Hourly limit reached. Please try again later.' },
}));

// 200 messages per day per IP
router.use(rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 200,
  message: { error: 'Daily limit reached. Please contact TEC directly for further help.' },
}));

const validate = [
  body('messages').isArray({ min: 1, max: 20 }).withMessage('messages must be an array of 1-20 items'),
  body('messages.*.role').isIn(['user', 'assistant']).withMessage('Invalid message role'),
  body('messages.*.content').isString().trim().isLength({ min: 1, max: 2000 }).withMessage('Message content must be 1-2000 characters'),
  body('sessionId').optional().isString().isLength({ max: 64 }),
  handleValidation,
];

// POST /api/chat — returns full JSON response (Lambda-compatible)
router.post('/', validate, async (req, res) => {
  const { messages, sessionId } = req.body;
  const sid = sessionId || uuidv4();

  try {
    const { result, sources } = await ragChat(messages, { stream: false });

    const lastUser = [...messages].reverse().find(m => m.role === 'user')?.content || '';
    saveConversation({
      id: uuidv4(),
      sessionId: sid,
      userMessage: lastUser,
      assistantMessage: result.text,
      sources,
    }).catch(err => console.error('Save conversation error:', err.message));

    res.json({ text: result.text, sources, sessionId: sid });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Sorry, I encountered an error. Please try again.' });
  }
});

module.exports = router;
