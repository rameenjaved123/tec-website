-- Enable pgvector extension
create extension if not exists vector;

-- ── Documents ─────────────────────────────────────────────
create table if not exists chatbot_documents (
  id           uuid primary key,
  name         text not null,
  file_type    text,
  file_size    bigint,
  chunk_count  int default 0,
  status       text default 'ready',
  created_at   timestamptz default now()
);

-- ── Chunks with vector embeddings ────────────────────────
create table if not exists chatbot_chunks (
  id            uuid primary key,
  document_id   uuid not null references chatbot_documents(id) on delete cascade,
  document_name text,
  content       text not null,
  embedding     vector(1536),
  chunk_index   int,
  created_at    timestamptz default now()
);

create index if not exists chatbot_chunks_embedding_idx
  on chatbot_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- ── Conversations log ────────────────────────────────────
create table if not exists chatbot_conversations (
  id                 uuid primary key,
  session_id         text,
  user_message       text,
  assistant_message  text,
  sources            jsonb default '[]',
  created_at         timestamptz default now()
);

create index if not exists chatbot_conversations_session_idx
  on chatbot_conversations(session_id);

create index if not exists chatbot_conversations_created_idx
  on chatbot_conversations(created_at desc);

-- ── Similarity search function ───────────────────────────
create or replace function match_document_chunks(
  query_embedding  vector(1536),
  match_threshold  float,
  match_count      int
)
returns table (
  id            uuid,
  document_id   uuid,
  document_name text,
  content       text,
  similarity    float
)
language sql stable
as $$
  select
    c.id,
    c.document_id,
    c.document_name,
    c.content,
    1 - (c.embedding <=> query_embedding) as similarity
  from chatbot_chunks c
  where 1 - (c.embedding <=> query_embedding) > match_threshold
  order by c.embedding <=> query_embedding
  limit match_count;
$$;
