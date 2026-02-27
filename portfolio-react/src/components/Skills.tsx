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

/* Animated circular progress */
function SkillCircle({ name, percentage }: { name: string; percentage: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (inView ? percentage / 100 : 0) * circumference;

  return (
    <div ref={ref} className="text-center">
      <div className="relative inline-block w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle
            className="text-surface-200 dark:text-surface-700"
            strokeWidth="3"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="18"
            cy="18"
          />
          <circle
            className="text-primary-500"
            strokeWidth="3"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="18"
            cy="18"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-surface-900 dark:text-white">
          <CountUp target={inView ? percentage : 0} />%
        </div>
      </div>
      <h3 className="text-base font-semibold mt-3 text-surface-700 dark:text-white">{name}</h3>
    </div>
  );
}

/* Count-up animation */
function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }
    let start = 0;
    const duration = 1200;
    const step = duration / target;
    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
}

interface SkillsProps {
  skills: SkillsType;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-20">
      <div className="section-container space-y-12">
        {/* Primary Skills */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Professional <span className="gradient-text">Skills</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {skills.primary.map((skill) => (
              <SkillCircle key={skill.name} name={skill.name} percentage={skill.percentage} />
            ))}
          </div>
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-xl font-bold text-center mb-8">
            Additionally
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {skills.additional.map((skill) => (
              <motion.div
                key={skill.name}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.04 }}
                className="bg-white dark:bg-surface-800 p-5 rounded-xl shadow-md text-center group cursor-default"
              >
                <div className={`text-4xl mb-3 mx-auto ${skill.color} group-hover:scale-110 transition-transform flex justify-center`}>
                  {iconMap[skill.icon] ?? <FaCloud />}
                </div>
                <h3 className="text-sm font-semibold text-surface-900 dark:text-white">{skill.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
