import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useReduced } from '../hooks';
import ParticleField from './ParticleField';

// Page-wide background: one dot-and-line network behind every section.
// Pure CSS transforms, so it stays light. A thin progress bar tracks the scroll position.
export default function Background() {
  const reduce = useReduced();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (reduce) return undefined;
    const root = document.documentElement;
    let raf = 0;
    let tx = 50, ty = 30, cx = 50, cy = 30;
    const loop = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      root.style.setProperty('--mx', `${cx.toFixed(2)}%`);
      root.style.setProperty('--my', `${cy.toFixed(2)}%`);
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e) => {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <>
      <motion.div aria-hidden="true" className="progress-bar" style={{ scaleX: bar }} />
      <div aria-hidden="true" className="bg-layer">
        <ParticleField reduce={reduce} />
      </div>
    </>
  );
}
