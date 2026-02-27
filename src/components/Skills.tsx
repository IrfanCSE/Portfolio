import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCloud,
  FaDatabase,
  FaCodeBranch,
  FaAngular,
  FaExchangeAlt,
  FaJenkins,
  FaJira,
  FaGitAlt,
  FaMemory,
  FaCubes,
  FaCloudUploadAlt,
} from 'react-icons/fa';
import { useSpotlight } from '../hooks/useSpotlight';
import type { Skills as SkillsType } from '../types/SiteData';

const iconMap: Record<string, React.ReactNode> = {
  FaCloud: <FaCloud />,
  FaDatabase: <FaDatabase />,
  FaCodeBranch: <FaCodeBranch />,
  FaAngular: <FaAngular />,
  FaExchangeAlt: <FaExchangeAlt />,
  FaJenkins: <FaJenkins />,
  FaJira: <FaJira />,
  FaGitAlt: <FaGitAlt />,
  FaMemory: <FaMemory />,
  FaCubes: <FaCubes />,
  FaCloudUploadAlt: <FaCloudUploadAlt />,
};

/* Horizontal progress bar with scroll-trigger */
function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-surface-700 dark:text-surface-200">{name}</span>
        <span className="text-sm font-bold text-primary-600 dark:text-primary-400 tabular-nums">
          {inView ? percentage : 0}%
        </span>
      </div>
      <div className="h-2 bg-surface-200 dark:bg-surface-700/60 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${percentage}%` : 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-400"
        />
      </div>
    </div>
  );
}

interface SkillsProps {
  skills: SkillsType;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Skills({ skills }: SkillsProps) {
  const { onMouseMove } = useSpotlight();

  return (
    <section id="skills" className="py-24">
      <div className="section-container space-y-16">
        {/* Primary Skills */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="section-label">Core competencies</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
              Professional <span className="gradient-text">Skills</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-7 max-w-3xl">
            {skills.primary.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <SkillBar name={skill.name} percentage={skill.percentage} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Skills */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h3 className="text-xl font-bold text-surface-900 dark:text-white">
              Also skilled in
            </h3>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onMouseMove={onMouseMove}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          >
            {skills.additional.map((skill) => (
              <motion.div
                key={skill.name}
                variants={cardVariants}
                whileHover={{ y: -3, scale: 1.03 }}
                className="card spotlight-card p-4 text-center cursor-default group"
              >
                <div
                  className={`text-3xl mb-2.5 mx-auto ${skill.color} group-hover:scale-110 transition-transform flex justify-center relative z-10`}
                >
                  {iconMap[skill.icon] ?? <FaCloud />}
                </div>
                <h3 className="text-xs font-semibold text-surface-700 dark:text-surface-300 relative z-10">
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
