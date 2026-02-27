import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowDown, FaDownload } from 'react-icons/fa';
import {
  SiSharp,
  SiDotnet,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiAngular,
} from 'react-icons/si';
import type { Hero as HeroType, Personal } from '../types/SiteData';

const iconMap: Record<string, React.ReactNode> = {
  csharp: <SiSharp />,
  dotnet: <SiDotnet />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  react: <SiReact />,
  angular: <SiAngular />,
};

interface HeroProps {
  hero: HeroType;
  personal: Personal;
  startDate?: string;
}

function computeYears(startDate?: string): number {
  if (!startDate) return 0;
  const start = new Date(startDate);
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
});

export default function Hero({ hero, personal, startDate }: HeroProps) {
  const typeSequence = hero.typewriterTexts.flatMap((t) => [t, 2200]);
  const dynamicValues: Record<string, number> = {
    yearsExp: computeYears(startDate),
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface-50 to-accent-200/20 dark:from-surface-950 dark:via-surface-950 dark:to-primary-950/40" />

      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-10 w-[480px] h-[480px] bg-primary-400/10 dark:bg-primary-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[360px] h-[360px] bg-accent-400/8 dark:bg-accent-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 section-container w-full pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* ── Left: Text content ── */}
          <div>
            <motion.span {...fadeUp(0)} className="section-label">
              {hero.greeting}
            </motion.span>

            <motion.h1
              {...fadeUp(0.12)}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-5 text-surface-900 dark:text-white leading-[1.05]"
            >
              {personal.name.split(' ')[0]}{' '}
              <span className="gradient-text">
                {personal.name.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>

            <motion.div
              {...fadeUp(0.24)}
              className="flex items-center gap-2 font-mono text-base sm:text-lg text-surface-500 dark:text-surface-400 mb-10 h-7"
            >
              <span className="text-primary-400 text-xl">›</span>
              <TypeAnimation
                sequence={typeSequence}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
              <span className="animate-pulse text-primary-400">_</span>
            </motion.div>

            {/* Stats strip */}
            {hero.stats && hero.stats.length > 0 && (
              <motion.div
                {...fadeUp(0.36)}
                className="flex flex-wrap gap-8 mb-10"
              >
                {hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold tabular-nums text-surface-900 dark:text-white">
                      {stat.dynamicKey ? (dynamicValues[stat.dynamicKey] ?? stat.value) : stat.value}
                      <span className="gradient-text">{stat.suffix ?? ''}</span>
                    </div>
                    <div className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.46)}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-7 py-3 rounded-full font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25 no-underline text-sm"
              >
                {hero.ctaText} <FaArrowDown size={13} />
              </a>
              <a
                href={personal.resumePath}
                download
                className="inline-flex items-center gap-2 border border-surface-300 dark:border-surface-700 text-surface-600 dark:text-surface-300 px-7 py-3 rounded-full font-semibold hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all no-underline text-sm"
              >
                <FaDownload size={13} /> Download CV
              </a>
            </motion.div>
          </div>

          {/* ── Right: Tech icon grid ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="relative hidden lg:flex flex-col items-center justify-center"
          >
            <div className="relative grid grid-cols-3 gap-4 w-full max-w-xs">
              {/* Subtle ring decoration — centered on the grid */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 dark:opacity-10 w-80 h-80 rounded-full border-2 border-primary-400 pointer-events-none z-0" />

              {hero.techIcons.map((icon, i) => (
                <motion.div
                  key={icon.iconKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.08, duration: 0.45 }}
                  whileHover={{ y: -5, scale: 1.06 }}
                  className="relative z-10 bg-white dark:bg-surface-800/70 border border-surface-200 dark:border-surface-700/60 rounded-2xl p-5 flex flex-col items-center gap-2.5 shadow-sm cursor-default"
                >
                  <span className="text-3xl text-surface-700 dark:text-surface-200">
                    {iconMap[icon.iconKey] ?? null}
                  </span>
                  <span className="text-xs font-medium text-surface-500 dark:text-surface-400">
                    {icon.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
