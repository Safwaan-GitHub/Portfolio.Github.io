import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    title: "Java Developer",
    company: "Tata Consultancy Services, London",
    period: "Feb 2022 – Dec 2022",
    description: [
      "Led the development of enterprise-level applications using Java and Spring Boot, improving responsiveness and customer satisfaction.",
      "Integrated RESTful APIs and optimized backend performance with SQL Server, reducing response times by 20%.",
      "Collaborated with cross-functional teams to design and implement data pipelines, improving data quality by 15% and supporting real-time insights for business decision-making.",
      "Utilized Hibernate for ORM, Maven for build automation, and GitHub Actions for CI/CD to streamline deployment and testing workflows.",
    ]
  },
  {
    title: "Software Developer",
    company: "Independent Projects | Freelance | University of Hull",
    period: "Mar 2016 – Jan 2022",
    description: [
      "Developed a secure client-server Petrol Station Management system using Java and TCP/IP protocols for real-time data transmission.",
      "Built a machine learning program in Python using Keras, demonstrating an ability to solve algorithmic challenges and implement data-driven solutions.",
      "Created an inventory management system with Spring Boot, integrating RESTful APIs for real-time updates and incorporating role-based access control.",
      "Developed a web-based application using React and Node.js, enhancing user experience and improving data visualization.",
      "Designed and implemented RESTful APIs, enhancing data flow between front-end and back-end systems.",
      "Collaborated with cross-functional teams to design and implement data pipelines, improving data quality by 15% and supporting real-time insights for business decision-making.",
    ]
  },
  // Add more experiences as needed
];

const highlightedSkills = ['Java', 'Spring Boot', 'RESTful APIs', 'SQL Server', 'Hibernate', 'Maven', 'GitHub Actions', 'CI/CD', 'TCP/IP', 'Python', 'Keras', 'React', 'Node.js'];

const Experience: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const highlightText = (text: string, isHovered: boolean) => {
    const words = text.split(/(\s+)/);
    const result = [];
    let i = 0;

    while (i < words.length) {
      let matchFound = false;
      for (let j = 3; j > 0; j--) {
        const phrase = words.slice(i, i + j).join('');
        const matchedSkill = highlightedSkills.find(skill => {
          const cleanPhrase = phrase.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
          const cleanSkill = skill.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
          return cleanPhrase.toLowerCase() === cleanSkill.toLowerCase() ||
                 (cleanPhrase.toLowerCase() + 's') === cleanSkill.toLowerCase() ||
                 cleanPhrase.toLowerCase() === (cleanSkill.toLowerCase() + 's');
        });
        if (matchedSkill) {
          result.push(
            <span
              key={i}
              className={`transition-colors duration-300 ${isHovered ? 'text-primary' : ''}`}
            >
              {words.slice(i, i + j).join('')}
            </span>
          );
          i += j;
          matchFound = true;
          break;
        }
      }
      if (!matchFound) {
        result.push(words[i]);
        i++;
      }
    }

    return result;
  };

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-heading text-center mb-12"
        >
          Work Experience
        </motion.h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface rounded-lg p-6 shadow-md"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h3 className="text-xl font-semibold mb-2 text-primary">
                {highlightText(exp.title, hoveredIndex === index)}
              </h3>
              <p className="text-secondary font-medium mb-2">
                {highlightText(exp.company, hoveredIndex === index)}
              </p>
              <p className="text-text mb-4">{exp.period}</p>
              <ul className="list-disc list-inside space-y-2">
                {exp.description.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-text">
                    {highlightText(item, hoveredIndex === index)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
