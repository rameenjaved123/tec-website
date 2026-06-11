const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

async function similaritySearch(queryEmbedding, { topK = 5, threshold = 0.3 } = {}) {
  const { data, error } = await supabase.rpc('match_document_chunks', {
    query_embedding: queryEmbedding,
    match_threshold: threshold,
    match_count: topK,
  });
  if (error) throw new Error(`Vector search failed: ${error.message}`);
  return data || [];
}

async function insertDocument({ id, name, type, size, chunkCount }) {
  const { error } = await supabase.from('chatbot_documents').insert({
    id,
    name,
    file_type: type,
    file_size: size,
    chunk_count: chunkCount,
    status: 'ready',
  });
  if (error) throw new Error(`Insert document failed: ${error.message}`);
}

async function insertChunks(chunks) {
  // chunks: [{ id, document_id, content, embedding, chunk_index }]
  const { error } = await supabase.from('chatbot_chunks').insert(chunks);
  if (error) throw new Error(`Insert chunks failed: ${error.message}`);
}

async function getDocuments() {
  const { data, error } = await supabase
    .from('chatbot_documents')
    .select('id, name, file_type, file_size, chunk_count, status, created_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

async function deleteDocument(id) {
  // Chunks are deleted by cascade
  const { error } = await supabase.from('chatbot_documents').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

async function saveConversation({ id, sessionId, userMessage, assistantMessage, sources }) {
  const { error } = await supabase.from('chatbot_conversations').insert({
    id,
    session_id: sessionId,
    user_message: userMessage,
    assistant_message: assistantMessage,
    sources: sources || [],
  });
  if (error) console.error('Failed to save conversation:', error.message);
}

async function getConversations({ limit = 100, offset = 0 } = {}) {
  const { data, error } = await supabase
    .from('chatbot_conversations')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw new Error(error.message);
  return data || [];
}

async function getAnalytics() {
  const [total, today, docs] = await Promise.all([
    supabase.from('chatbot_conversations').select('id', { count: 'exact', head: true }),
    supabase.from('chatbot_conversations')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', new Date().toISOString().slice(0, 10)),
    supabase.from('chatbot_documents').select('id', { count: 'exact', head: true }).eq('status', 'ready'),
  ]);
  return {
    totalConversations: total.count || 0,
    todayConversations: today.count || 0,
    totalDocuments: docs.count || 0,
  };
}

module.exports = {
  similaritySearch,
  insertDocument,
  insertChunks,
  getDocuments,
  deleteDocument,
  saveConversation,
  getConversations,
  getAnalytics,
};
