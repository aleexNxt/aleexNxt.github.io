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
      { threshold: 0.1 }
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
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
            Über <span className="text-neuro-accent">mich</span>
          </h2>

          <div className="neuro-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-neuro-accent">
                  Meine Story
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Als leidenschaftlicher Entwickler habe ich mich auf die Entwicklung
                  moderner, benutzerfreundlicher Webanwendungen spezialisiert. Mit
                  einem Auge für Details und einem starken Fokus auf Code-Qualität
                  bringe ich Projekte zum Erfolg.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Meine Begeisterung für Technologie treibt mich an, ständig neue
                  Fähigkeiten zu erlernen und mich in neue Technologien zu vertiefen.
                  Ich glaube an sauberen, wartbaren Code und agile Entwicklungsprozesse.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-neuro-accent">
                  Was mich auszeichnet
                </h3>
                <ul className="space-y-3">
                  {[
                    'Problemlösungsorientiertes Denken',
                    'Schnelle Auffassungsgabe',
                    'Teamfähigkeit & Kommunikationsstärke',
                    'Kontinuierliche Weiterbildung',
                    'Agile Arbeitsweise',
                    'Best Practices & Clean Code',
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-3"
                    >
                      <div className="neuro-card w-3 h-3 rounded-full bg-neuro-accent flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-300">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="neuro-card p-6">
                  <div className="text-4xl font-bold text-neuro-accent mb-2">5+</div>
                  <div className="text-gray-600">Jahre Erfahrung</div>
                </div>
                <div className="neuro-card p-6">
                  <div className="text-4xl font-bold text-neuro-accent mb-2">50+</div>
                  <div className="text-gray-600">Projekte</div>
                </div>
                <div className="neuro-card p-6">
                  <div className="text-4xl font-bold text-neuro-accent mb-2">20+</div>
                  <div className="text-gray-600">Technologien</div>
                </div>
                <div className="neuro-card p-6">
                  <div className="text-4xl font-bold text-neuro-accent mb-2">100%</div>
                  <div className="text-gray-600">Engagement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
