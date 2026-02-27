import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaDownload, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import type { Personal } from '../types/SiteData';

interface NavbarProps {
  personal: Personal;
}

const navSections = [
  { id: 'home', label: "I'm Irfan." },
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience,' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'contact', label: 'contact me.' },
];

const connectors = [
  'To discuss',
  '',
  'my',
  '',
  'and',
  'please feel free to',
];

export default function Navbar({ personal }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(el.id);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg'
          : 'bg-white/90 dark:bg-surface-900/90 backdrop-blur-md'
      }`}
    >
      <div className="section-container py-4 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="text-2xl font-bold cursor-pointer bg-transparent border-none"
        >
          Dev.<span className="text-primary-500">{personal.shortName}</span>
        </button>

        {/* Desktop nav — sentence style */}
        <div className="hidden lg:flex items-center gap-1 text-sm flex-wrap">
          {navSections.map((sec, i) => (
            <span key={sec.id} className="flex items-center gap-1">
              {connectors[i] && (
                <span className="text-surface-700 dark:text-surface-200">{connectors[i]}</span>
              )}
              <button
                onClick={() => scrollTo(sec.id)}
                className={`relative px-2 py-1 rounded-md font-semibold underline cursor-pointer transition-colors border-none bg-transparent ${
                  activeSection === sec.id
                    ? 'text-white bg-primary-500! rounded-md'
                    : 'text-surface-700 dark:text-surface-200 hover:text-primary-500'
                }`}
              >
                {sec.label}
                {activeSection === sec.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary-500 rounded-md -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            </span>
          ))}

          {/* Resume button */}
          <a
            href={personal.resumePath}
            download
            className="ml-3 inline-flex items-center gap-2 bg-primary-900 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-600 transition-colors text-sm no-underline"
          >
            <FaDownload /> Resume
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="ml-2 p-2 rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-accent-300 hover:scale-110 transition-transform cursor-pointer border-none"
            aria-label="Toggle theme"
          >
            {dark ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={toggle}
            className="p-2 rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-accent-300 cursor-pointer border-none"
            aria-label="Toggle theme"
          >
            {dark ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-2xl cursor-pointer bg-transparent border-none text-surface-900 dark:text-surface-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-surface-900 shadow-2xl z-50 p-6 flex flex-col gap-4"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="self-end text-2xl mb-4 cursor-pointer bg-transparent border-none text-surface-900 dark:text-surface-100"
              aria-label="Close menu"
            >
              <FaTimes />
            </button>

            {navSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`text-left text-lg font-medium px-4 py-3 rounded-lg transition-colors cursor-pointer border-none ${
                  activeSection === sec.id
                    ? 'bg-primary-500 text-white'
                    : 'text-surface-700 dark:text-surface-200 hover:bg-primary-100 dark:hover:bg-surface-800'
                }`}
              >
                {sec.label.charAt(0).toUpperCase() + sec.label.slice(1).replace(/[.,]/g, '')}
              </button>
            ))}

            <a
              href={personal.resumePath}
              download
              className="mt-4 inline-flex items-center justify-center gap-2 bg-primary-900 text-white px-4 py-3 rounded-lg shadow hover:bg-primary-600 transition-colors no-underline"
            >
              <FaDownload /> Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
