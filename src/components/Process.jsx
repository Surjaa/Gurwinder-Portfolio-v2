import Heading from './Heading';
import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { processSteps } from '../data';

// Same section layout as the rest of the page: eyebrow and heading on top, content below.
// Steps light up in turn as you scroll down the list.
export default function Process() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.7'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(processSteps.length - 1, Math.max(0, Math.floor(v * processSteps.length)))));

  return (
    <section id="process" className="section" ref={ref}>
      <div className="container">
        <p className="eyebrow mb-3">How a page gets built</p>
        <Heading lines={['Five steps,', 'every project']} accentLine={0} className="big-title mb-5" />
        {processSteps.map((s, i) => (
          <motion.div key={s.title} className="py-4 d-flex gap-4" style={{ borderTop: '1px solid var(--line)', opacity: active >= i ? 1 : 0.3, transition: 'opacity .5s ease' }}>
            <span className="eyebrow pt-2">0{i + 1}</span>
            <div>
              <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: active === i ? 'var(--accent)' : 'var(--ink)', transition: 'color .4s' }}>{s.title}</h3>
              <p className="lead-text mt-2 mb-0">{s.plain}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
