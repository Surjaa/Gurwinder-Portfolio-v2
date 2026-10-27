import { useEffect, useRef, useState } from 'react';
import { answerQuestion, topics } from '../agent/knowledge';
import { askAI } from '../api';
import { person } from '../data';

const GREETING = `Hi, I'm the portfolio assistant. I can answer questions about ${person.name}'s CV, skills, experience, projects and contact details. Pick a topic or type a question.`;

const box = {
  position: 'fixed', right: 16, bottom: 16, zIndex: 60, fontFamily: 'var(--font-body)',
};
const pill = {
  background: 'var(--accent)', color: '#111', border: 0, borderRadius: 999, padding: '12px 18px',
  fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,.35)', minHeight: 44,
};
const launch = {
  background: 'var(--accent)', color: '#111', border: 0, borderRadius: 999, padding: '10px 16px 10px 12px',
  cursor: 'pointer', boxShadow: '0 6px 18px rgba(0,0,0,.35)', minHeight: 44, minWidth: 44, fontSize: 15,
};
const dot = { width: 4, height: 4, borderRadius: '50%', background: '#111', display: 'inline-block' };
const panel = {
  width: 'min(380px, calc(100vw - 32px))', height: 'min(520px, calc(100vh - 110px))',
  background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--line)', borderRadius: 16,
  display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,.45)',
};
const chip = {
  background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)', borderRadius: 999,
  padding: '6px 12px', fontSize: 13, cursor: 'pointer', minHeight: 36,
};

export default function PortfolioAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const listRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ask = (question) => {
    const text = question.trim();
    if (!text) return;
    const { text: reply, refused } = answerQuestion(text);
    setMessages((m) => [...m, { from: 'user', text }, { from: 'bot', text: reply, refused }]);
    setInput('');
  };

  // Typed questions go to the AI backend (Groq, via Apps Script). If it is unavailable, use the built-in answers.
  const askFree = async (question) => {
    const text = question.trim();
    if (!text || thinking) return;
    setMessages((m) => [...m, { from: 'user', text }]);
    setInput('');
    setThinking(true);
    try {
      const answer = await askAI(text);
      setMessages((m) => [...m, { from: 'bot', text: answer }]);
    } catch {
      const { text: reply, refused } = answerQuestion(text);
      setMessages((m) => [...m, { from: 'bot', text: reply, refused }]);
    } finally {
      setThinking(false);
    }
  };

  const onSubmit = (e) => { e.preventDefault(); askFree(input); };

  if (!open) {
    return (
      <div style={box}>
        <style>{`
          @keyframes pa-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
          @keyframes pa-ring { 0% { transform: scale(1); opacity: .55 } 100% { transform: scale(1.9); opacity: 0 } }
          @keyframes pa-dots { 0%,80%,100% { opacity: .25 } 40% { opacity: 1 } }
          .pa-launch .pa-icon { animation: pa-bob 2.4s ease-in-out infinite; }
          .pa-launch .pa-ring { animation: pa-ring 2.4s ease-out infinite; }
          .pa-launch .pa-dot { animation: pa-dots 1.4s ease-in-out infinite; }
          .pa-launch .pa-dot:nth-child(2) { animation-delay: .2s; }
          .pa-launch .pa-dot:nth-child(3) { animation-delay: .4s; }
          @media (prefers-reduced-motion: reduce) { .pa-launch .pa-icon, .pa-launch .pa-ring, .pa-launch .pa-dot { animation: none; } }
        `}</style>
        <button ref={toggleRef} type="button" className="pa-launch" aria-expanded="false" aria-controls="portfolio-agent"
          aria-label="Ask a question about Gurwinder" onClick={() => setOpen(true)}
          style={{ ...launch, position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="pa-ring" aria-hidden="true" style={{ position: 'absolute', left: 10, top: '50%', marginTop: -14, width: 28, height: 28, borderRadius: '50%', border: '2px solid var(--accent)' }} />
          <svg className="pa-icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative' }}>
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
          </svg>
          <span style={{ position: 'relative', fontWeight: 700 }}>Ask</span>
          <span aria-hidden="true" style={{ position: 'relative', display: 'flex', gap: 3 }}>
            <i className="pa-dot" style={dot} /><i className="pa-dot" style={dot} /><i className="pa-dot" style={dot} />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div style={box}>
      <section id="portfolio-agent" role="dialog" aria-modal="false" aria-label="Portfolio assistant" style={panel}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
          <strong style={{ fontFamily: 'var(--font-display)' }}>Portfolio assistant</strong>
          <button type="button" aria-label="Close assistant" onClick={() => { setOpen(false); toggleRef.current?.focus(); }}
            style={{ ...chip, border: 0, fontSize: 20, padding: '0 10px' }}>×</button>
        </header>

        <div ref={listRef} aria-live="polite" style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'grid', gap: 12, alignContent: 'start' }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              justifySelf: m.from === 'user' ? 'end' : 'start', maxWidth: '88%', whiteSpace: 'pre-line',
              background: m.from === 'user' ? 'var(--accent)' : 'var(--bg)', color: m.from === 'user' ? '#111' : 'var(--ink)',
              border: m.from === 'user' ? 0 : '1px solid var(--line)', borderRadius: 14, padding: '10px 12px', fontSize: 14, lineHeight: 1.5,
              overflowWrap: 'anywhere',
            }}>
              {m.text}
            </div>
          ))}
          {thinking && (
            <div aria-label="Assistant is typing" style={{ justifySelf: 'start', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 14, padding: '10px 14px', display: 'flex', gap: 4 }}>
              <i className="pa-dot" style={dot} /><i className="pa-dot" style={dot} /><i className="pa-dot" style={dot} />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 16px 12px' }}>
          {topics.map((t) => (
            <button key={t} type="button" style={chip} onClick={() => (t === 'Download CV' ? window.open('Gurwinder_CV.pdf', '_blank', 'noopener') : ask(t))}>{t}</button>
          ))}
        </div>

        <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid var(--line)' }}>
          <label htmlFor="agent-q" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Type your question</label>
          <input id="agent-q" value={input} onChange={(e) => setInput(e.target.value)} maxLength={200}
            placeholder="Ask about skills, projects, experience…" autoComplete="off"
            style={{ flex: 1, minWidth: 0, background: 'var(--bg)', color: 'var(--ink)', border: '1px solid var(--line)', borderRadius: 10, padding: '10px 12px', fontSize: 14, minHeight: 44 }} />
          <button type="submit" disabled={thinking} style={{ ...pill, padding: '0 14px', fontSize: 14, opacity: thinking ? 0.6 : 1 }}>Send</button>
        </form>
      </section>
    </div>
  );
}
