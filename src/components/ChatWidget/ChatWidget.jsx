import { useState, useRef, useEffect, useCallback } from 'react';
import './ChatWidget.css';

const API_BASE = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:3001';
const BOT_AVATAR = '/assets/logos/tec-crest.png';

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm the TEC assistant. How can I help you today? You can ask me about courses, admissions, student life, and more.",
      ts: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open && !minimised) inputRef.current?.focus();
  }, [open, minimised]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput('');

    const userMsg = { role: 'user', content: text, ts: new Date() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setTyping(true);

    const history = updatedMessages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role, content: m.content }))
      .slice(-10);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resp = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, sessionId }),
        signal: controller.signal,
      });

      const data = await resp.json();

      if (!resp.ok) throw new Error(data.error || `Server error ${resp.status}`);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.text,
        ts: new Date(),
      }]);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I couldn't connect right now. Please try again.",
        ts: new Date(),
      }]);
    } finally {
      setTyping(false);
    }
  }, [input, typing, messages, sessionId]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!open) {
    return (
      <button className="chat-launcher" onClick={() => setOpen(true)} aria-label="Open chat">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span className="chat-launcher-label">Ask TEC</span>
      </button>
    );
  }

  return (
    <div className={`chat-widget${minimised ? ' chat-widget--min' : ''}`}>
      <div className="chat-header">
        <img src={BOT_AVATAR} alt="TEC" className="chat-header-avatar" onError={e => { e.target.style.display = 'none'; }} />
        <div className="chat-header-info">
          <span className="chat-header-name">TEC Assistant</span>
          <span className="chat-header-status">
            <span className="chat-status-dot" />
            Online
          </span>
        </div>
        <div className="chat-header-actions">
          <button className="chat-icon-btn" onClick={() => setMinimised(m => !m)} aria-label={minimised ? 'Expand' : 'Minimise'}>
            {minimised ? '▲' : '▼'}
          </button>
          <button className="chat-icon-btn" onClick={() => { setOpen(false); abortRef.current?.abort(); }} aria-label="Close">
            ✕
          </button>
        </div>
      </div>

      {!minimised && (
        <>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg chat-msg--${msg.role}`}>
                {msg.role === 'assistant' && (
                  <img src={BOT_AVATAR} alt="TEC" className="chat-msg-avatar" onError={e => { e.target.style.display = 'none'; }} />
                )}
                <div className="chat-msg-body">
                  <div className="chat-bubble">{msg.content}</div>
                  <div className="chat-ts">{formatTime(msg.ts)}</div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="chat-msg chat-msg--assistant">
                <img src={BOT_AVATAR} alt="TEC" className="chat-msg-avatar" onError={e => { e.target.style.display = 'none'; }} />
                <div className="chat-msg-body">
                  <div className="chat-bubble chat-bubble--typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Type a message…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              maxLength={2000}
            />
            <button
              className="chat-send-btn"
              onClick={sendMessage}
              disabled={!input.trim() || typing}
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

          <div className="chat-footer">
            Powered by <strong>Claude AI</strong> · <a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy</a>
          </div>
        </>
      )}
    </div>
  );
}
