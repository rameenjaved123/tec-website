const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { extractText, chunkText } = require('../utils/fileParser');
const { generateEmbeddings } = require('../services/embeddings');
const { insertDocument, insertChunks, getDocuments, deleteDocument } = require('../services/vectorStore');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter(_req, file, cb) {
    const allowed = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'];
    if (allowed.includes(file.mimetype) || file.originalname.match(/\.(pdf|doc|docx|txt)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOCX, DOC, and TXT files are supported'));
    }
  },
});

// GET /api/documents
router.get('/', async (_req, res) => {
  try {
    const docs = await getDocuments();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/documents/upload
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided' });

  const docId = uuidv4();
  const { originalname, mimetype, size, buffer } = req.file;

  try {
    // 1. Extract text
    const text = await extractText(buffer, mimetype, originalname);
    if (!text || text.trim().length < 20) {
      return res.status(400).json({ error: 'Could not extract usable text from the file' });
    }

    // 2. Chunk
    const rawChunks = chunkText(text);
    if (rawChunks.length === 0) {
      return res.status(400).json({ error: 'Document produced no text chunks' });
    }

    // 3. Generate embeddings in batches of 50
    const batchSize = 50;
    const embeddings = [];
    for (let i = 0; i < rawChunks.length; i += batchSize) {
      const batch = rawChunks.slice(i, i + batchSize);
      const batchEmbeddings = await generateEmbeddings(batch);
      embeddings.push(...batchEmbeddings);
    }

    // 4. Store document record
    await insertDocument({ id: docId, name: originalname, type: mimetype, size, chunkCount: rawChunks.length });

    // 5. Store chunks
    const chunks = rawChunks.map((content, idx) => ({
      id: uuidv4(),
      document_id: docId,
      document_name: originalname,
      content,
      embedding: embeddings[idx],
      chunk_index: idx,
    }));
    await insertChunks(chunks);

    res.json({ id: docId, name: originalname, chunkCount: rawChunks.length });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/documents/:id
router.delete('/:id', async (req, res) => {
  try {
    await deleteDocument(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
