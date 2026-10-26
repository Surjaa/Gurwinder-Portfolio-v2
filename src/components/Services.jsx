import Heading from './Heading';
import { services } from '../data';

// Frosted glass cards. Each card: number and title on top, then the description, points and tools.
// Cards stack on top of each other as you scroll (CSS sticky, no JS per frame).
export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <p className="eyebrow mb-3">What I offer</p>
        <Heading lines={['Three things', 'I can build']} accentLine={1} className="big-title mb-5" />
        {services.map((s, i) => (
          <article
            key={s.title}
            className="glass-card"
            style={{ position: 'sticky', top: 110 + i * 22, marginBottom: '6vh' }}
          >
            <span className="glass-num">0{i + 1}</span>
            <h3 className="glass-title">{s.title}</h3>
            <div className="row g-4">
              <div className="col-12 col-md-5">
                <p className="fs-5 m-0" style={{ opacity: 0.9 }}>{s.plain}</p>
              </div>
              <div className="col-12 col-md-7">
                <ul className="list-unstyled m-0 d-grid gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="d-flex gap-2">
                      <span className="accent-text" aria-hidden="true">→</span><span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="d-flex flex-wrap gap-2 mt-4">
                  {s.tools.map((t) => <span key={t} className="chip" style={{ background: 'transparent', color: 'inherit', borderColor: 'currentColor' }}>{t}</span>)}
                </div>
              </div>
            </div>
          </article>
        ))}
        <div style={{ height: '4vh' }} />
      </div>
    </section>
  );
}
