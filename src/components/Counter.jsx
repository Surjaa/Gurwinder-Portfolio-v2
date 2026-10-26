import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { useReduced } from '../hooks';

// Counts up to `value` once it scrolls into view. Uses Indian digit grouping (2,19,200).
export default function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const reduce = useReduced();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
