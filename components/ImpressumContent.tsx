export default function ImpressumContent() {
  return (
    <div className="prose prose-sm max-w-none">
      <h3 className="text-lg font-bold mb-4">Angaben gemäß § 5 TMG</h3>

      <div className="space-y-4">
        <div>
          <p className="font-medium">Verantwortlich für den Inhalt:</p>
          <p>Alexander Kruska</p>
        </div>

        <div>
          <p className="font-medium">Kontakt:</p>
          <p>
            E-Mail:{' '}
            <a
              href="mailto:alexander.kruska@protonmail.com"
              className="text-primary dark:text-zinc-50 hover:underline"
            >
              alexander.kruska@protonmail.com
            </a>
          </p>
        </div>

        <div>
          <p className="font-medium">Online-Streitbeilegung:</p>
          <p className="text-sm text-secondary dark:text-zinc-400">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-zinc-50 hover:underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
        </div>

        <div>
          <p className="font-medium">Hinweis:</p>
          <p className="text-sm text-secondary dark:text-zinc-400">
            Dies ist eine private, nicht-kommerzielle Website. Sie dient ausschließlich
            der Darstellung meiner beruflichen Qualifikationen und Projekte.
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border dark:border-zinc-800">
        <h3 className="text-lg font-bold mb-4">Haftungsausschluss</h3>

        <div className="space-y-4 text-sm text-secondary dark:text-zinc-400">
          <div>
            <p className="font-medium text-primary dark:text-zinc-50">Haftung für Inhalte</p>
            <p>
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen.
            </p>
          </div>

          <div>
            <p className="font-medium text-primary dark:text-zinc-50">Haftung für Links</p>
            <p>
              Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen
              Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
          </div>

          <div>
            <p className="font-medium text-primary dark:text-zinc-50">Urheberrecht</p>
            <p>
              Die durch mich erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
              außerhalb der Grenzen des Urheberrechtes bedürfen meiner schriftlichen Zustimmung.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
