import { useEffect } from 'react';

/**
 * SQLI-style scroll reveal hook.
 * - Triggers immediately for elements already in the viewport on mount
 * - Uses IntersectionObserver for elements below the fold
 */
export function useScrollReveal() {
  useEffect(() => {
    // Small delay to let the face render completely
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>('.animation-scroll:not(.animation-scroll--scrolled)');
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animation-scroll--scrolled');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 80);

    return () => clearTimeout(timer);
  });
  // Note: no dependency array — runs on every render so new elements after
  // face navigation are always picked up
}
