'use client';

import { useEffect, useRef, useState } from 'react';

export default function Career() {
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

  const timeline = [
    {
      year: '2024 - Heute',
      title: 'Senior Full-Stack Developer',
      company: '[Firmenname]',
      description:
        'Leitung von Entwicklungsteams, Architektur moderner Web-Anwendungen mit React, Next.js und Node.js. Implementierung von CI/CD-Pipelines und Optimierung der Code-Qualität.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    },
    {
      year: '2022 - 2024',
      title: 'Full-Stack Developer',
      company: '[Firmenname]',
      description:
        'Entwicklung und Wartung von Web-Anwendungen. Zusammenarbeit mit UX/UI-Designern zur Umsetzung moderner Benutzeroberflächen.',
      technologies: ['React', 'Vue.js', 'Express', 'MongoDB', 'Docker'],
    },
    {
      year: '2020 - 2022',
      title: 'Frontend Developer',
      company: '[Firmenname]',
      description:
        'Entwicklung responsiver Webanwendungen mit modernen JavaScript-Frameworks. Fokus auf Performance-Optimierung und Barrierefreiheit.',
      technologies: ['JavaScript', 'React', 'SASS', 'Webpack', 'Git'],
    },
    {
      year: '2018 - 2020',
      title: 'Junior Web Developer',
      company: '[Firmenname]',
      description:
        'Einstieg in die professionelle Webentwicklung. Unterstützung bei der Entwicklung von Webanwendungen und Erlernung von Best Practices.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP'],
    },
  ];

  return (
    <section
      id="career"
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
            Meine <span className="text-neuro-accent">Karriere</span>
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-neuro-accent to-transparent"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="md:w-1/2">
                    {index % 2 === 0 && (
                      <div className="neuro-card p-6 md:p-8">
                        <div className="inline-block neuro-card px-4 py-2 mb-4 text-neuro-accent font-semibold">
                          {item.year}
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-lg text-neuro-accent mb-4">
                          {item.company}
                        </p>
                        <p className="text-gray-700 mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="neuro-card px-3 py-1 text-sm text-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="hidden md:flex md:w-0 items-center justify-center">
                    <div className="neuro-card w-6 h-6 rounded-full bg-neuro-accent"></div>
                  </div>

                  <div className="md:w-1/2">
                    {index % 2 !== 0 && (
                      <div className="neuro-card p-6 md:p-8">
                        <div className="inline-block neuro-card px-4 py-2 mb-4 text-neuro-accent font-semibold">
                          {item.year}
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-lg text-neuro-accent mb-4">
                          {item.company}
                        </p>
                        <p className="text-gray-700 mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="neuro-card px-3 py-1 text-sm text-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="neuro-card p-8 inline-block">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Ausbildung & Zertifikate
              </h3>
              <p className="text-gray-700">
                B.Sc. Informatik | Verschiedene Zertifizierungen in modernen
                Web-Technologien
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
