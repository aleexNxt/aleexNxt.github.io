'use client';

import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier könnte die Formular-Logik implementiert werden
    console.log('Form submitted:', formData);
    alert('Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'kontakt@example.com',
      link: 'mailto:kontakt@example.com',
    },
    {
      icon: '📱',
      title: 'Telefon',
      value: '+49 123 456789',
      link: 'tel:+49123456789',
    },
    {
      icon: '📍',
      title: 'Standort',
      value: 'Deutschland',
      link: '#',
    },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: '💻', link: 'https://github.com' },
    { name: 'LinkedIn', icon: '💼', link: 'https://linkedin.com' },
    { name: 'Twitter', icon: '🐦', link: 'https://twitter.com' },
    { name: 'Xing', icon: '🔗', link: 'https://xing.com' },
  ];

  return (
    <section
      id="contact"
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
            Kontaktieren Sie <span className="text-neuro-accent">mich</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <div>
              <div className="neuro-card p-8 mb-6">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Kontaktinformationen
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-center gap-4 group hover:text-neuro-accent transition-colors"
                    >
                      <div className="neuro-card w-14 h-14 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{info.title}</p>
                        <p className="font-semibold text-gray-800 group-hover:text-neuro-accent">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="neuro-card p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Social Media
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neuro-button p-4 flex items-center gap-3 hover:scale-105 transition-transform"
                    >
                      <span className="text-2xl">{social.icon}</span>
                      <span className="font-semibold text-gray-800">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="neuro-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Nachricht senden
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2 text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="neuro-input w-full px-4 py-3 text-gray-800 focus:ring-2 focus:ring-neuro-accent"
                    placeholder="Ihr Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2 text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="neuro-input w-full px-4 py-3 text-gray-800 focus:ring-2 focus:ring-neuro-accent"
                    placeholder="ihre@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold mb-2 text-gray-700"
                  >
                    Betreff
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="neuro-input w-full px-4 py-3 text-gray-800 focus:ring-2 focus:ring-neuro-accent"
                    placeholder="Worum geht es?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2 text-gray-700"
                  >
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="neuro-input w-full px-4 py-3 text-gray-800 resize-none focus:ring-2 focus:ring-neuro-accent"
                    placeholder="Ihre Nachricht..."
                  />
                </div>

                <button
                  type="submit"
                  className="neuro-button w-full py-4 font-bold text-neuro-accent text-lg hover:scale-105 transition-transform"
                >
                  Nachricht senden
                </button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center neuro-card p-6">
            <p className="text-gray-600">
              © {new Date().getFullYear()} Portfolio. Alle Rechte vorbehalten.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Entwickelt mit ❤️ und Next.js
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
