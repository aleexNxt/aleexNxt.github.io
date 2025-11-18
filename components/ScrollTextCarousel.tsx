'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollTextCarousel() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [targetOffset, setTargetOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  const words = [
    'TypeScript',
    'Golang',
    'CI/CD',
    'Apprentice',
    'Enthusiastic',
    'Next.js',
    'Spring Boot',
    'Clean Code',
    'Flutter',
    'REST APIs',
    'Docker',
    'PostgreSQL',
    'Agile',
    'DDD'
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      setTargetOffset(prev => prev + scrollDelta * 0.35);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth animation with lerp (linear interpolation)
  useEffect(() => {
    const animate = () => {
      setScrollOffset(prev => {
        // Lerp für weiche Bewegung: current + (target - current) * smoothFactor
        const diff = targetOffset - prev;
        const smoothFactor = 0.1; // Je kleiner, desto smoother aber auch träger

        if (Math.abs(diff) < 0.01) return targetOffset;
        return prev + diff * smoothFactor;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetOffset]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden border-y border-border dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-4"
    >
      <div
        className="flex gap-8 whitespace-nowrap will-change-transform"
        style={{
          transform: `translateX(-${scrollOffset % (words.length * 150)}px)`
        }}
      >
        {/* Render words three times for seamless loop */}
        {[...words, ...words, ...words].map((word, index) => (
          <span
            key={index}
            className="text-sm font-medium text-secondary/40 dark:text-zinc-500/50 uppercase tracking-wider select-none"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
