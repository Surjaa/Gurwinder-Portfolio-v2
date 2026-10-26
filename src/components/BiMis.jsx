import Heading from './Heading';
import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { bizCounters, bizPillars } from '../data';
import Counter from './Counter';
import PlainNote from './PlainNote';

const FLOW = [
  { title: 'Collect', text: 'Sales, stock and money records come in from many places.' },
  { title: 'Clean', text: 'Duplicates and wrong entries are checked and fixed.' },
  { title: 'Show', text: 'Numbers become charts, KPIs and tables anyone can read.' },
  { title: 'Decide', text: 'Managers see what is late, what is short and what to do next.' },
];

export default function BiMis() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bars = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setStep(Math.min(FLOW.length - 1, Math.floor(v * FLOW.length))));

  return (
    <section id="bi-mis" className="section" ref={ref}>
      <div className="container">
        <p className="eyebrow mb-3">BI and MIS</p>
        <Heading lines={['Messy numbers,', 'clear decisions.']} accentLine={1} className="big-title mb-5" />

        <div className="position-relative mb-5" style={{ padding: '0 0 0 0' }}>
          <svg viewBox="0 0 1000 120" width="100%" height="120" preserveAspectRatio="none" aria-hidden="true" style={{ display: 'block', overflow: 'visible' }}>
            <motion.path d="M0 60 C 150 0, 250 120, 400 60 S 650 0, 800 60 S 950 120, 1000 60" fill="none" stroke="var(--accent)" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
          </svg>
          <div className="d-grid gap-3 mt-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }} role="group" aria-label="How data becomes a decision">
            {FLOW.map((f, i) => (
              <button key={f.title} type="button" onClick={() => setStep(i)} aria-pressed={step === i}
                className="text-start p-3" style={{ borderRadius: 18, border: `1.5px solid ${step === i ? 'var(--accent)' : 'var(--line)'}`, background: step === i ? 'var(--surface)' : 'transparent', color: 'var(--ink)', minHeight: 56, transition: 'border-color .3s, transform .25s' }}>
                <span className="eyebrow">0{i + 1}</span>
                <div className="fw-bold fs-5">{f.title}</div>
              </button>
            ))}
          </div>
          <motion.p key={step} className="lead-text mt-3 mb-0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} aria-live="polite">
            <strong style={{ color: 'var(--ink)' }}>{FLOW[step].title}: </strong>{FLOW[step].text}
          </motion.p>
        </div>

        <div className="row g-4">
          {bizPillars.map((p) => (
            <div className="col-12 col-lg-6" key={p.title}>
              <div className="h-100 p-4 p-md-5" style={{ background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--line)' }}>
                <h3 className="fs-2 fw-bold mb-3" style={{ fontStretch: '85%' }}>{p.title}</h3>
                <ul className="list-unstyled m-0 d-grid gap-2">
                  {p.points.map((pt) => <li key={pt} className="d-flex gap-2"><span className="accent-text">■</span><span>{pt}</span></li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mt-1">
          {bizCounters.map((k) => (
            <div className="col-12 col-md-4" key={k.label}>
              <div className="p-4" style={{ borderTop: '2px solid var(--ink)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStretch: '85%', fontWeight: 800, fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1 }}>
                  <Counter value={k.value} suffix={k.suffix} />
                </div>
                <div className="text-secondary mt-2">{k.label}</div>
              </div>
            </div>
          ))}
        </div>
        <motion.div style={{ scaleX: bars, transformOrigin: 'left' }} className="mt-4" aria-hidden="true">
          <div style={{ height: 6, background: 'var(--accent)', borderRadius: 6 }} />
        </motion.div>
        <PlainNote>A dashboard is one screen of charts that shows the most important numbers, so nobody digs through spreadsheets.</PlainNote>
      </div>
    </section>
  );
}
