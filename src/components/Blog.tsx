import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';
import { useSpotlight } from '../hooks/useSpotlight';
import type { BlogPost } from '../types/SiteData';

interface BlogProps {
  blog: BlogPost[];
}

const platformColors: Record<string, string> = {
  'Dev.to': 'bg-surface-900 text-white dark:bg-white dark:text-surface-900',
  'Medium': 'bg-emerald-600 text-white',
  'Hashnode': 'bg-blue-600 text-white',
  'default': 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.08 }
  }),
};

export default function Blog({ blog }: BlogProps) {
  if (!blog || blog.length === 0) return null;

  const { onMouseMove } = useSpotlight();

  return (
    <section id="blog" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-label">Writings & thoughts</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
            Latest <span className="gradient-text">Articles</span>
          </h2>
        </motion.div>

        <div
          onMouseMove={onMouseMove}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {blog.map((post, i) => (
            <motion.a
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card spotlight-card p-6 flex flex-col gap-4 no-underline group"
            >
              {/* Platform badge + date */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    platformColors[post.platform] ?? platformColors['default']
                  }`}
                >
                  {post.platform}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-surface-400 dark:text-surface-500">
                  <FaCalendarAlt size={10} />
                  {formatDate(post.date)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-surface-900 dark:text-white leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors relative z-10">
                {post.title}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto relative z-10">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400 rounded-full border border-surface-200 dark:border-surface-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read arrow */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 relative z-10">
                Read article <FaExternalLinkAlt size={10} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
