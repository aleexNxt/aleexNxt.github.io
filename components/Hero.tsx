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
            {/* Profile Image Placeholder */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-border bg-gray-50 flex items-center justify-center overflow-hidden">
                {/* Platzhalter für Profilbild - ersetzen Sie dies später mit:
                    <Image src="/profile.jpg" alt="Alexander" fill className="object-cover" />
                */}
                <svg
                  className="w-16 h-16 md:w-20 md:h-20 text-gray-300"
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

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Hallo, ich bin
                <br />
                <span className="text-secondary">Alexander</span>
              </h1>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-secondary max-w-2xl mb-8 leading-relaxed">
            Software-Entwickler in Ausbildung bei{' '}
            <span className="text-primary font-medium">Lufthansa Industry Solutions</span>.
            Spezialisiert auf Backend-Entwicklung mit Go und moderne Web-Anwendungen mit Next.js.
          </p>

          <div className="flex gap-6 items-center">
            <a
              href="#work"
              className="inline-block px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm font-medium"
            >
              Meine Projekte
            </a>
            <a
              href="#contact"
              className="text-sm text-secondary hover:text-primary transition-colors underline underline-offset-4"
            >
              Kontakt aufnehmen →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
