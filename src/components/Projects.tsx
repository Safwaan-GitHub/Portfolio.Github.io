import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  additionalLinks?: { name: string; url: string; description: string }[];
}

const Projects: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<{ projectIndex: number, text: string } | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const initialProjects: Project[] = [
    {
      title: "Minishell",
      description: "A simple shell implementation in C, featuring command execution, input/output redirection, pipes, and built-in commands. This project demonstrates low-level system programming and process management in Unix-like environments. It utilizes several of my previous projects including [Libft], [GetNextLine], [PIPEX], and [ft_printf] to create a fully functional shell.",
      technologies: ["C", "Unix", "Shell Scripting", "Process Management"],
      githubLink: "https://github.com/yourusername/minishell", // Replace with your actual Minishell repo if you have one
      additionalLinks: [
        { name: "Libft", url: "https://github.com/Safwaan-GitHub/Libft", description: "Custom C library used in Minishell" },
        { name: "GetNextLine", url: "https://github.com/Safwaan-GitHub/GNLSUB", description: "Function to read lines from file descriptor" },
        { name: "PIPEX", url: "https://github.com/Safwaan-GitHub/PipexSolution", description: "Implementation of pipe functionality used in Minishell" },
        { name: "ft_printf", url: "https://github.com/Safwaan-GitHub/ft_printf", description: "Custom printf implementation used in Minishell" }
      ]
    },
    {
      title: "Connectify",
      description: "A social media platform that connects people with similar interests. Features include user authentication, real-time messaging, and personalized content feeds.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      githubLink: "https://github.com/Safwaan-GitHub/Connectiy",
      liveLink: "https://connectifysocials.netlify.app"
    },
    {
      title: "Death's Collection",
      description: "An engaging 2D game developed in C using custom libraries. Players guide Death through mystical realms, collecting souls and avoiding animated enemies.",
      technologies: ["C", "MiniLibX", "Game Development"],
      githubLink: "https://github.com/Safwaan-GitHub/so_long",
    },
  ];

  const additionalProjects: Project[] = [
    {
      title: "Push_Swap",
      description: "An efficient sorting algorithm challenge that sorts a stack of numbers with minimal operations, demonstrating advanced data structure manipulation and optimization techniques.",
      technologies: ["C", "Algorithms", "Data Structures"],
      githubLink: "https://github.com/Safwaan-GitHub/push_swap",
    },
    {
      title: "Project 5",
      description: "Description for Project 5.",
      technologies: ["Tech1", "Tech2", "Tech3"],
      githubLink: "https://github.com/yourusername/project5",
    },
    {
      title: "Project 6",
      description: "Description for Project 6.",
      technologies: ["Tech1", "Tech2", "Tech3"],
      githubLink: "https://github.com/yourusername/project6",
    },
  ];

  const displayedProjects = showMore ? [...initialProjects, ...additionalProjects] : initialProjects;

  const handleTooltipHover = (projectIndex: number, description: string) => {
    setActiveTooltip({ projectIndex, text: description });
  };

  const handleTooltipLeave = () => {
    setActiveTooltip(null);
  };

  const renderDescription = (description: string, additionalLinks?: Project['additionalLinks'], projectIndex: number) => {
    if (!additionalLinks) return description;

    let result = description;

    // Replace links
    additionalLinks.forEach(link => {
      const regex = new RegExp(`\\[${link.name}\\]`, 'g');
      result = result.replace(regex, `<a 
        href="${link.url}"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary hover:text-secondary transition-colors duration-300 cursor-pointer tooltip-trigger"
        data-project-index="${projectIndex}"
        data-description="${link.description}"
      >${link.name}</a>`);
    });

    return result;
  };

  return (
    <section id="projects" className="py-20 bg-background" ref={projectsRef}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-heading text-center mb-12"
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card flex flex-col h-full relative group"
              >
                <div className="relative">
                  <img 
                    src={`https://picsum.photos/seed/${project.title}/400/200`} 
                    alt={project.title} 
                    className={`w-full h-48 object-cover transition-opacity duration-300 ${activeTooltip?.projectIndex === index ? 'opacity-20' : ''}`} 
                  />
                  {activeTooltip?.projectIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-80">
                      <p className="text-white text-center">{activeTooltip.text}</p>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{project.title}</h3>
                  <div 
                    className="text-text mb-4 flex-grow" 
                    dangerouslySetInnerHTML={{ __html: renderDescription(project.description, project.additionalLinks, index) }}
                    onMouseOver={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.classList.contains('tooltip-trigger') && target.dataset.projectIndex && target.dataset.description) {
                        handleTooltipHover(parseInt(target.dataset.projectIndex), target.dataset.description);
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!(e.target as HTMLElement).classList.contains('tooltip-trigger')) {
                        handleTooltipLeave();
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="skill-item">{tech}</span>
                    ))}
                  </div>
                  <div className="flex justify-between mt-auto">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors duration-300 flex items-center">
                      <Github size={20} className="mr-1" /> Code
                    </a>
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors duration-300 flex items-center">
                        <ExternalLink size={20} className="mr-1" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => setShowMore(!showMore)}
            className="btn btn-primary"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
