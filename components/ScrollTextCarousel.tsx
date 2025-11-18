'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollTextCarousel() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

      setScrollOffset(prev => prev + scrollDelta * 0.5);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden border-y border-border bg-gray-50/50 py-4"
    >
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          transform: `translateX(-${scrollOffset % (words.length * 150)}px)`
        }}
      >
        {/* Render words twice for seamless loop */}
        {[...words, ...words, ...words].map((word, index) => (
          <span
            key={index}
            className="text-sm font-medium text-secondary/40 uppercase tracking-wider select-none"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
