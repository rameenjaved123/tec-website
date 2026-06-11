const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSIONS = 1536;

async function generateEmbedding(text) {
  const clean = text.replace(/\n+/g, ' ').trim().slice(0, 8000);
  const resp = await openai.embeddings.create({ model: EMBEDDING_MODEL, input: clean });
  return resp.data[0].embedding;
}

async function generateEmbeddings(texts) {
  const inputs = texts.map(t => t.replace(/\n+/g, ' ').trim().slice(0, 8000));
  const resp = await openai.embeddings.create({ model: EMBEDDING_MODEL, input: inputs });
  return resp.data.map(d => d.embedding);
}

module.exports = { generateEmbedding, generateEmbeddings, EMBEDDING_DIMENSIONS };
