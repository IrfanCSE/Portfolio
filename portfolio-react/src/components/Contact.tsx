import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaSkype,
  FaLinkedin,
} from 'react-icons/fa';
import type { Contact as ContactType } from '../types/SiteData';

const iconMap: Record<string, React.ReactNode> = {
  FaEnvelope: <FaEnvelope />,
  FaPhoneAlt: <FaPhoneAlt />,
  FaSkype: <FaSkype />,
  FaLinkedin: <FaLinkedin />,
};

interface ContactProps {
  contact: ContactType;
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

export default function Contact({ contact }: ContactProps) {
  return (
    <section id="contact" className="py-20 min-h-[80vh] flex items-center">
      <div className="section-container w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            {contact.heading.split(' ')[0]}{' '}
            <span className="gradient-text">{contact.heading.split(' ').slice(1).join(' ')}</span>
          </h2>

          {/* Social links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
          >
            {contact.links.map((link) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex items-center justify-center gap-3 p-5 bg-white dark:bg-surface-800 rounded-xl shadow-md hover:shadow-lg transition-shadow no-underline group"
              >
                <span className={`text-2xl ${link.color} group-hover:scale-110 transition-transform`}>
                  {iconMap[link.icon] ?? <FaEnvelope />}
                </span>
                <span className="text-surface-700 dark:text-surface-200 font-medium">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Email text */}
          <div className="text-center">
            <p className="text-surface-700 dark:text-surface-200">
              {contact.subtext}{' '}
              <a
                href={`mailto:${contact.email}`}
                className="text-primary-500 hover:text-primary-400 transition-colors font-medium"
              >
                {contact.email}
              </a>
            </p>
          </div>
        </motion.div>

        {/* Scroll to top */}
        <div className="flex justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors cursor-pointer border-none"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
