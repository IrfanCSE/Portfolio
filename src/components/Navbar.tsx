import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaDownload, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import type { Personal } from '../types/SiteData';

interface NavbarProps {
  personal: Personal;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ personal }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + window.innerHeight / 3;
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(el.id);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop floating pill navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-0.5 px-2 py-2 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-surface-900/95 border-surface-200 dark:border-surface-700/60 shadow-xl shadow-surface-900/5 backdrop-blur-xl'
            : 'bg-white/80 dark:bg-surface-900/80 border-surface-200/60 dark:border-surface-700/30 shadow-lg shadow-surface-900/5 backdrop-blur-xl'
        }`}
      >
        {/* Brand */}
        <button
          onClick={() => scrollTo('home')}
          className="px-4 py-1.5 text-sm font-bold cursor-pointer bg-transparent border-none"
        >
          <span className="gradient-text">{personal.brandName}</span>
        </button>

        {/* Divider */}
        <div className="w-px h-4 bg-surface-200 dark:bg-surface-700 mx-1" />

        {/* Nav links */}
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer border-none bg-transparent ${
              activeSection === item.id
                ? 'text-white'
                : 'text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
            }`}
          >
            {activeSection === item.id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 bg-primary-600 rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            {item.label}
          </button>
        ))}

        {/* Divider */}
        <div className="w-px h-4 bg-surface-200 dark:bg-surface-700 mx-1" />

        {/* Resume button */}
        <a
          href={personal.resumePath}
          download
          className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors no-underline"
        >
          <FaDownload size={11} /> Resume
        </a>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="ml-1 p-2 rounded-full text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer border-none"
          aria-label="Toggle theme"
        >
          {dark ? <FaSun size={14} /> : <FaMoon size={14} />}
        </button>
      </motion.nav>

      {/* ── Mobile FAB ── */}
      <div className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="flex flex-col gap-2 items-end mb-2"
            >
              {/* Theme toggle */}
              <motion.button
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ delay: 0 }}
                onClick={toggle}
                className="p-3 rounded-full bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-lg text-surface-600 dark:text-surface-300 cursor-pointer"
                aria-label="Toggle theme"
              >
                {dark ? <FaSun size={16} /> : <FaMoon size={16} />}
              </motion.button>

              {/* Resume */}
              <motion.a
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ delay: 0.04 }}
                href={personal.resumePath}
                download
                className="px-5 py-2.5 rounded-full text-sm font-semibold bg-surface-900 dark:bg-white text-white dark:text-surface-900 shadow-lg no-underline flex items-center gap-2"
              >
                <FaDownload size={12} /> Resume
              </motion.a>

              {/* Nav items (reversed so top items appear first visually) */}
              {[...navItems].reverse().map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ delay: 0.06 + i * 0.035 }}
                  onClick={() => scrollTo(item.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium shadow-md cursor-pointer border-none ${
                    activeSection === item.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-200 border border-surface-200 dark:border-surface-700'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-14 h-14 rounded-full bg-primary-600 text-white shadow-xl shadow-primary-600/30 flex items-center justify-center cursor-pointer border-none"
          aria-label="Toggle navigation"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <FaTimes size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <FaBars size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/10 z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
