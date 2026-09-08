import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in ms
  direction?: 'up' | 'down' | 'none';
  duration?: number; // in ms
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 700,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransformClass = () => {
    if (direction === 'none') {
      return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-98';
    }
    if (direction === 'down') {
      return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6';
    }
    // default up
    return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6';
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out transform-gpu will-change-transform ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
};
