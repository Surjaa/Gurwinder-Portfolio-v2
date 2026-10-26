import { skillTicker } from '../data';

// Two rows of skills running in opposite directions.
export default function Ticker() {
  const row = [...skillTicker, ...skillTicker];
  const rowB = [...skillTicker].reverse();
  const rowBx = [...rowB, ...rowB];
  return (
    <div className="section" style={{ padding: '2.5rem 0' }} aria-hidden="true">
      <div className="ticker mb-3" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="ticker-track py-3">
          {row.map((s, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-display)', fontStretch: '85%', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.6rem)', padding: '0 1.2rem', whiteSpace: 'nowrap' }}>
              {s} <span className="accent-text">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="ticker">
        <div className="ticker-track rev py-2">
          {rowBx.map((s, i) => (
            <span key={i} className="eyebrow" style={{ padding: '0 1.4rem', whiteSpace: 'nowrap', fontSize: '0.95rem' }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
