'use client';

import { useEffect, useRef, useState } from 'react';
import Dialog from './Dialog';
import ImpressumContent from './ImpressumContent';
import RechtlichesContent from './RechtlichesContent';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [rechtlichesOpen, setRechtlichesOpen] = useState(false);
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
    <>
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
            <h2 className="text-sm uppercase tracking-wider text-secondary dark:text-zinc-400 mb-4">
              Kontakt
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              Lass uns zusammenarbeiten
            </h3>

            <p className="text-lg text-secondary dark:text-zinc-400 mb-12 leading-relaxed">
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
                  className="flex flex-col md:flex-row md:items-center md:justify-between py-4 border-b border-border dark:border-zinc-800 group hover:border-primary dark:hover:border-zinc-50 transition-colors gap-2"
                >
                  <span className="text-sm uppercase tracking-wider text-secondary dark:text-zinc-400">
                    {link.label}
                  </span>
                  <span className="text-primary dark:text-zinc-50 group-hover:text-accent dark:group-hover:text-zinc-300 transition-colors font-mono text-sm break-all md:break-normal">
                    {link.value} →
                  </span>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-12 border-t border-border dark:border-zinc-800">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-secondary dark:text-zinc-400">
                  © {new Date().getFullYear()} Alexander Kruska. Entwickelt mit Next.js
                </p>
                <div className="flex gap-6">
                  <button
                    onClick={() => setImpressumOpen(true)}
                    className="text-sm text-secondary dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-50 transition-colors cursor-pointer"
                  >
                    Impressum
                  </button>
                  <button
                    onClick={() => setRechtlichesOpen(true)}
                    className="text-sm text-secondary dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-50 transition-colors cursor-pointer"
                  >
                    Rechtliches
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dialogs */}
      <Dialog
        isOpen={impressumOpen}
        onClose={() => setImpressumOpen(false)}
        title="Impressum"
      >
        <ImpressumContent />
      </Dialog>

      <Dialog
        isOpen={rechtlichesOpen}
        onClose={() => setRechtlichesOpen(false)}
        title="Datenschutz & Rechtliches"
      >
        <RechtlichesContent />
      </Dialog>
    </>
  );
}
