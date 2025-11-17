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
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Hallo, ich bin
            <br />
            <span className="text-secondary">Alexander</span>
          </h1>

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
