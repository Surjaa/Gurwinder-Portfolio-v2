import { useRef } from 'react';
import { motion, useSpring } from 'motion/react';
import { useReduced } from '../hooks';

// Pulls its child gently toward the pointer. Mouse-style pointers only.
export default function Magnetic({ children, strength = 0.28 }) {
  const ref = useRef(null);
  const reduce = useReduced();
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });
  const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
  if (reduce || !fine) return <span style={{ display: 'inline-block' }}>{children}</span>;

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span ref={ref} style={{ display: 'inline-block', x, y }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.span>
  );
}
