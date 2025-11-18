'use client';

import { useEffect, useRef, useState } from 'react';

export default function Experience() {
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

  const experiences = [
    {
      period: '2023 - Heute',
      position: 'Auszubildender Fachinformatiker',
      company: 'Lufthansa Industry Solutions',
      location: 'Frankfurt am Main',
      description: 'Ausbildung zum Fachinformatiker für Anwendungsentwicklung mit Fokus auf Backend-Entwicklung und moderne Web-Technologien.',
      highlights: [
        'Entwicklung von Microservices mit Go und Spring Boot',
        'Implementierung von REST APIs',
        'Frontend-Entwicklung mit Next.js und React',
        'Mobile App-Entwicklung mit Flutter und Clean Architecture',
        'Arbeit in agilen Teams nach Scrum-Methodik',
        'Einsatz von Domain-Driven Design in komplexen Projekten'
      ]
    },
    {
      period: '2021 - 2023',
      position: 'Fachhochschulreife',
      company: 'Schwerpunkt Informationstechnologie',
      location: 'BBS Rostrup',
      description: 'Fachoberschule mit Schwerpunkt Informationstechnologie, Grundlagen der Programmierung und Hardware-nahen Entwicklung.',
      highlights: [
        'Programmierung mit C# und .NET Framework',
        'Hardware-Programmierung mit Arduino',
        'Grundlagen der objektorientierten Programmierung'
      ]
    }
  ];

  return (
    <section
      id="experience"
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
            Erfahrung
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-12">
            Beruflicher Werdegang
          </h3>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-border dark:border-zinc-800">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary dark:bg-zinc-50 border-4 border-white dark:border-gray-900" />

                <div className="space-y-4">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <h4 className="text-xl font-bold">{exp.position}</h4>
                      <span className="text-sm text-secondary dark:text-zinc-400 font-mono">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary dark:text-zinc-50">
                      <span className="font-medium">{exp.company}</span>
                      <span className="text-secondary dark:text-zinc-400">•</span>
                      <span className="text-sm text-secondary dark:text-zinc-400">{exp.location}</span>
                    </div>
                  </div>

                  <p className="text-secondary dark:text-zinc-400 leading-relaxed">{exp.description}</p>

                  <div className="space-y-2 pt-2">
                    <h5 className="text-sm font-medium uppercase tracking-wider text-secondary dark:text-zinc-400">
                      Highlights
                    </h5>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-primary dark:text-zinc-50 mt-1">→</span>
                          <span className="text-secondary dark:text-zinc-400">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 border border-border dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/20">
            <h4 className="font-bold mb-4">Ausbildungsschwerpunkte</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary dark:text-zinc-400 mb-3">
                  Backend Development
                </h5>
                <p className="text-sm text-secondary dark:text-zinc-400 leading-relaxed">
                  Tiefgehende Kenntnisse in der Entwicklung skalierbarer Backend-Systeme mit Go und Spring Boot.
                  Erfahrung mit Microservices-Architekturen und REST APIs.
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary dark:text-zinc-400 mb-3">
                  Full-Stack & Mobile
                </h5>
                <p className="text-sm text-secondary dark:text-zinc-400 leading-relaxed">
                  Moderne Frontend-Entwicklung mit Next.js und React sowie Mobile-Entwicklung mit Flutter.
                  Anwendung von Clean Architecture und Domain-Driven Design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
