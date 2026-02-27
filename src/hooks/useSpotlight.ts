import { useCallback } from 'react';

/**
 * Attaches a mouse-move handler to a container element so the
 * `.spotlight-card::before` pseudo-element can follow the cursor.
 *
 * Usage:
 *   const { onMouseMove } = useSpotlight();
 *   <div className="spotlight-card" onMouseMove={onMouseMove}>…</div>
 *
 * Or use the ref-based version for groups:
 *   const { onMouseMove } = useSpotlight();
 *   <div onMouseMove={onMouseMove}>
 *     <div className="spotlight-card">…</div>
 *     <div className="spotlight-card">…</div>
 *   </div>
 */
export function useSpotlight() {
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const cards = e.currentTarget.querySelectorAll<HTMLElement>('.spotlight-card');
    if (cards.length === 0) {
      // The element itself is the spotlight card
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    } else {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    }
  }, []);

  return { onMouseMove };
}
