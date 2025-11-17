'use client';

import { useEffect, useRef, useState } from 'react';

export default function Skills() {
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

  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React / Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Vue.js', level: 85 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'HTML/CSS', level: 98 },
      ],
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Express', level: 88 },
        { name: 'Python', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'REST APIs', level: 92 },
      ],
    },
    {
      title: 'Database',
      icon: '🗄️',
      skills: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 88 },
        { name: 'MySQL', level: 80 },
        { name: 'Redis', level: 75 },
        { name: 'GraphQL', level: 82 },
      ],
    },
    {
      title: 'DevOps & Tools',
      icon: '🛠️',
      skills: [
        { name: 'Git / GitHub', level: 95 },
        { name: 'Docker', level: 85 },
        { name: 'CI/CD', level: 82 },
        { name: 'AWS', level: 78 },
        { name: 'Linux', level: 88 },
      ],
    },
  ];

  const languages = [
    { name: 'JavaScript', color: 'bg-yellow-400' },
    { name: 'TypeScript', color: 'bg-blue-500' },
    { name: 'Python', color: 'bg-green-500' },
    { name: 'Java', color: 'bg-red-500' },
    { name: 'Go', color: 'bg-cyan-500' },
    { name: 'SQL', color: 'bg-purple-500' },
    { name: 'HTML/CSS', color: 'bg-orange-500' },
    { name: 'PHP', color: 'bg-indigo-500' },
  ];

  return (
    <section
      id="skills"
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
            Meine <span className="text-neuro-accent">Skills</span>
          </h2>

          {/* Programming Languages */}
          <div className="neuro-card p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Programmiersprachen
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="neuro-button px-6 py-3 flex items-center gap-3 hover:scale-105 transition-transform"
                >
                  <div className={`w-3 h-3 rounded-full ${lang.color}`}></div>
                  <span className="font-semibold text-gray-800">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Categories */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, catIndex) => (
              <div key={catIndex} className="neuro-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{category.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-gray-700">
                          {skill.name}
                        </span>
                        <span className="text-neuro-accent font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="neuro-input h-3 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-neuro-accent to-indigo-400 transition-all duration-1000 rounded-full"
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${skillIndex * 100}ms`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills */}
          <div className="neuro-card p-8 mt-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Weitere Kompetenzen
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Agile/Scrum',
                'Test-Driven Development',
                'Clean Code',
                'Responsive Design',
                'Accessibility',
                'Performance Optimization',
                'Security Best Practices',
                'Microservices',
                'RESTful APIs',
                'GraphQL',
                'WebSockets',
                'PWA',
              ].map((skill, index) => (
                <span
                  key={index}
                  className="neuro-card px-4 py-2 text-gray-700 hover:text-neuro-accent transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
