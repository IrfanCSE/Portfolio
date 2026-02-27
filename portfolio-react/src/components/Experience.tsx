import { motion } from 'framer-motion';
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
  if (months < 0) {
    years--;
    months += 12;
  }
  return `${years}+ years`;
}

function calculateDuration(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ') || 'Less than a month';
}

export default function Experience({ experience, startDate }: ExperienceProps) {
  const totalYears = calculateTotalYears(startDate);

  return (
    <section id="experience" className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Work <span className="gradient-text">Experience</span>
            <span className="ml-2 text-sm align-super text-accent-400">({totalYears})</span>
          </h2>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-accent-400 transform md:-translate-x-1/2" />

            {experience.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const duration = calculateDuration(exp.startDate, exp.endDate);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row items-start mb-12 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-surface-900 transform -translate-x-1/2 mt-6 z-10 shadow" />

                  {/* Card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? 'md:pr-8' : 'md:pl-8'
                    }`}
                  >
                    <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-surface-900 dark:text-white">
                            {exp.role}
                          </h3>
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-400 font-semibold no-underline"
                          >
                            {exp.company}
                          </a>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-sm text-surface-700 dark:text-surface-200">
                              {exp.period}
                            </span>
                            <span className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full">
                              {duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-surface-700 dark:text-surface-200 mb-3 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Responsibilities */}
                      <ul className="space-y-2">
                        {exp.responsibilities.map((r, ri) => (
                          <li
                            key={ri}
                            className="text-sm text-surface-700 dark:text-surface-200 flex items-start gap-2"
                          >
                            <span className="text-primary-500 mt-1">&#9679;</span>
                            <span dangerouslySetInnerHTML={{ __html: r }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
