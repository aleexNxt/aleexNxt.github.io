'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'work', 'experience', 'contact'];
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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-md border-b border-border dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          <a
            href="#home"
            className="text-lg font-medium tracking-tight hover:text-accent transition-colors"
            onClick={handleNavClick}
          >
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`text-sm transition-colors relative ${
                      activeSection === item.id
                        ? 'text-primary dark:text-zinc-50 font-medium'
                        : 'text-secondary dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-50'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute -bottom-[21px] left-0 w-full h-[1px] bg-primary dark:bg-zinc-50" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button + Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <span
                className={`w-6 h-0.5 bg-primary dark:bg-zinc-50 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-primary dark:bg-zinc-50 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-primary dark:bg-zinc-50 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
          style={{ top: '64px' }}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 right-0 h-[calc(100vh-64px)] w-64 bg-white dark:bg-zinc-950 border-l border-border dark:border-zinc-800 shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col p-6 space-y-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={handleNavClick}
                className={`block py-3 px-4 text-base transition-colors border-l-2 ${
                  activeSection === item.id
                    ? 'border-primary dark:border-zinc-50 text-primary dark:text-zinc-50 font-medium bg-gray-50 dark:bg-zinc-900'
                    : 'border-transparent text-secondary dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-50 hover:border-border dark:hover:border-zinc-800'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
