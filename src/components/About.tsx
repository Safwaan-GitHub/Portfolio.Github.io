import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const About: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showHand, setShowHand] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const listedSkills = ['JavaScript (ES6+)', 'React', 'Node.js', 'TypeScript', 'Python', 'AWS'];
  const highlightedSkills = ['Java', 'Spring Boot', 'RESTful APIs', 'SQL Server', 'TypeScript', 'C++', 'parallel computing', 'Agile', 'DevOps', 'Docker', 'Jenkins'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowHand(true);
          setTimeout(() => setShowHand(false), 5000); // Hide after 5 seconds
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  const highlightText = (text: string) => {
    const words = text.split(' ');
    const result = [];

    for (let i = 0; i < words.length; i++) {
      let matchedSkill = null;
      let matchedWordCount = 1;

      // Check for multi-word skills
      for (let j = 1; j <= 3 && i + j <= words.length; j++) {
        const phrase = words.slice(i, i + j).join(' ');
        const match = highlightedSkills.find(skill => 
          phrase.toLowerCase() === skill.toLowerCase() ||
          phrase.toLowerCase() === skill.toLowerCase() + ',' ||
          phrase.toLowerCase() === skill.toLowerCase() + '.'
        );
        if (match) {
          matchedSkill = match;
          matchedWordCount = j;
          break;
        }
      }

      if (matchedSkill) {
        result.push(
          <React.Fragment key={i}>
            <motion.span
              initial={{ color: 'inherit' }}
              animate={isHovered ? { color: '#4CAF50' } : { color: 'inherit' }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="inline-block"
            >
              {words.slice(i, i + matchedWordCount).join(' ')}
            </motion.span>
            {' '}
          </React.Fragment>
        );
        i += matchedWordCount - 1; // Skip the words we've just processed
      } else {
        result.push(<span key={i}>{words[i]} </span>);
      }
    }

    return result;
  };

  const handWave = {
    wave: {
      rotate: [0, 14, -8, 14, -4, 10, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <section id="about" className="py-20 relative" ref={aboutRef}>
      <div className="container mx-auto px-4">
        <div className="relative mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-heading"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {highlightText('About Me')}
          </motion.h2>
          <AnimatePresence>
            {showHand && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 bottom-full mb-4 flex items-center"
                style={{ zIndex: 10 }}
              >
                <motion.div
                  animate="wave"
                  variants={handWave}
                  style={{ fontSize: '2rem', marginRight: '0.5rem' }}
                >
                  👋🏾
                </motion.div>
                <div className="bg-primary bg-opacity-20 p-2 rounded-lg shadow-lg relative backdrop-filter backdrop-blur-sm">
                  <div className="text-sm font-medium text-primary">Hey, hover me!</div>
                  <div 
                    className="absolute left-1/2 bottom-0 w-3 h-3 bg-primary bg-opacity-20 backdrop-filter backdrop-blur-sm" 
                    style={{
                      transform: 'translateX(-50%) rotate(45deg) translateY(50%)',
                    }}
                  ></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-2/3 mb-8 md:mb-0 pr-8"
          >
            <div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="transition-all duration-300"
            >
              <p className="text-lg mb-4">
                {highlightText('My journey as a developer began with a drive to solve real-world problems, starting with Java and Spring Boot to build enterprise-level applications. Early on, I gained expertise in crafting robust backends, integrating RESTful APIs, and optimizing SQL Server databases for high performance. These foundational experiences taught me the importance of scalable code and sparked my curiosity to expand beyond backend development.')}
              </p>
              <p className="text-lg mb-4">
                {highlightText('Moving forward, I embraced front-end development with TypeScript and React, creating intuitive, user-focused interfaces. My exploration into C++ opened new doors in algorithmic challenges and parallel computing, deepening my problem-solving skills. With Agile and DevOps practices—using tools like Docker and Jenkins—I\'ve become more efficient and adaptable. Each project has broadened my skill set, reinforcing my commitment to building resilient, impactful solutions.')}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:w-1/3"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-primary rounded-md blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <img
                src="https://raw.githubusercontent.com/Safwaan-GitHub/profilepic/main/Profile%20picture.jpeg"
                alt="Safwaan Noor"
                className="relative rounded-md grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
