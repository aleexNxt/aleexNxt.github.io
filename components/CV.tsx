'use client';

import { useEffect, useRef, useState } from 'react';
import { verifyPassword, logCurrentPassword } from '@/lib/auth';

export default function CV() {
  const [isVisible, setIsVisible] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

    // Log Passwort für Entwicklung
    logCurrentPassword();

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPassword(password)) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Falsches Passwort. Das Passwort wechselt alle 4 Tage.');
      setPassword('');
    }
  };

  return (
    <section
      id="cv"
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
            Lebenslauf
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Curriculum Vitae
          </h3>

          {!isUnlocked ? (
            <div className="max-w-md">
              <p className="text-lg text-secondary mb-8 leading-relaxed">
                Dieser Bereich ist geschützt. Bitte geben Sie das Zugangspasswort ein.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-2 text-secondary"
                  >
                    Passwort
                  </label>
                  <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-border focus:border-primary outline-none transition-colors font-mono tracking-wider uppercase"
                    placeholder="XXXXXX"
                    maxLength={6}
                    required
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm font-medium"
                >
                  Zugriff anfordern
                </button>
              </form>

              <p className="text-xs text-secondary mt-6">
                Hinweis: Das Passwort wechselt automatisch alle 4 Tage zur Sicherheit.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* CV Content */}
              <div className="border-b border-border pb-8">
                <h4 className="text-xl font-bold mb-4">Ausbildung</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium">Fachinformatiker für Anwendungsentwicklung</h5>
                        <p className="text-secondary text-sm">Lufthansa Industry Solutions</p>
                      </div>
                      <span className="text-sm text-secondary">2022 - 2025</span>
                    </div>
                    <p className="text-secondary text-sm">
                      Ausbildung zum Fachinformatiker mit Schwerpunkt auf Backend-Entwicklung
                      und moderne Web-Technologien. Praktische Erfahrung in agilen Teams.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-border pb-8">
                <h4 className="text-xl font-bold mb-4">Berufserfahrung</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium">Auszubildender Software-Entwickler</h5>
                        <p className="text-secondary text-sm">Lufthansa Industry Solutions, Frankfurt</p>
                      </div>
                      <span className="text-sm text-secondary">2022 - Heute</span>
                    </div>
                    <ul className="text-secondary text-sm space-y-1 list-disc list-inside">
                      <li>Entwicklung von Backend-Services mit Go (Golang)</li>
                      <li>Frontend-Entwicklung mit Next.js und React</li>
                      <li>Arbeit in agilen Scrum-Teams</li>
                      <li>API-Design und Microservices-Architektur</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-b border-border pb-8">
                <h4 className="text-xl font-bold mb-4">Technische Fähigkeiten</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-medium mb-2 text-sm">Backend</h5>
                    <p className="text-secondary text-sm">Go, REST APIs, gRPC, PostgreSQL</p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-sm">Frontend</h5>
                    <p className="text-secondary text-sm">Next.js, React, TypeScript, Tailwind</p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-sm">Tools</h5>
                    <p className="text-secondary text-sm">Git, Docker, Linux, CI/CD</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4">Sprachen</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Deutsch</span>
                    <span className="text-secondary text-sm">Muttersprache</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Englisch</span>
                    <span className="text-secondary text-sm">Fließend</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsUnlocked(false)}
                className="text-sm text-secondary hover:text-primary transition-colors underline underline-offset-4"
              >
                Lebenslauf sperren
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
