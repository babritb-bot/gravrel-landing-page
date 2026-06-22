import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles, ArrowDown } from "lucide-react";

const API = "https://api.gravrelaetherops.com/api/v1/chat";

const WELCOME = "Hi! I'm GravRel AI ☀️ — your guide to India's first solar-powered cloud. Ask me about our services, pricing, student offers, or anything about GravRel!";

const QUICK_QUESTIONS = [
  "What is GravRel?",
  "Student free offer?",
  "Show me pricing",
  "How is it solar-powered?",
];

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  // Auto-show hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || sending) return;

    const userMsg = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const history = messages.filter(m => m.role !== "system").slice(-10);
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history }),
      });
      const data = await res.json();
      if (data.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't process that. Email ceo@gravrel.com for help! ☀️" }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm having trouble connecting. Try again or email ceo@gravrel.com ☀️" }]);
    }
    setSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Inject styles
  useEffect(() => {
    if (document.getElementById('gr-chat-styles')) return;
    const style = document.createElement('style');
    style.id = 'gr-chat-styles';
    style.textContent = `
      @keyframes gr-chat-bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.08); }
      }
      @keyframes gr-chat-glow {
        0%, 100% { box-shadow: 0 4px 20px rgba(29,158,117,0.3); }
        50% { box-shadow: 0 4px 30px rgba(29,158,117,0.6); }
      }
      @keyframes gr-chat-fadein {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes gr-chat-dot {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
        40% { transform: scale(1); opacity: 1; }
      }
      @keyframes gr-badge-pop {
        from { opacity: 0; transform: translateX(-10px); }
        to { opacity: 1; transform: translateX(0); }
      }
      .gr-chat-btn {
        position: fixed;
        bottom: 24px;
        left: 24px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1D9E75, #10b981);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        z-index: 9998;
        transition: transform 0.2s;
        animation: gr-chat-glow 3s ease-in-out infinite;
      }
      .gr-chat-btn:hover {
        transform: scale(1.1);
      }
      .gr-chat-badge {
        position: fixed;
        bottom: 36px;
        left: 96px;
        background: #0D2137;
        border: 1px solid rgba(29,158,117,0.3);
        color: #E2E4EF;
        padding: 8px 16px;
        border-radius: 12px 12px 12px 4px;
        font-size: 13px;
        font-family: inherit;
        z-index: 9998;
        animation: gr-badge-pop 0.3s ease-out;
        max-width: 220px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      }
      .gr-chat-badge strong {
        color: #1D9E75;
      }
      .gr-chat-window {
        position: fixed;
        bottom: 24px;
        left: 24px;
        width: 380px;
        height: 560px;
        background: #0A1628;
        border: 1px solid rgba(29,158,117,0.2);
        border-radius: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 8px 40px rgba(0,0,0,0.5);
        animation: gr-chat-fadein 0.3s ease-out;
      }
      @media (max-width: 480px) {
        .gr-chat-window {
          width: calc(100vw - 16px);
          height: calc(100vh - 80px);
          bottom: 8px;
          left: 8px;
          border-radius: 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      {/* Floating button */}
      {!open && (
        <>
          <button
            className="gr-chat-btn"
            onClick={() => { setOpen(true); setShowBadge(false); }}
            aria-label="Open GravRel AI Chat"
          >
            <MessageCircle size={26} strokeWidth={2.2} />
          </button>
          {showBadge && (
            <div className="gr-chat-badge" onClick={() => { setOpen(true); setShowBadge(false); }}>
              <strong>Ask GravRel AI</strong> anything about our cloud ☀️
            </div>
          )}
        </>
      )}

      {/* Chat window */}
      {open && (
        <div className="gr-chat-window">
          {/* Header */}
          <div style={{
            padding: '16px 18px',
            background: 'linear-gradient(135deg, rgba(29,158,117,0.15), rgba(29,158,117,0.05))',
            borderBottom: '1px solid rgba(29,158,117,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: '#1D9E75',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>GravRel AI</div>
              <div style={{ fontSize: 11, color: '#1D9E75', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1D9E75', display: 'inline-block' }} />
                Online — Solar Powered ☀️
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, width: 34, height: 34,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#94A3B8',
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 14px',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 8,
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
              }}>
                {/* Avatar */}
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: msg.role === 'user' ? 'rgba(99,102,241,0.15)' : 'rgba(29,158,117,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {msg.role === 'user'
                    ? <User size={14} color="#818CF8" />
                    : <Bot size={14} color="#1D9E75" />
                  }
                </div>
                {/* Bubble */}
                <div style={{
                  maxWidth: '78%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: msg.role === 'user' ? 'rgba(99,102,241,0.1)' : '#0D2137',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(99,102,241,0.2)' : 'rgba(29,158,117,0.15)'}`,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: '#E2E4EF',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {sending && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: 'rgba(29,158,117,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bot size={14} color="#1D9E75" />
                </div>
                <div style={{
                  padding: '12px 16px', borderRadius: '14px 14px 14px 4px',
                  background: '#0D2137', border: '1px solid rgba(29,158,117,0.15)',
                  display: 'flex', gap: 4,
                }}>
                  {[0, 1, 2].map(j => (
                    <span key={j} style={{
                      width: 7, height: 7, borderRadius: '50%', background: '#1D9E75',
                      display: 'inline-block',
                      animation: `gr-chat-dot 1.4s ease-in-out infinite`,
                      animationDelay: `${j * 0.2}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* Quick questions — show only at start */}
            {messages.length === 1 && !sending && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {QUICK_QUESTIONS.map((q) => (
                  <button key={q} onClick={() => sendMessage(q)} style={{
                    background: 'rgba(29,158,117,0.08)',
                    border: '1px solid rgba(29,158,117,0.2)',
                    borderRadius: 20, padding: '6px 14px',
                    color: '#1D9E75', fontSize: 12, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.background = 'rgba(29,158,117,0.15)'}
                  onMouseLeave={e => e.target.style.background = 'rgba(29,158,117,0.08)'}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 14px',
            borderTop: '1px solid rgba(29,158,117,0.1)',
            background: 'rgba(13,33,55,0.5)',
            flexShrink: 0,
          }}>
            <div style={{
              display: 'flex', gap: 8, alignItems: 'flex-end',
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about GravRel..."
                rows={1}
                style={{
                  flex: 1, resize: 'none',
                  background: '#0A1628',
                  border: '1px solid rgba(29,158,117,0.15)',
                  borderRadius: 12, padding: '10px 14px',
                  color: '#E2E4EF', fontSize: 13,
                  fontFamily: 'inherit', outline: 'none',
                  maxHeight: 80, lineHeight: 1.4,
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(29,158,117,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(29,158,117,0.15)'}
              />
              <button
                onClick={() => sendMessage()}
                disabled={sending || !input.trim()}
                style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: input.trim() ? '#1D9E75' : 'rgba(29,158,117,0.15)',
                  border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                {sending
                  ? <Loader2 size={16} color="#fff" style={{ animation: 'gr-chat-dot 1s linear infinite' }} />
                  : <Send size={16} color={input.trim() ? '#fff' : '#64748B'} />
                }
              </button>
            </div>
            <div style={{
              textAlign: 'center', marginTop: 8,
              fontSize: 10, color: '#4B5563',
            }}>
              Powered by GravRel AI ☀️ · Solar-powered responses
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
