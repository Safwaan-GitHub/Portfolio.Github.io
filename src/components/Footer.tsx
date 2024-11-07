import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-text py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Safwaan Noor</p>
            <p className="text-sm">Software Developer</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/Safwaan-GitHub" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
              <Github size={24} />
            </a>
            <a href="www.linkedin.com/in/safwaan-noor" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
              <Linkedin size={24} />
            </a>
            <a href="mailto:safwaan.n@hotmail.com" className="hover:text-primary transition-colors duration-300">
              <Mail size={24} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Safwaan Noor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;