import { useEffect } from 'react';

/**
 * SQLI-style scroll reveal hook.
 * Adds `.animation-scroll--scrolled` to every `.animation-scroll` element
 * as it enters the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.animation-scroll');
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
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
