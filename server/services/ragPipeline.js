const { generateEmbedding } = require('./embeddings');
const { similaritySearch } = require('./vectorStore');
const { chatWithContext } = require('./claude');

async function ragChat(messages, { topK = 5, stream = false } = {}) {
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';

  let chunks = [];
  try {
    const queryEmbedding = await generateEmbedding(lastUserMessage);
    chunks = await similaritySearch(queryEmbedding, { topK, threshold: 0.25 });
  } catch (err) {
    console.warn('RAG retrieval failed, continuing without context:', err.message);
  }

  const result = await chatWithContext(messages, chunks, { stream });
  return { result, sources: chunks.map(c => ({ document: c.document_name, score: c.similarity })) };
}

module.exports = { ragChat };
