import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaChevronUp } from 'react-icons/fa';
import type { Footer as FooterType } from '../types/SiteData';

interface FooterProps {
  footer: FooterType;
}

export default function Footer({ footer }: FooterProps) {
  const year = new Date().getFullYear();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Scroll-to-top FAB */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 p-3 rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/30 cursor-pointer border-none hover:bg-primary-700 transition-colors"
            aria-label="Scroll to top"
          >
            <FaChevronUp size={14} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-950">
        <div className="section-container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500 dark:text-surface-400">
            &copy; {year} {footer.text}.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/IrfanCSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-colors no-underline"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/irfan-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-colors no-underline"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
