import { FaHeart } from 'react-icons/fa';
import type { Footer as FooterType } from '../types/SiteData';

interface FooterProps {
  footer: FooterType;
}

export default function Footer({ footer }: FooterProps) {
  return (
    <footer className="bg-surface-900 dark:bg-surface-950 text-white py-8">
      <div className="section-container text-center">
        <p className="flex items-center justify-center gap-1.5">
          &copy; {footer.year} {footer.text}{' '}
          <FaHeart className="text-red-500 animate-pulse" />
        </p>
      </div>
    </footer>
  );
}
