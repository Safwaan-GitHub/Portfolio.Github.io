import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-scroll';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const navItems = [
    { name: 'About', to: 'about' },
    { name: 'Experience', to: 'experience' },
    { name: 'Work', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-background text-text">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        navItems={navItems}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX }}
      />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;