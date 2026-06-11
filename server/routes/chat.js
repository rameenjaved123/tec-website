const express = require('express');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const { ragChat } = require('../services/ragPipeline');
const { saveConversation } = require('../services/vectorStore');
const { handleValidation } = require('../middleware/validate');

const router = express.Router();

// Stricter rate limit for chat endpoint
router.use(rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Chat rate limit reached. Please wait a moment.' },
}));

const validate = [
  body('messages').isArray({ min: 1, max: 20 }).withMessage('messages must be an array of 1-20 items'),
  body('messages.*.role').isIn(['user', 'assistant']).withMessage('Invalid message role'),
  body('messages.*.content').isString().trim().isLength({ min: 1, max: 2000 }).withMessage('Message content must be 1-2000 characters'),
  body('sessionId').optional().isString().isLength({ max: 64 }),
  handleValidation,
];

// POST /api/chat — streaming SSE response
router.post('/', validate, async (req, res) => {
  const { messages, sessionId } = req.body;
  const sid = sessionId || uuidv4();

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  let fullText = '';
  let sources = [];

  try {
    const { result: stream, sources: retrievedSources } = await ragChat(messages, { stream: true });
    sources = retrievedSources;

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        fullText += event.delta.text;
        send('delta', { text: event.delta.text });
      }
    }

    send('done', { sources, sessionId: sid });

    // Save to DB asynchronously (don't block response)
    const lastUser = [...messages].reverse().find(m => m.role === 'user')?.content || '';
    saveConversation({
      id: uuidv4(),
      sessionId: sid,
      userMessage: lastUser,
      assistantMessage: fullText,
      sources,
    }).catch(err => console.error('Save conversation error:', err.message));

  } catch (err) {
    console.error('Chat error:', err);
    send('error', { message: 'Sorry, I encountered an error. Please try again.' });
  } finally {
    res.end();
  }
});

module.exports = router;
