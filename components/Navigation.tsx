'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['home', 'about', 'skills', 'projects', 'career', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Start' },
    { id: 'about', label: 'Über mich' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projekte' },
    { id: 'career', label: 'Karriere' },
    { id: 'contact', label: 'Kontakt' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`neuro-card px-6 py-4 ${isScrolled ? 'shadow-neuro-sm' : ''}`}>
          <div className="flex justify-between items-center">
            <a href="#home" className="text-2xl font-bold text-neuro-accent">
              Portfolio
            </a>

            <ul className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === item.id
                        ? 'text-neuro-accent font-semibold shadow-neuro-inset'
                        : 'hover:text-neuro-accent'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile menu button */}
            <button className="md:hidden neuro-button px-4 py-2">
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
