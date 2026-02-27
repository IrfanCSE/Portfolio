import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';
import type { Experience as ExperienceType } from '../types/SiteData';

interface ExperienceProps {
  experience: ExperienceType[];
  startDate: string;
}

function calculateTotalYears(startDate: string): string {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (months < 0) { years--; months += 12; }
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ') || '< 1 mo';
}

function calculateDuration(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  if (months < 0) { years--; months += 12; }
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ') || '< 1 mo';
}

function ExperienceCard({ exp, index }: { exp: ExperienceType; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const duration = calculateDuration(exp.startDate, exp.endDate);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-10"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-primary-500 border-2 border-white dark:border-surface-950 shadow-sm z-10" />

      {/* Card */}
      <div className="card p-6 hover:border-surface-300 dark:hover:border-surface-700 transition-colors spotlight-card">
        {/* Header */}
        <div className="flex items-start gap-4">
          <img
            src={exp.logo}
            alt={exp.company}
            loading="lazy"
            className="w-10 h-10 rounded-xl object-cover border border-surface-200 dark:border-surface-700 flex-shrink-0 mt-0.5"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-surface-900 dark:text-white">
              {exp.role}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-0.5">
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 no-underline inline-flex items-center gap-1"
              >
                {exp.company} <FaExternalLinkAlt size={10} />
              </a>
              <span className="text-xs text-surface-400">·</span>
              <span className="text-sm text-surface-500 dark:text-surface-400">
                {exp.period}
              </span>
              <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full font-medium">
                {duration}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed mt-4">
          {exp.description}
        </p>

        {/* Expand/collapse responsibilities */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 cursor-pointer bg-transparent border-none p-0"
        >
          {expanded ? 'Hide details' : 'Show responsibilities'}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <FaChevronDown size={10} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden mt-3 space-y-2"
            >
              {exp.responsibilities.map((r, i) => (
                <li
                  key={i}
                  className="text-sm text-surface-600 dark:text-surface-300 flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0 mt-2" />
                  <span dangerouslySetInnerHTML={{ __html: r }} />
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Experience({ experience, startDate }: ExperienceProps) {
  const totalYears = calculateTotalYears(startDate);

  return (
    <section id="experience" className="py-24 bg-surface-50/50 dark:bg-surface-900/20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Where I've worked</span>
          <div className="flex flex-wrap items-end gap-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <span className="text-sm font-semibold text-surface-400 dark:text-surface-500 mb-1">
              {totalYears} total
            </span>
          </div>
        </motion.div>

        <div className="relative max-w-3xl">
          {/* Vertical timeline line */}
          <div className="absolute left-[5px] top-0 bottom-0 w-px bg-gradient-to-b from-primary-400 via-primary-300 to-accent-400/30 dark:from-primary-600 dark:via-primary-700 dark:to-accent-500/20" />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
