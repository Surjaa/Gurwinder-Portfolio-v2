import { motion } from 'motion/react';
import { skillGroups } from '../data';
import Heading from './Heading';
import PlainNote from './PlainNote';

// Every skill group is shown at once. Bars fill in as each group comes into view.
export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <p className="eyebrow mb-3">Skills</p>
        <Heading lines={['My toolbox']} className="big-title mb-4" />
        <PlainNote>Three bars means I use it every day. One bar means I am still growing in it.</PlainNote>
        <div className="row g-4 mt-1">
          {Object.entries(skillGroups).map(([group, items]) => (
            <div className="col-12 col-md-6" key={group}>
              <motion.p className="eyebrow mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{group}</motion.p>
              <ul className="list-unstyled m-0">
                {items.map(([name, level, note]) => (
                  <motion.li key={name} whileHover={{ x: 12 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="d-flex align-items-center justify-content-between gap-3 py-3" style={{ borderTop: '1px solid var(--line)' }}>
                    <div>
                      <div className="fw-bold" style={{ fontFamily: 'var(--font-display)', fontStretch: '85%', fontSize: '1.25rem' }}>{name}</div>
                      <div className="small text-secondary">{note}</div>
                    </div>
                    <div className="d-flex gap-2" role="img" aria-label={`Level ${level} of 3`}>
                      {[1, 2, 3].map((d) => (
                        <motion.span key={d} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: d * 0.08, duration: 0.4 }}
                          style={{ width: 30, height: 9, borderRadius: 6, background: d <= level ? 'var(--accent)' : 'var(--line)', display: 'inline-block', transformOrigin: 'left' }} />
                      ))}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
