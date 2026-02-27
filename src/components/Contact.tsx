import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaCopy,
  FaCheck,
} from 'react-icons/fa';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { useSpotlight } from '../hooks/useSpotlight';
import type { Contact as ContactType } from '../types/SiteData';

const iconMap: Record<string, React.ReactNode> = {
  FaEnvelope: <FaEnvelope />,
  FaPhoneAlt: <FaPhoneAlt />,
  SiMicrosoftteams: <BsMicrosoftTeams />,
  FaLinkedin: <FaLinkedin />,
};

interface ContactProps {
  contact: ContactType;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.08 }
  }),
};

export default function Contact({ contact }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const { onMouseMove } = useSpotlight();

  const copyEmail = () => {
    navigator.clipboard.writeText(contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="py-24 bg-surface-50/50 dark:bg-surface-900/20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="section-label">Get in touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
            {contact.heading.split(' ').slice(0, 2).join(' ')}{' '}
            <span className="gradient-text">
              {contact.heading.split(' ').slice(2).join(' ')}
            </span>
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-10 leading-relaxed">
            {contact.subtext}{' '}
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 cursor-pointer bg-transparent border-none p-0 text-base"
              title="Click to copy"
            >
              {contact.email}
              <span className="text-sm">
                {copied ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
              </span>
            </button>
            {copied && (
              <span className="ml-2 text-xs font-medium text-emerald-500">Copied!</span>
            )}
          </p>
        </motion.div>

        {/* Contact link cards */}
        <div
          onMouseMove={onMouseMove}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl"
        >
          {contact.links.map((link, i) => (
            <motion.a
              key={link.platform}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="card spotlight-card p-5 flex items-center gap-4 no-underline group hover:border-surface-300 dark:hover:border-surface-600 transition-colors"
            >
              <div className={`text-2xl ${link.color} flex-shrink-0 group-hover:scale-110 transition-transform relative z-10`}>
                {iconMap[link.icon] ?? <FaEnvelope />}
              </div>
              <div className="relative z-10 min-w-0">
                <div className="text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-0.5">
                  {link.platform}
                </div>
                <div className="text-sm font-medium text-surface-700 dark:text-surface-200 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {link.label}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

