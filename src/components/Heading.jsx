import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useReduced } from '../hooks';

// Each line rises out of a mask when the heading scrolls into view.
// The visibility check watches the mask, not the moving line, because the mask hides the line at first.
function Line({ text, delay, accent }) {
  const ref = useRef(null);
  const reduce = useReduced();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <span ref={ref} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
      <motion.span
        style={{ display: 'block', color: accent ? 'var(--accent)' : undefined }}
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: inView || reduce ? '0%' : '110%' }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Heading({ lines, accentLine = -1, className = '', style, as = 'h2' }) {
  const Tag = as;
  return (
    <Tag className={className} style={style}>
      {lines.map((line, i) => <Line key={i} text={line} delay={i * 0.12} accent={i === accentLine} />)}
    </Tag>
  );
}
