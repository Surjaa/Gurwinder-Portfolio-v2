import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { navItems, person } from '../data';
import { ACCENTS } from '../theme';
import { usePrefs } from '../context';
import { useReduced } from '../hooks';

// What each menu item previews on the right. img is optional.
const INFO = {
  about: { text: 'Who I am, and how I work, in short.', img: 'images/portrait-about.webp' },
  services: { text: 'Websites, business intelligence and MIS reporting.' },
  skills: { text: 'My toolbox, grouped by what I use it for.' },
  'bi-mis': { text: 'Dashboards and reports that help teams decide.', img: 'images/shots/bi-executive.webp' },
  projects: { text: 'Seven live projects. Scroll sideways and tap to explore.', img: 'images/shots/erp-overview.webp' },
  journey: { text: 'Experience, education, awards and languages.' },
  contact: { text: 'Got a project or a role? Let us talk.' },
};

const CLIP_ORIGIN = 'calc(100% - 56px) 40px';

function LocalTime() {
  const fmt = () => new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 30000);
    return () => clearInterval(id);
  }, []);
  return <span>{t} in Punjab</span>;
}

export default function Nav() {
  const { accent, setAccent, plain, setPlain } = usePrefs();
  const reduce = useReduced();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(0);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Stop the page behind the menu from scrolling while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const item = navItems[hover];
  const info = INFO[item.id] || {};

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <>
      <motion.div aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 101, background: 'var(--accent)', transformOrigin: '0 50%', scaleX }} />
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'color-mix(in srgb, var(--bg) 78%, transparent)', backdropFilter: 'blur(10px)' }}>
        <div className="container d-flex align-items-center justify-content-between py-3 gap-3">
          <a href="#home" className="fw-bold text-decoration-none d-flex align-items-center gap-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} aria-hidden="true" />
            {person.name}
          </a>
          <div className="d-none d-lg-flex align-items-center gap-2">
            <button type="button" className="chip" aria-pressed={plain} onClick={() => setPlain(!plain)}>Plain words {plain ? 'on' : 'off'}</button>
            <div className="d-flex gap-1 ms-1" role="group" aria-label="Accent colour">
              {ACCENTS.map((a) => (
                <button key={a.value} type="button" aria-label={`${a.name} accent`} aria-pressed={accent === a.value} onClick={() => setAccent(a.value)}
                  style={{ width: 24, height: 24, borderRadius: '50%', background: a.value, border: accent === a.value ? '2px solid var(--ink)' : '2px solid transparent', padding: 0 }} />
              ))}
            </div>
          </div>
          <button type="button" className="btn-pill" aria-expanded={open} aria-controls="menu-overlay" onClick={() => setOpen((v) => !v)} style={{ minHeight: 44 }}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: `circle(0% at ${CLIP_ORIGIN})` }}
            animate={{ clipPath: `circle(150% at ${CLIP_ORIGIN})` }}
            exit={{ clipPath: `circle(0% at ${CLIP_ORIGIN})` }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'var(--ink)', color: 'var(--bg)', overflowY: 'auto' }}
          >
            {/* slow drifting glow in the background */}
            <motion.div aria-hidden="true"
              style={{ position: 'absolute', width: '70vmax', height: '70vmax', borderRadius: '50%', right: '-25vmax', top: '-25vmax', background: 'radial-gradient(circle, var(--accent), transparent 65%)', opacity: 0.22, filter: 'blur(30px)', pointerEvents: 'none' }}
              animate={reduce ? {} : { x: [0, -40, 0], y: [0, 30, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />

            <div className="container position-relative d-flex flex-column" style={{ minHeight: '100%', paddingTop: 110, paddingBottom: 28 }}>
              <div className="row g-4 flex-grow-1 align-items-center">
                <div className="col-12 col-lg-7">
                  <nav aria-label="Main">
                    <ol className="list-unstyled m-0">
                      {navItems.map((n, i) => (
                        <li key={n.id} style={{ overflow: 'hidden' }}>
                          <motion.a
                            href={`#${n.id}`}
                            onClick={() => setOpen(false)}
                            onMouseEnter={() => setHover(i)}
                            onFocus={() => setHover(i)}
                            initial={reduce ? false : { y: '110%' }}
                            animate={{ y: '0%' }}
                            transition={{ delay: 0.3 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="d-flex align-items-center gap-3 text-decoration-none"
                            style={{ color: 'inherit', opacity: hover === i ? 1 : 0.35, transition: 'opacity .35s ease', padding: '0.08em 0' }}
                          >
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: hover === i ? 'var(--accent)' : 'inherit', minWidth: 28 }}>0{i + 1}</span>
                            <span className="big-title" style={{ fontSize: 'clamp(2.4rem, 5.4vw, 5rem)', lineHeight: 1.02, display: 'inline-block', transform: hover === i ? 'translateX(14px)' : 'translateX(0)', transition: 'transform .45s cubic-bezier(.22,1,.36,1)' }}>
                              {n.label}
                            </span>
                            {hover === i && !reduce && (
                              <motion.span aria-hidden="true" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ color: 'var(--accent)', fontSize: '2rem' }}>→</motion.span>
                            )}
                          </motion.a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>

                <div className="col-12 col-lg-5 d-none d-lg-block">
                  <AnimatePresence mode="wait">
                    <motion.div key={item.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
                      <p className="eyebrow mb-2" style={{ color: 'inherit', opacity: 0.6 }}>Section {hover + 1} of {navItems.length}</p>
                      <p className="fs-3 fw-bold mb-4" style={{ fontFamily: 'var(--font-display)', fontStretch: '85%', lineHeight: 1.1 }}>{info.text}</p>
                      {info.img ? (
                        <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.18)' }}>
                          <img src={info.img} alt="" width="1280" height="800" decoding="async" style={{ width: '100%', display: 'block', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' }} />
                        </div>
                      ) : (
                        <div aria-hidden="true" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(8rem, 16vw, 13rem)', lineHeight: 0.9, color: 'transparent', WebkitTextStroke: '1.5px var(--accent)' }}>
                          0{hover + 1}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="ticker mt-4" aria-hidden="true" style={{ borderTop: '1px solid rgba(255,255,255,0.15)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="ticker-track py-2">
                  {[...Array(2)].flatMap((_, k) => ['Open to new roles', 'Full Stack Developer', 'BI Analyst', 'Punjab, India'].map((t) => (
                    <span key={k + t} className="eyebrow" style={{ padding: '0 1.6rem', whiteSpace: 'nowrap', color: 'inherit', opacity: 0.7 }}>{t} <span style={{ color: 'var(--accent)' }}>✦</span></span>
                  )))}
                </div>
              </div>

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
                <div className="d-flex flex-wrap gap-2">
                  <button type="button" className="chip" onClick={copyEmail}>{copied ? 'Email copied' : person.email}</button>
                  <a className="chip" href={person.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a className="chip" href={person.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a className="chip" href={person.resume} target="_blank" rel="noopener noreferrer">Resume</a>
                </div>
                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <span className="small" style={{ opacity: 0.6 }}><LocalTime /></span>
                  <div className="d-flex gap-1" role="group" aria-label="Accent colour">
                    {ACCENTS.map((a) => (
                      <button key={a.value} type="button" aria-label={`${a.name} accent`} aria-pressed={accent === a.value} onClick={() => setAccent(a.value)}
                        style={{ width: 24, height: 24, borderRadius: '50%', background: a.value, border: accent === a.value ? '2px solid var(--bg)' : '2px solid transparent', padding: 0 }} />
                    ))}
                  </div>
                  <button type="button" className="chip" aria-pressed={plain} onClick={() => setPlain(!plain)}>Plain words {plain ? 'on' : 'off'}</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
