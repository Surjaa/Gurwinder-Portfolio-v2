import { useEffect, useRef, useState } from 'react';
import { person, skillTicker } from '../data';

const explore = [
  ['About', '#about'], ['Services', '#services'], ['BI / MIS', '#bi-mis'], ['Projects', '#projects'],
  ['Snake game', '#game'], ['Journey', '#journey'], ['Contact', '#contact'],
];

// A tile whose glow follows the cursor (sets --x / --y on the element).
function Tile({ as: Tag = 'a', className = '', ...props }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return <Tag className={`fx-tile ${className}`} onMouseMove={onMove} {...props} />;
}

function EmailTile({ email }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the "Email me" button still opens a mail app.
    }
  };
  return (
    <Tile as="button" type="button" className={copied ? 'done' : ''} onClick={copy} aria-live="polite">
      <span className="fx-ico" aria-hidden="true">@</span>
      <span>
        <small>{copied ? 'Copied to clipboard' : 'Click to copy'}</small>
        <strong>{copied ? 'Email copied ✓' : email}</strong>
      </span>
      <span className="fx-tgo" aria-hidden="true">{copied ? '✓' : '⧉'}</span>
    </Tile>
  );
}

// Footer: a call to action, a scrolling skills strip, a section index and contact tiles.
// The signature still draws itself in when it scrolls into view.
export default function Footer() {
  const sigRef = useRef(null);
  useEffect(() => {
    const el = sigRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) {
        el.classList.add('in');
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="ft">
      <div className="container">
        <section className="fx-hero">
          <p className="fx-eyebrow">Let's work together</p>
          <h2 className="fx-title">Got a project?<br /><span>Let's build it.</span></h2>
          <div className="fx-actions">
            <a className="fx-btn primary" href={`mailto:${person.email}`}>Email me <span aria-hidden="true">→</span></a>
            <a className="fx-btn ghost" href={person.links.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
          </div>
        </section>

        <div className="fx-marquee" aria-hidden="true">
          <div className="fx-track">
            {[...skillTicker, ...skillTicker].map((s, i) => <span key={i}>{s}<i>✦</i></span>)}
          </div>
        </div>

        <div className="fx-body">
          <nav aria-label="Footer">
            <h3 className="fx-h">Explore</h3>
            <ul className="fx-index">
              {explore.map(([label, href], i) => (
                <li key={href}>
                  <a href={href}>
                    <span className="fx-num">0{i + 1}</span>
                    <span className="fx-label">{label}</span>
                    <span className="fx-go" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="fx-h">Get in touch</h3>
            <div className="fx-tiles">
              <EmailTile email={person.email} />
              <Tile href={person.links.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="fx-ico" aria-hidden="true">in</span>
                <span><small>Professional</small><strong>LinkedIn</strong></span>
                <span className="fx-tgo" aria-hidden="true">↗</span>
              </Tile>
              <Tile href={person.links.github} target="_blank" rel="noopener noreferrer">
                <span className="fx-ico" aria-hidden="true">{'</>'}</span>
                <span><small>Code</small><strong>GitHub</strong></span>
                <span className="fx-tgo" aria-hidden="true">↗</span>
              </Tile>
            </div>
          </div>
        </div>

        <div className="ft-sig-wrap">
          <p className="ft-hello">Thanks for scrolling all the way down.</p>
          <div ref={sigRef} className="ft-sig" role="img" aria-label={`Signature: ${person.name}`}>
            <svg viewBox="0 0 560 170" aria-hidden="true" focusable="false">
              <text className="ft-sig-text" x="18" y="112" textLength="520" lengthAdjust="spacingAndGlyphs">{person.name}</text>
              <path className="ft-sig-line" d="M24 140 C 150 122, 330 152, 536 126" />
            </svg>
          </div>
        </div>

        <div className="ft-bottom">
          <p>© {new Date().getFullYear()} {person.name}. All rights reserved.</p>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
