import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from 'react-icons/fa';
import { useSpotlight } from '../hooks/useSpotlight';
import type { Project } from '../types/SiteData';

interface ProjectsProps {
  projects: Project[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
};

export default function Projects({ projects }: ProjectsProps) {
  const allTechs = Array.from(new Set(projects.flatMap((p) => p.technologies)));
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const { onMouseMove } = useSpotlight();

  const filteredProjects = activeTech
    ? projects.filter((p) => p.technologies.includes(activeTech))
    : projects;

  const featured = projects.find((p) => p.featured);
  const regular = filteredProjects.filter((p) => !p.featured || activeTech !== null);

  return (
    <section id="projects" className="py-24 bg-surface-50/50 dark:bg-surface-900/20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-label">What I've built</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* ── Featured project (shown when no filter active) ── */}
        {featured && !activeTech && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="card spotlight-card overflow-hidden" onMouseMove={onMouseMove}>
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative overflow-hidden h-56 md:h-auto">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 dark:to-black/10" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                        Featured
                      </span>
                      <span className="text-xs font-medium text-surface-400 dark:text-surface-500">
                        {featured.company}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">
                      {featured.title}
                    </h3>
                    <p className="text-surface-600 dark:text-surface-300 leading-relaxed mb-5">
                      {featured.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featured.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 rounded-full border border-surface-200 dark:border-surface-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {featured.github && (
                      <a
                        href={featured.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-surface-600 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors no-underline"
                      >
                        <FaGithub size={15} /> View Code
                      </a>
                    )}
                    <a
                      href={featured.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors no-underline"
                    >
                      Live Demo <FaArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Technology filter ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTech(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border ${
              activeTech === null
                ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                : 'bg-transparent border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400'
            }`}
          >
            All
          </button>
          {allTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveTech(tech === activeTech ? null : tech)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border ${
                activeTech === tech
                  ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                  : 'bg-transparent border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* ── Regular project grid ── */}
        <motion.div
          onMouseMove={onMouseMove}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {regular.map((project) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                layout
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                className="card spotlight-card overflow-hidden group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-44">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm">
                      {project.company}
                    </span>
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-600/90 text-white">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 relative z-10">
                  <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-xs font-medium bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 rounded-full border border-surface-200 dark:border-surface-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white transition-colors no-underline"
                      >
                        <FaGithub size={13} /> Code
                      </a>
                    )}
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors no-underline"
                    >
                      <FaExternalLinkAlt size={11} /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
