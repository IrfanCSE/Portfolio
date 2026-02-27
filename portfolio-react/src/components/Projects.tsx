import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import type { Project } from '../types/SiteData';

interface ProjectsProps {
  projects: Project[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function Projects({ projects }: ProjectsProps) {
  // Collect unique technologies for filter
  const allTechs = Array.from(new Set(projects.flatMap((p) => p.technologies)));
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const filtered = activeTech
    ? projects.filter((p) => p.technologies.includes(activeTech))
    : projects;

  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            My <span className="gradient-text">Projects</span>
          </h2>

          {/* Technology filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveTech(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border-none ${
                activeTech === null
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-200 hover:bg-primary-100 dark:hover:bg-surface-800'
              }`}
            >
              All
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech === activeTech ? null : tech)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border-none ${
                  activeTech === tech
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-200 hover:bg-primary-100 dark:hover:bg-surface-800'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Project cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-surface-800 rounded-xl shadow-lg overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs px-3 py-1 rounded-full shadow font-medium">
                      {project.company}
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <p className="text-white text-sm">{project.description}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-surface-900 dark:text-white">{project.title}</h3>
                    <p className="text-surface-700 dark:text-surface-200 text-sm mb-4">{project.description}</p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-primary-500 hover:text-primary-400 transition-colors no-underline font-medium"
                        >
                          <FaGithub /> GitHub
                        </a>
                      )}
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-primary-500 hover:text-primary-400 transition-colors no-underline font-medium"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
