import { useEffect } from 'react';
import { PrefsProvider } from './context';
import { trackVisit } from './api';
import Cursor from './components/Cursor';
import Background from './components/Background';
import Intro from './components/Intro';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Statement from './components/Statement';
import Services from './components/Services';
import BiMis from './components/BiMis';
import Process from './components/Process';
import Projects from './components/Projects';
import Game from './components/Game';
import Footer from './components/Footer';
import PortfolioAgent from './components/PortfolioAgent';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Timeline from './components/Timeline';
import Contact from './components/Contact';

export default function App() {
  useEffect(() => { trackVisit(); }, []);
  return (
    <PrefsProvider>
      <Intro />
      <Background />
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <Ticker />
        <Statement />
        <Services />
        <BiMis />
        <Process />
        <Projects />
        <section id="game" className="section">
          <div className="container">
            <p className="eyebrow mb-3">Interactive</p>
            <h2 className="big-title game-section-title mb-4">Collect my skills</h2>
            <p className="lead-text mb-4">A small break. Steer the snake onto each skill tile and collect all twelve to unlock a message.</p>
            <Game />
          </div>
        </section>
        <Skills />
        <Timeline />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <PortfolioAgent />
    </PrefsProvider>
  );
}
