# Deployment Anleitung

## ✅ Was wurde erstellt

Ihre professionelle Next.js Portfolio-Website im Neumorphism-Stil ist fertig! Die Website enthält:

- **Hero-Section** mit Foto-Platzhalter
- **Über mich** Section mit persönlichen Highlights
- **Skills** mit Programmiersprachen und Technologien
- **Projekte** mit Filter-Funktion
- **Karriere** Timeline
- **Kontakt** Formular und Social Links

## 🚀 Nächste Schritte für GitHub Pages Deployment

### 1. Merge den Branch

Da der Code auf dem Branch `claude/nextjs-portfolio-deploy-01MAUxesMLfGubeAygsyqghq` liegt, müssen Sie diesen in den Hauptbranch mergen:

```bash
# Wechseln Sie zum Hauptbranch (main oder master)
git checkout main  # oder master

# Mergen Sie den Feature-Branch
git merge claude/nextjs-portfolio-deploy-01MAUxesMLfGubeAygsyqghq

# Pushen Sie zum Repository
git push origin main  # oder master
```

### 2. GitHub Pages einrichten

1. Gehen Sie zu Ihrem GitHub Repository: `https://github.com/aleexNxt/aleexNxt.github.io`
2. Klicken Sie auf **Settings** (Einstellungen)
3. Navigieren Sie zu **Pages** im linken Menü
4. Unter **Source** wählen Sie:
   - Source: **GitHub Actions**
5. Speichern Sie die Einstellungen

### 3. Automatisches Deployment

Nach dem Merge wird der GitHub Actions Workflow automatisch ausgeführt und die Website deployed. Sie können den Fortschritt unter:
- Repository → Actions Tab verfolgen

Die Website wird dann unter **https://gt3for.me** verfügbar sein.

## 🎨 Personalisierung

Bevor Sie die Website live schalten, sollten Sie folgende Anpassungen vornehmen:

### Pflicht-Anpassungen:

1. **Ihr Name**: Ersetzen Sie `[Dein Name]` in `components/Hero.tsx:44`
2. **Foto hinzufügen**:
   - Fügen Sie Ihr Foto in `/public/` hinzu (z.B. `profile.jpg`)
   - Aktualisieren Sie `components/Hero.tsx:31-40` um das Bild einzubinden
3. **Kontaktdaten**: Aktualisieren Sie in `components/Contact.tsx:44-62`:
   - Email-Adresse
   - Telefonnummer
   - Standort
4. **Social Media Links**: Aktualisieren Sie in `components/Contact.tsx:65-70`
5. **Karriere-Daten**: Passen Sie `components/Career.tsx:21-62` an Ihre tatsächliche Karriere an
6. **Projekte**: Aktualisieren Sie `components/Projects.tsx:24-72` mit Ihren echten Projekten
7. **Skills**: Passen Sie `components/Skills.tsx:22-75` an Ihre Fähigkeiten an

### Optional:

- **Farben**: Ändern Sie das Farbschema in `tailwind.config.ts:11-14`
- **SEO**: Aktualisieren Sie Meta-Tags in `app/layout.tsx:4-10`
- **Über mich Text**: Personalisieren Sie `components/About.tsx:38-52`

## 🔧 Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
# Öffnen Sie http://localhost:3000

# Production Build testen
npm run build
```

## 📱 Responsive Design

Die Website ist vollständig responsive und funktioniert auf:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🔍 SEO Features

- Optimierte Meta-Tags
- Sitemap.xml
- Robots.txt
- Semantisches HTML
- Open Graph Tags (können noch hinzugefügt werden)

## 📧 Kontaktformular

Das Kontaktformular ist derzeit nur Frontend. Für funktionierende Email-Funktionalität können Sie integrieren:
- **FormSpree** (einfach)
- **EmailJS** (kostenlos)
- **Eigene API Route** mit Nodemailer

## 🎯 Performance

Die Website ist optimiert für:
- Schnelle Ladezeiten (< 2s)
- Minimales JavaScript
- Optimierte CSS
- Static Site Generation

## ⚠️ Wichtige Hinweise

- Ersetzen Sie alle Platzhalter-Texte vor dem Live-Gang
- Testen Sie alle Links und Formulare
- Überprüfen Sie die Website auf verschiedenen Geräten
- Fügen Sie ein echtes Favicon hinzu (derzeit Standard)

## 📄 Lizenz & Copyright

Vergessen Sie nicht, Copyright-Informationen anzupassen in:
- `components/Contact.tsx` (Footer)
- `README.md`

Viel Erfolg mit Ihrer neuen Portfolio-Website! 🚀
