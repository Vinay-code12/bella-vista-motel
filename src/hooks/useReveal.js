import { useEffect } from 'react';

/**
 * Adds `is-visible` to every [data-reveal] element as it scrolls into view.
 * Elements are only hidden while <html> has the `motion-ok` class (set in
 * main.jsx when IntersectionObserver exists and reduced motion is not
 * requested), so content stays visible if this never runs.
 */
export default function useReveal(key) {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('motion-ok')) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => observer.observe(el));
    // Safety net: never leave content hidden (e.g. print, unusual scroll containers).
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible');
      });
    }, 1500);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [key]);
}
