'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 md:px-12"
    >
      <div className="max-w-4xl w-full">
        <div
          className={`transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-border dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800">
                <img
                  src="/images/Profilbild.jpeg"
                  alt="Alexander Kruska"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Hallo, ich bin
                <br />
                <span className="text-secondary dark:text-gray-400">Alexander</span>
              </h1>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-secondary dark:text-gray-400 max-w-2xl mb-8 leading-relaxed">
            Software-Entwickler in Ausbildung bei{' '}
            <span className="text-primary dark:text-white font-medium">Lufthansa Industry Solutions</span>.
            Spezialisiert auf Backend-Entwicklung mit Go und moderne Web-Anwendungen mit Next.js.
          </p>

          <div className="flex gap-6 items-center">
            <a
              href="#work"
              className="inline-block px-6 py-3 border border-primary dark:border-white text-primary dark:text-white hover:bg-primary dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-300 text-sm font-medium"
            >
              Meine Projekte
            </a>
            <a
              href="#contact"
              className="text-sm text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors underline underline-offset-4"
            >
              Kontakt aufnehmen →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
