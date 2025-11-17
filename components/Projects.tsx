'use client';

import { useEffect, useRef, useState } from 'react';

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
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

  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'fullstack',
      description:
        'Vollständige E-Commerce-Lösung mit Zahlungsintegration, Bestandsverwaltung und Admin-Dashboard. Implementiert mit modernen Webtechnologien für optimale Performance.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind'],
      image: '🛒',
      link: '#',
      github: '#',
    },
    {
      title: 'Task Management App',
      category: 'frontend',
      description:
        'Kollaborative Task-Management-Anwendung mit Echtzeit-Updates, Drag & Drop und Team-Funktionen. Fokus auf intuitive Benutzerführung.',
      technologies: ['React', 'Firebase', 'Material-UI', 'WebSockets'],
      image: '📋',
      link: '#',
      github: '#',
    },
    {
      title: 'REST API Service',
      category: 'backend',
      description:
        'Skalierbare REST API mit Authentifizierung, Rate Limiting und umfangreicher Dokumentation. Containerisiert für einfaches Deployment.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Docker', 'JWT'],
      image: '⚡',
      link: '#',
      github: '#',
    },
    {
      title: 'Portfolio CMS',
      category: 'fullstack',
      description:
        'Headless CMS für Portfolio-Websites mit intuitiver Content-Verwaltung und SEO-Optimierung. Multi-Sprachen-Support integriert.',
      technologies: ['Next.js', 'Strapi', 'GraphQL', 'AWS'],
      image: '📝',
      link: '#',
      github: '#',
    },
    {
      title: 'Real-time Chat Application',
      category: 'fullstack',
      description:
        'Echtzeit-Chat-Anwendung mit Gruppenchats, Dateifreigabe und End-to-End-Verschlüsselung für sichere Kommunikation.',
      technologies: ['React', 'Socket.io', 'Node.js', 'Redis', 'MongoDB'],
      image: '💬',
      link: '#',
      github: '#',
    },
    {
      title: 'Analytics Dashboard',
      category: 'frontend',
      description:
        'Interaktives Analytics-Dashboard mit Datenvisualisierung, Echtzeit-Metriken und benutzerdefinierten Reports.',
      technologies: ['Vue.js', 'D3.js', 'TypeScript', 'Chart.js'],
      image: '📊',
      link: '#',
      github: '#',
    },
  ];

  const filters = [
    { id: 'all', label: 'Alle Projekte' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
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
            Meine <span className="text-neuro-accent">Projekte</span>
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`neuro-button px-6 py-3 font-semibold transition-all ${
                  activeFilter === filter.id
                    ? 'text-neuro-accent shadow-neuro-inset'
                    : 'text-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="neuro-card p-6 hover:shadow-neuro-lg transition-all duration-300 group"
              >
                {/* Project Icon */}
                <div className="neuro-card w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {project.image}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="neuro-card px-3 py-1 text-xs text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    className="neuro-button px-4 py-2 text-sm font-semibold text-neuro-accent flex-1 text-center"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    className="neuro-button px-4 py-2 text-sm font-semibold text-gray-700 flex-1 text-center"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Möchten Sie mehr Projekte sehen oder haben ein eigenes Projekt?
            </p>
            <a
              href="#contact"
              className="neuro-button px-8 py-4 font-semibold text-neuro-accent inline-block"
            >
              Kontaktieren Sie mich
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
