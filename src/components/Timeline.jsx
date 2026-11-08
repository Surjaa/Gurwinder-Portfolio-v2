import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Heading from './Heading';

// "The path so far": a vertical timeline of education and work, with the current status at the end.
const steps = [
  { when: '2018 to 2020', title: 'Higher Secondary, Commerce', text: 'Sutlej Public Senior Secondary School, Banga.' },
  { when: 'Aug 2020 to May 2023', title: 'Bachelor of Computer Applications', text: 'Lyallpur Khalsa College, Guru Nanak Dev University, Jalandhar. Studied networking, operating systems, DBMS, software engineering and web technologies.' },
  {
    when: 'Aug 2023 – July 2026', title: 'Front-End Developer', text: 'The Knowledge Academy (TKA), Jalandhar, Punjab, IN.',
    bullets: [
      'Developed responsive, mobile-first interfaces using HTML5, CSS3, JavaScript, React.js and Bootstrap 5.',
      'Built reusable React components, dynamic forms, navigation systems and client-side validation.',
      'Created responsive data tables, interactive charts and dashboard interfaces.',
      'Customized WordPress themes, maintained website functionality, and used Git and GitHub for version control.',
      'Tested and debugged interfaces across mobile, tablet and desktop for usability and cross-browser compatibility.',
    ],
  },
  {
    when: 'Sept 2026 – Present', title: 'Full Stack Developer & MIS Executive', text: 'Dinero FoodWorks / Century Private Limited, Nawanshahr, Punjab, IN.',
    bullets: [
      'Build and maintain the Financial Management System (FMS), Inventory Management System (IMS) and Purchase Management System (PMS) that run daily plant and purchasing workflows.',
      'Develop backend services and REST APIs with Node.js and Express, backed by PostgreSQL schemas for transactions, stock movements and purchase records.',
      'Build responsive React and TypeScript interfaces, forms and dashboards that let management track approvals, stock levels and purchase status.',
      'Design, develop and manage two company websites, covering layout, content, page structure and ongoing updates.',
      'Support day-to-day operations by fixing issues and updating FMS, IMS and PMS features as business processes change.',
      'Automate operational reports with Google Sheets, Google Apps Script and triggers, replacing manual data consolidation.',
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
