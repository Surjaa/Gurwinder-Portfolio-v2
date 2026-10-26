import { useEffect, useState } from 'react';
import { heroStats } from '../data';
import { useReduced } from '../hooks';
import Counter from './Counter';
import './classic-hero.css';

const WORDS = ['responsive websites', 'BI dashboards', 'web applications', 'business systems'];
const CHIPS = ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap', 'Git'];
const CODE = "const developer = {\n  name: 'Gurwinder Parhar',\n  role: 'Full Stack Developer',\n  stack: ['HTML5', 'CSS3', 'JS', 'React'],\n  openToWork: true,\n};";

// Types the code card one character at a time (shows all of it at once with reduced motion).
function useTyped(text, reduce) {
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [text, reduce]);
  return text.slice(0, n);
}

// Types each word letter by letter, pauses, deletes it, then moves on. Shows the first word in full with reduced motion.
function useTypewriter(words, reduce) {
  const [st, setSt] = useState({ wi: 0, n: 0, del: false });
  useEffect(() => {
    if (reduce) return undefined;
    const word = words[st.wi];
    let delay = 70;
    let next;
    if (!st.del) {
      if (st.n < word.length) next = { ...st, n: st.n + 1 };
      else { delay = 1600; next = { ...st, del: true }; }
    } else if (st.n > 0) {
      delay = 35;
      next = { ...st, n: st.n - 1 };
    } else {
      next = { wi: (st.wi + 1) % words.length, n: 0, del: false };
    }
    const id = setTimeout(() => setSt(next), delay);
    return () => clearTimeout(id);
  }, [st, words, reduce]);
  return reduce ? words[0] : words[st.wi].slice(0, st.n);
}

export default function Hero() {
  const reduce = useReduced();
  const typed = useTypewriter(WORDS, reduce);
  const code = useTyped(CODE, reduce);

  return (
    <>
      <section id="home" className="ch-hero">
        <div className="ch-grid">
          <div className="ch-copy">
            <p className="ch-hi">Hi, I'm</p>
            <h1 className="ch-name">
              Gurwinder<br />Parhar<span>.</span>
            </h1>
            <p className="ch-role">
              <strong>Full Stack Developer</strong>
              <span className="ch-line">
                I build <em>{typed}</em>
                <i className="ch-caret" aria-hidden="true" />
              </span>
            </p>
            <p className="ch-text">
              I'm Gurwinder Parhar, a Full Stack Developer and BI Analyst. I build responsive websites and web applications, plus the business systems behind them: financial, inventory and purchase management tools, company websites and Power BI reporting dashboards.
            </p>
            <div className="ch-actions">
              <a className="ch-btn ch-btn-primary" href="#projects">See my projects</a>
            </div>
            <ul className="ch-meta">
              <li><span className="ch-pulse" />Open to new roles</li>
              <li>Punjab, India</li>
              <li>Full Stack Developer</li>
            </ul>
          </div>

          <div className="ch-visual">
            <div className="ch-portrait">
              <div className="ch-orbit" aria-hidden="true">
                {CHIPS.map((c, i) => (
                  <span key={c} className="ch-chip" style={{ '--a': `${i * 60}deg` }}>
                    <b>{c}</b>
                  </span>
                ))}
              </div>
              <div className="ch-frame">
                <img src="images/profile.webp" alt="Portrait of Gurwinder Parhar" width="900" height="900" />
              </div>
              <div className="ch-code" aria-hidden="true">
                <div className="ch-code-bar"><i /><i /><i /><span>developer.js</span></div>
                <pre>{code}</pre>
              </div>
            </div>
          </div>
        </div>
        <a className="ch-scroll" href="#about" aria-label="Scroll to About"><span /></a>
      </section>

      <div className="container">
        <dl className="row g-0 mt-5" style={{ borderTop: '1px solid var(--line)' }}>
          {heroStats.map((s) => (
            <div className="col-6 col-lg-3 py-4 pe-3" key={s.label} style={{ borderBottom: '1px solid var(--line)' }}>
              <dd className="m-0" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1 }}>
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="small mt-1 fw-semibold">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
