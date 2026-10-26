import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Heading from './Heading';

// "The path so far": a vertical timeline of education and work, with the current status at the end.
const steps = [
  { when: '2018 to 2020', title: 'Higher Secondary, Commerce', text: 'Sutlej Public Senior Secondary School, Banga.' },
  { when: 'Aug 2020 to May 2023', title: 'Bachelor of Computer Applications', text: 'Lyallpur Khalsa College, Guru Nanak Dev University, Jalandhar. Studied networking, operating systems, DBMS, software engineering and web technologies.' },
  {
    when: 'Jan to Mar 2023', title: 'Web Developer, Ansh Infotech', text: 'Ludhiana, Punjab.',
    bullets: [
      'Developed and maintained PHP-based web application features using HTML5, CSS3, JavaScript and Bootstrap.',
      'Improved interface consistency and responsiveness across desktop and mobile devices.',
      'Implemented UI components and form validation, and assisted with cross-browser testing and front-end performance optimization.',
    ],
  },
  {
    when: 'Aug 2023 to Jul 2026', title: 'Front-End Developer, The Knowledge Academy (TKA)', text: 'Jalandhar, Punjab.',
    bullets: [
      'Developed responsive, mobile-first interfaces using HTML5, CSS3, JavaScript, React.js and Bootstrap 5.',
      'Built reusable React components, dynamic forms, navigation systems and client-side validation.',
      'Created responsive data tables, interactive charts and dashboard interfaces.',
      'Customized WordPress themes, maintained website functionality, and used Git and GitHub for version control.',
      'Tested and debugged interfaces across mobile, tablet and desktop for usability and cross-browser compatibility.',
    ],
  },
];

export default function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] });
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section id="path" className="section" ref={ref}>
      <div className="container">
        <p className="eyebrow mb-3">Timeline</p>
        <Heading lines={['The path so far']} className="big-title" />
        <p className="lead-text mt-3 mb-5">
          Education, development experience, business intelligence work, MIS reporting and the management responsibilities that shape how I build practical digital systems.
        </p>

        <ol className="tl">
          <motion.span className="tl-line" aria-hidden="true" style={{ scaleY: grow }} />
          {steps.map((s) => (
            <motion.li key={s.title} className="tl-item" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
              <time>{s.when}</time>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {s.bullets && (
                <ul>
                  {s.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              )}
            </motion.li>
          ))}
          <motion.li className="tl-item tl-next" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
            <time>Now</time>
            <h3>Open to the next chapter</h3>
            <p>Focused on opportunities combining Front-End Development, BI Analysis / Development, dashboards, reporting and data-driven business systems. <a href="#contact">Let&apos;s talk</a>.</p>
          </motion.li>
        </ol>
      </div>
    </section>
  );
}
