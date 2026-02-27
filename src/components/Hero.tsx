import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
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
  csharp: <SiSharp className="text-2xl sm:text-3xl" />,
  dotnet: <SiDotnet className="text-2xl sm:text-3xl" />,
  javascript: <SiJavascript className="text-2xl sm:text-3xl" />,
  typescript: <SiTypescript className="text-2xl sm:text-3xl" />,
  react: <SiReact className="text-2xl sm:text-3xl" />,
  angular: <SiAngular className="text-2xl sm:text-3xl" />,
};

interface HeroProps {
  hero: HeroType;
  personal: Personal;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero({ hero, personal }: HeroProps) {
  // Build sequence for TypeAnimation: [text, delay, text, delay, ...]
  const typeSequence = hero.typewriterTexts.flatMap((t) => [t, 2000]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 section-container text-center text-white py-20"
      >
        <motion.div
          variants={itemVariants}
          className="inline-block bg-surface-800/70 backdrop-blur-sm rounded-2xl p-6 sm:p-10 md:p-14 max-w-3xl mx-auto"
        >
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            {hero.greeting}{' '}
            <span className="text-accent-200">{personal.name}</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="font-mono text-xl sm:text-2xl mb-8 h-10 flex items-center justify-center">
            <span className="text-primary-300">&lt;</span>
            <TypeAnimation
              sequence={typeSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-white"
            />
            <span className="text-primary-300">/&gt;</span>
          </motion.div>

          {/* Tech icons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {hero.techIcons.map((icon, i) => (
              <motion.span
                key={icon.iconKey}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.15 }}
                className="p-3 bg-surface-900/60 rounded-xl shadow-lg flex flex-col items-center gap-1 cursor-default"
              >
                {iconMap[icon.iconKey] ?? null}
                <span className="text-xs font-bold">{icon.name}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <a
              href="#contact"
              className="inline-block bg-accent-400 text-surface-900 px-8 py-3 rounded-full font-semibold hover:bg-accent-300 hover:scale-105 transition-all shadow-lg no-underline"
            >
              {hero.ctaText}
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
