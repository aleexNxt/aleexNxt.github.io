'use client';

import { useEffect, useRef, useState } from 'react';

export default function About() {
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

  return (
    <section
      id="about"
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
            Über mich
          </h2>
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold leading-tight">
              21-jähriger Software-Entwickler im 3. Ausbildungsjahr
            </h3>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-secondary dark:text-zinc-400 leading-relaxed">
                Derzeit absolviere ich meine Ausbildung zum Fachinformatiker für
                Anwendungsentwicklung bei <span className="text-primary dark:text-zinc-50 font-medium">Lufthansa Industry Solutions</span> in Frankfurt.
                Im dritten Lehrjahr konzentriere ich mich auf die Entwicklung skalierbarer
                Backend-Systeme und moderner Web-Anwendungen.
              </p>

              <p className="text-lg text-secondary dark:text-zinc-400 leading-relaxed">
                Meine Leidenschaft gilt der Backend-Entwicklung mit <span className="text-primary dark:text-zinc-50 font-medium">Go (Golang)</span>,
                wo ich die Performance und Einfachheit der Sprache schätze. Auf der Frontend-Seite
                setze ich auf <span className="text-primary dark:text-zinc-50 font-medium">Next.js</span>, um moderne, performante
                Web-Anwendungen zu entwickeln.
              </p>

              <p className="text-lg text-secondary dark:text-zinc-400 leading-relaxed">
                Bei Lufthansa Industry Solutions arbeite ich in agilen Teams an
                produktionsrelevanten Projekten und lerne täglich neue Technologien und
                Best Practices in der professionellen Software-Entwicklung.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border dark:border-zinc-800">
              <div>
                <div className="text-3xl font-bold mb-1">3.</div>
                <div className="text-sm text-secondary dark:text-zinc-400">Lehrjahr</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">21</div>
                <div className="text-sm text-secondary dark:text-zinc-400">Jahre alt</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">2</div>
                <div className="text-sm text-secondary dark:text-zinc-400">Haupttechnologien</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">∞</div>
                <div className="text-sm text-secondary dark:text-zinc-400">Lernbereitschaft</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
