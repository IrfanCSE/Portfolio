import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import type { About as AboutType } from '../types/SiteData';

interface AboutProps {
  about: AboutType;
}

export default function About({ about }: AboutProps) {
  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">Who I am</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-surface-900 dark:text-white">
            About <span className="gradient-text">Me</span>
          </h2>

          <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 flex justify-center md:justify-start"
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary-500/30 to-accent-400/30 blur-md" />
                <img
                  src={about.photo}
                  alt="Irfanul Hasan"
                  loading="lazy"
                  className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl object-cover border border-surface-200 dark:border-surface-700 shadow-lg"
                />
              </div>
            </motion.div>

            {/* Bio + Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-3 space-y-6"
            >
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-surface-600 dark:text-surface-300"
                >
                  {p}
                </p>
              ))}

              {about.highlights && about.highlights.length > 0 && (
                <div className="pt-2">
                  <p className="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-4">
                    What I do
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {about.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-surface-700 dark:text-surface-200 text-sm"
                      >
                        <FaCheckCircle className="text-primary-500 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
