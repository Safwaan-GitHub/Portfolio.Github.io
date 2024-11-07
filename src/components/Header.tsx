import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  navItems: { name: string; to: string }[];
}

const Header: React.FC<HeaderProps> = ({
  mobileMenuOpen,
  toggleMobileMenu,
  navItems,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background bg-opacity-90 backdrop-filter backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="home" smooth={true} duration={500} className="text-2xl font-bold text-primary cursor-pointer font-mono">
          SN
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={500}
              className="nav-link"
            >
              {item.name}
            </Link>
          ))}
          <a href="/resume.pdf" className="button" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </nav>
        <button
          className="md:hidden p-2 text-primary"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="md:hidden fixed top-0 right-0 bottom-0 w-3/4 bg-surface p-6 shadow-lg"
          >
            <div className="flex justify-end mb-8">
              <button onClick={toggleMobileMenu} className="text-primary">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  className="nav-link text-lg"
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              <a href="/resume.pdf" className="button text-center mt-4" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;