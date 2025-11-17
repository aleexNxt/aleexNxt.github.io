'use client';

import { useEffect, useRef, useState } from 'react';
import { verifyPasswordAPI, getCVPDF, generatePDFDownloadURL, revokePDFURL } from '@/lib/auth';

export default function CV() {
  const [isVisible, setIsVisible] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfURL, setPdfURL] = useState<string | null>(null);
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

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await verifyPasswordAPI(password);

    if (result.success && result.token) {
      setIsUnlocked(true);
      setToken(result.token);
      setPassword('');
    } else {
      setError(result.error || 'Fehler bei der Authentifizierung');
      setPassword('');
    }

    setIsLoading(false);
  };

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    const pdfBlob = await getCVPDF(token);

    if (pdfBlob) {
      const url = generatePDFDownloadURL(pdfBlob, 'Lebenslauf_Alexander.pdf');

      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Lebenslauf_Alexander.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup URL after 1 minute
      setTimeout(() => {
        revokePDFURL(url);
      }, 60000);
    } else {
      setError('Fehler beim Laden des PDFs. Bitte erneut authentifizieren.');
      setIsUnlocked(false);
      setToken('');
    }

    setIsLoading(false);
  };

  const handleViewPDF = async () => {
    setIsLoading(true);
    const pdfBlob = await getCVPDF(token);

    if (pdfBlob) {
      const url = generatePDFDownloadURL(pdfBlob);
      setPdfURL(url);
    } else {
      setError('Fehler beim Laden des PDFs. Bitte erneut authentifizieren.');
      setIsUnlocked(false);
      setToken('');
    }

    setIsLoading(false);
  };

  const handleClosePDF = () => {
    if (pdfURL) {
      revokePDFURL(pdfURL);
      setPdfURL(null);
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
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-border focus:border-primary outline-none transition-colors font-mono tracking-wider"
                    placeholder="••••••"
                    maxLength={6}
                    required
                    autoComplete="off"
                    disabled={isLoading}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Wird überprüft...' : 'Zugriff anfordern'}
                </button>
              </form>

              <p className="text-xs text-secondary mt-6">
                Hinweis: Das Passwort wechselt automatisch alle 4 Tage zur Sicherheit.
              </p>
            </div>
          ) : (
            <div className="max-w-md">
              <div className="border border-border p-8 mb-6">
                <div className="flex items-center justify-center mb-6">
                  <svg className="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <h4 className="text-xl font-bold text-center mb-2">Zugriff gewährt</h4>
                <p className="text-secondary text-center mb-6">
                  Sie können nun meinen vollständigen Lebenslauf als PDF herunterladen.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isLoading}
                    className="w-full px-6 py-4 border border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Lädt...' : 'PDF herunterladen'}
                  </button>

                  <button
                    onClick={handleViewPDF}
                    disabled={isLoading}
                    className="w-full px-6 py-4 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Lädt...' : 'PDF im Browser öffnen'}
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsUnlocked(false);
                  setToken('');
                  handleClosePDF();
                }}
                className="text-sm text-secondary hover:text-primary transition-colors underline underline-offset-4"
              >
                Zugriff sperren
              </button>

              {pdfURL && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
                  <div className="bg-white w-full max-w-6xl h-[90vh] rounded-lg overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b border-border">
                      <h3 className="font-bold">Lebenslauf - Alexander</h3>
                      <button
                        onClick={handleClosePDF}
                        className="text-2xl hover:text-primary transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    <iframe
                      src={pdfURL}
                      className="flex-1 w-full"
                      title="Lebenslauf PDF"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
