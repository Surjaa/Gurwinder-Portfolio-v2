import { motion } from 'motion/react';
import { certs, languages, writing } from '../data';
import Heading from './Heading';

// Credentials, languages and writing. Education and jobs live in the timeline above.
export default function Journey() {
  return (
    <section id="journey" className="section">
      <div className="container">
        <p className="eyebrow mb-3">Credentials</p>
        <Heading lines={['Recognition']} accentLine={0} className="big-title mb-5" />

        <div className="row g-4 pt-4" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="col-12 col-lg-6">
            <motion.div className="p-4 mb-4" style={{ background: 'var(--ink)', color: 'var(--bg)', borderRadius: 24 }} initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="eyebrow mb-2" style={{ color: 'inherit', opacity: 0.7 }}>Award</p>
              <p className="fs-4 fw-bold mb-1">Best HTML &amp; CSS Framework Developer</p>
              <p className="small mb-0" style={{ opacity: 0.75 }}>Tech Fest 2022, Lyallpur Khalsa College, GNDU</p>
            </motion.div>
            <p className="eyebrow mb-2">Certifications</p>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {certs.map((c, i) => (
                <motion.span key={c} className="chip" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>{c}</motion.span>
              ))}
            </div>
            <p className="eyebrow mb-2">Languages</p>
            <ul className="list-unstyled m-0">
              {languages.map(([l, lvl]) => (
                <li key={l} className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid var(--line)' }}>
                  <span className="fw-semibold">{l}</span><span className="text-secondary">{lvl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row g-4 mt-4">
          {writing.map((w, i) => (
            <div className="col-12 col-md-4" key={w.title}>
              <motion.div className="p-4 h-100" style={{ borderTop: '2px solid var(--ink)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStretch: '85%', fontWeight: 800, fontSize: '2.4rem', color: 'var(--accent)' }}>{w.big}</div>
                <div className="fw-bold mt-2">{w.title}</div>
                <div className="small text-secondary">{w.text}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
