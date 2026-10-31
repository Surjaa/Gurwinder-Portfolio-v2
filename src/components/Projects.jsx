import { useEffect, useRef, useState } from 'react';
import Heading from './Heading';
import { projects, repos } from '../data';

// Projects: an endless 3D orbit. Cards wrap around, the centre card faces the viewer,
// side cards recede and turn. Drag to spin, hover to pause. Positions update on rAF, not React state.
const liveUrl = (r) => r.url || `https://surjaa.github.io/${r.repo}/`;
const TECH = ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'Node.js', 'SVG'];
const SPEED = 0.32;   // cards per second
const SPREAD = 0.78;  // card spacing as a share of card width
const TURN = 26;      // degrees each card turns per step away from centre
const DEPTH = 150;    // px pushed back per step

export default function Projects() {
  const [tech, setTech] = useState(null);
  const [detail, setDetail] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const dialogRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const shown = projects.filter((p) => !tech || p.stack.includes(tech));
  const webs = repos.filter((r) => r.group === 'web' && r.live);
  const games = repos.filter((r) => r.group === 'games' && r.live);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (detail && !d.open) d.showModal();
    if (!detail && d.open) d.close();
  }, [detail]);

  // Orbit loop: one rAF, transforms written straight to each card.
  useEffect(() => {
    const stage = stageRef.current;
    const cards = cardRefs.current.filter(Boolean);
    const N = cards.length;
    if (!stage || !N) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const st = { off: 0, paused: false, drag: false, sx: 0, so: 0, moved: false, last: performance.now() };
    let raf = 0;

    const frame = (now) => {
      const dt = Math.min((now - st.last) / 1000, 0.05);
      st.last = now;
      if (!st.paused && !st.drag && !reduce) st.off += dt * SPEED;
      const w = cards[0].offsetWidth * SPREAD;
      for (let i = 0; i < N; i++) {
        let d = (((i - st.off) % N) + N) % N;
        if (d > N / 2) d -= N;
        const a = Math.abs(d);
        const k = Math.min(a, 3);
        const x = d * w;
        const z = -k * DEPTH;
        const ry = Math.max(-70, Math.min(70, -d * TURN));
        const s = 1 - k * 0.1;
        const op = Math.max(0, 1 - Math.max(0, a - 1.4) * 0.6);
        const el = cards[i];
        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${ry}deg) scale(${s})`;
        el.style.opacity = op;
        el.style.zIndex = String(Math.round(100 - a * 10));
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const down = (e) => {
      st.drag = true; st.moved = false; st.sx = e.clientX; st.so = st.off;
    };
    const move = (e) => {
      if (!st.drag) return;
      const dx = e.clientX - st.sx;
      if (!st.moved && Math.abs(dx) > 6) {
        st.moved = true;
        stage.setPointerCapture?.(e.pointerId);
        stage.classList.add('is-drag');
      }
      if (st.moved) st.off = st.so - dx / (cards[0].offsetWidth * SPREAD);
    };
    const up = () => { st.drag = false; stage.classList.remove('is-drag'); };
    const enter = () => { st.paused = true; };
    const leave = () => { st.paused = false; };

    stage.addEventListener('pointerdown', down);
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);
    stage.addEventListener('pointerenter', enter);
    stage.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener('pointerdown', down);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerup', up);
      stage.removeEventListener('pointercancel', up);
      stage.removeEventListener('pointerenter', enter);
      stage.removeEventListener('pointerleave', leave);
    };
  }, [tech]);

  cardRefs.current = [];

  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="eyebrow mb-3">Projects</p>
        <Heading lines={['Selected work']} className="big-title" />
        <p className="lead-text mt-3 mb-4">The work turns on its own. Hover to pause, or drag to spin it.</p>
        <div className="d-flex flex-wrap gap-2 mb-2" role="group" aria-label="Filter by technology">
          <button type="button" className="chip" aria-pressed={!tech} onClick={() => setTech(null)}>All</button>
          {TECH.map((t) => <button key={t} type="button" className="chip" aria-pressed={tech === t} onClick={() => setTech(t)}>{t}</button>)}
        </div>
      </div>

      {shown.length > 0 && (
        <div key={tech || 'all'} ref={stageRef} className="pj-orbit" aria-label="Projects carousel">
          {shown.map((p, i) => (
            <article key={p.id} className="pj-orbit-card" ref={(el) => { cardRefs.current[i] = el; }}>
              <img src={p.shots[0][0]} alt={`${p.title}, ${p.shots[0][1]} screen`} width="1280" height="800" loading="lazy" draggable={false} />
              <div className="pj-orbit-body">
                <h3>{p.title}</h3>
                <p>{p.plain}</p>
                <div className="d-flex gap-2 flex-wrap">
                  <button type="button" className="btn-pill ghost" onClick={() => setDetail(p)}>Details</button>
                  <a className="btn-pill" href={p.live} target="_blank" rel="noopener noreferrer">Live demo ↗</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <dialog ref={dialogRef} className="pj-dialog" aria-labelledby="pj-dialog-title" onClose={() => setDetail(null)}>
        {detail && (
          <div>
            <button type="button" className="pj-close" aria-label="Close details" onClick={() => dialogRef.current.close()}>×</button>
            <p className="eyebrow mb-1">{detail.kind}</p>
            <h3 id="pj-dialog-title" className="shelf-title">{detail.title}</h3>
            <p className="mb-3">{detail.summary}</p>
            <ul className="proj-feat">
              {detail.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <div className="shelf-tabs mb-4">
              {detail.stack.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
            <a className="btn-pill" href={detail.live} target="_blank" rel="noopener noreferrer">Live demo ↗</a>
          </div>
        )}
      </dialog>

      <div className="container text-center mt-4 pt-2">
        <button type="button" className="btn-pill ghost" aria-expanded={showAll} aria-controls="all-projects" onClick={() => setShowAll((v) => !v)}>
          {showAll ? 'Hide all projects' : 'View all projects'}
        </button>
        {showAll && (
          <div id="all-projects" className="text-start mt-5">
            <h3 className="group-title">Web Projects <span>{webs.length}</span></h3>
            <div className="row g-3">
              {webs.map((r) => (
                <div className="col-12 col-sm-6 col-lg-4" key={r.repo}>
                  <a className="tile" href={liveUrl(r)} target="_blank" rel="noopener noreferrer"><span className="tile-text"><strong>{r.title}</strong><small>{r.desc}</small></span><span aria-hidden="true">↗</span></a>
                </div>
              ))}
            </div>
            <h3 className="group-title">Web Games <span>{games.length}</span></h3>
            <div className="row g-3">
              {games.map((r) => (
                <div className="col-12 col-sm-6 col-lg-4" key={r.repo}>
                  <a className="tile" href={liveUrl(r)} target="_blank" rel="noopener noreferrer"><span className="tile-text"><strong>{r.title}</strong><small>{r.desc}</small></span><span aria-hidden="true">↗</span></a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
