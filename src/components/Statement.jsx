import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { about, summary } from '../data';
import { useReduced } from '../hooks';
import PlainNote from './PlainNote';

// Each word lights up as the visitor scrolls through the statement.
function Word({ word, index, total, progress, reduce }) {
  const start = index / total;
  const end = start + 1 / total;
  const color = useTransform(progress, [start, end], ['var(--line)', 'var(--ink)']);
  return <motion.span style={{ color: reduce ? 'var(--ink)' : color, display: 'inline-block', marginRight: '0.25em' }}>{word}</motion.span>;
}

export default function Statement() {
  const ref = useRef(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] });
  const words = about.intro.split(' ');
  const photoRef = useRef(null);
  const { scrollYProgress: photoP } = useScroll({ target: photoRef, offset: ['start end', 'end start'] });
  const photoY = useTransform(photoP, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);

  return (
    <section id="about" className="section">
      <div className="container">
        <p className="eyebrow mb-4">About</p>
        <p ref={ref} className="fw-bold m-0" style={{ fontFamily: 'var(--font-display)', fontStretch: '85%', fontSize: 'clamp(2rem, 4.8vw, 4.2rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
          {words.map((w, i) => (
            <Word key={i} word={w} index={i} total={words.length} progress={scrollYProgress} reduce={reduce} />
          ))}
        </p>
        <p className="lead-text mt-4 mb-0" style={{ maxWidth: '70ch' }}>{summary}</p>
        <PlainNote>{about.plain}</PlainNote>
        <div className="row g-4 mt-4">
          {about.paragraphs.map((p) => (
            <div className="col-12 col-md-4" key={p.slice(0, 24)}>
              <p className="lead-text m-0">{p}</p>
            </div>
          ))}
        </div>
        <div className="row g-4 mt-2 align-items-center">
          <div className="col-12 col-md-5">
            <div ref={photoRef} style={{ borderRadius: 18, overflow: 'hidden', aspectRatio: '4 / 5' }}><motion.img src="images/portrait-about.webp" alt="Portrait of Gurwinder Parhar" width="800" height="1000" loading="lazy" decoding="async" style={{ width: '100%', height: '112%', objectFit: 'cover', y: photoY, marginTop: '-6%' }} /></div>
          </div>
          <div className="col-12 col-md-7">
            <dl className="m-0">
              {about.facts.map(([k, v]) => (
                <div key={k} className="d-flex justify-content-between gap-3 py-3" style={{ borderBottom: '1px solid var(--line)' }}>
                  <dt className="eyebrow m-0">{k}</dt>
                  <dd className="m-0 text-end fw-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
