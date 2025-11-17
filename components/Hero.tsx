'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const roles = [
    'Full-Stack Entwickler',
    'Web Developer',
    'Software Engineer',
    'Frontend Spezialist',
  ];

  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className={`neuro-card p-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Profile Image Placeholder */}
            <div className="flex-shrink-0">
              <div className="neuro-card w-64 h-64 rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-neuro-accent to-indigo-400 flex items-center justify-center text-white text-6xl font-bold">
                  {/* Platzhalter für Foto - später durch <Image> ersetzen */}
                  <svg
                    className="w-32 h-32 text-neuro-bg opacity-50"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800">
                Hallo, ich bin
                <span className="text-neuro-accent block mt-2">
                  [Dein Name]
                </span>
              </h1>
              <div className="h-12 mb-6">
                <p className="text-2xl md:text-3xl text-gray-600 transition-all duration-500">
                  {roles[currentRole]}
                </p>
              </div>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                Leidenschaftlicher Entwickler mit Fokus auf moderne Webtechnologien
                und benutzerfreundliche Lösungen. Ich erstelle performante und
                skalierbare Anwendungen.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href="#projects"
                  className="neuro-button px-8 py-4 font-semibold text-neuro-accent"
                >
                  Projekte ansehen
                </a>
                <a
                  href="#contact"
                  className="neuro-button px-8 py-4 font-semibold text-gray-700"
                >
                  Kontakt aufnehmen
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
