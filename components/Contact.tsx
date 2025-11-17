'use client';

import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactLinks = [
    {
      label: 'Email',
      value: 'alexander.kruska@protonmail.com',
      href: 'mailto:alexander.kruska@protonmail.com'
    },
    {
      label: 'GitHub',
      value: 'github.com/aleexNxt',
      href: 'https://github.com/aleexNxt'
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/alexanderkruska',
      href: 'https://www.linkedin.com/in/alexanderkruska/'
    }
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-24"
    >
      <div className="max-w-4xl w-full">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-sm uppercase tracking-wider text-secondary mb-4">
            Kontakt
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Lass uns zusammenarbeiten
          </h3>

          <p className="text-lg text-secondary mb-12 leading-relaxed">
            Ich bin offen für neue Herausforderungen und freue mich über interessante Projekte.
            Ob Praktikum, Werkstudententätigkeit oder einfach nur ein Austausch über Technologien –
            kontaktieren Sie mich gerne.
          </p>

          <div className="space-y-4 mb-16">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-4 border-b border-border group hover:border-primary transition-colors"
              >
                <span className="text-sm uppercase tracking-wider text-secondary">
                  {link.label}
                </span>
                <span className="text-primary group-hover:text-accent transition-colors font-mono text-sm">
                  {link.value} →
                </span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center pt-12 border-t border-border">
            <p className="text-sm text-secondary">
              © {new Date().getFullYear()} Alexander. Entwickelt mit Next.js
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
