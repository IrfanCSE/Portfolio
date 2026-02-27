import { motion } from 'framer-motion';
import type { About as AboutType } from '../types/SiteData';

interface AboutProps {
  about: AboutType;
}

export default function About({ about }: AboutProps) {
  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            About <span className="gradient-text">Me</span>
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-primary-400 to-accent-400 rounded-full blur-sm" />
                <img
                  src={about.photo}
                  alt="Profile"
                  className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-xl"
                />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-surface-700 dark:text-surface-200 text-center md:text-left"
                >
                  {p}
                </p>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
