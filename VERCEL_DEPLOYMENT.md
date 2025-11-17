# Vercel Deployment Guide

## Warum Vercel statt GitHub Pages?

Die passwortgeschützte CV-Funktion erfordert **serverseitige API-Routes**, die GitHub Pages (statisches Hosting) nicht unterstützt. Vercel bietet:

- ✅ Serverless Functions / Edge Functions
- ✅ Sichere Umgebungsvariablen
- ✅ Automatische Deployments bei Git Push
- ✅ Kostenloses Hobby-Tier

## Schritt 1: Vercel Account erstellen

1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke auf "Sign Up"
3. Melde dich mit deinem GitHub-Account an

## Schritt 2: Projekt importieren

1. Klicke auf "Add New Project"
2. Wähle dein GitHub Repository `aleexNxt.github.io`
3. Klicke auf "Import"

## Schritt 3: Umgebungsvariablen konfigurieren

**WICHTIG:** Diese Secrets dürfen NIEMALS in Git committed werden!

1. Im Vercel Dashboard, gehe zu "Settings" → "Environment Variables"
2. Füge folgende Variablen hinzu:

### Variable 1: CV_SECRET_SEED
- **Name:** `CV_SECRET_SEED`
- **Value:** Ein zufälliger String (mindestens 32 Zeichen)
- **Beispiel:** `my-super-secret-portfolio-seed-2025-xyz123`
- **Environment:** Production, Preview, Development

### Variable 2: CV_MASTER_KEY
- **Name:** `CV_MASTER_KEY`
- **Value:** Ein anderer zufälliger String (mindestens 32 Zeichen)
- **Beispiel:** `admin-master-key-for-password-retrieval-abc789`
- **Environment:** Production, Preview, Development

**Tipp:** Nutze einen Password-Generator für sichere Werte!

## Schritt 4: CV-PDF hochladen

1. Im Vercel Dashboard, gehe zu deinem Projekt
2. Gehe zu "Settings" → "Environment Variables"
3. Erstelle lokal einen `private/` Ordner im Projekt-Root:
   ```bash
   mkdir -p private
   ```
4. Lege deine CV-PDF in `private/cv.pdf` ab
5. **WICHTIG:** Füge `private/cv.pdf` zu `.gitignore` hinzu:
   ```bash
   echo "private/cv.pdf" >> .gitignore
   ```
6. Für Vercel-Deployment: Nutze Vercel CLI oder lade die Datei manuell hoch

### Option A: Vercel CLI (empfohlen)

```bash
# Installiere Vercel CLI
npm i -g vercel

# Login
vercel login

# Erstelle private/cv.pdf lokal
cp /pfad/zu/deinem/lebenslauf.pdf private/cv.pdf

# Deploy
vercel --prod
```

Die `private/cv.pdf` wird beim Deployment mitgesendet, aber nicht in Git committed.

### Option B: Vercel Dashboard Upload

Alternativ kannst du die PDF via Vercel Dashboard hochladen (siehe Vercel Docs für File Uploads).

## Schritt 5: Deployment starten

1. Klicke auf "Deploy"
2. Warte auf Build-Completion (~2-3 Minuten)
3. Deine Website ist live unter `https://dein-projekt.vercel.app`

## Schritt 6: Custom Domain (Optional)

1. Gehe zu "Settings" → "Domains"
2. Füge deine Domain hinzu (z.B. `gt3for.me`)
3. Konfiguriere DNS wie von Vercel angezeigt

## Passwörter abrufen

### Aktuelles Passwort testen

Verwende die Website selbst oder teste mit curl:

```bash
curl -X POST https://dein-projekt.vercel.app/api/verify-password \
  -H "Content-Type: application/json" \
  -d '{"password": "XYZ123"}'
```

### Alle kommenden Passwörter abrufen (Admin)

Mit deinem `CV_MASTER_KEY`:

```bash
curl -X POST https://dein-projekt.vercel.app/api/admin/passwords \
  -H "Content-Type: application/json" \
  -d '{"masterKey": "DEIN_MASTER_KEY_HIER"}'
```

Beispiel-Response:
```json
{
  "success": true,
  "passwords": [
    {
      "password": "ABC123",
      "validFrom": "2025-01-01",
      "validUntil": "2025-01-05"
    },
    {
      "password": "XYZ789",
      "validFrom": "2025-01-05",
      "validUntil": "2025-01-09"
    }
    // ... weitere 8 Passwörter
  ]
}
```

## Sicherheitshinweise

✅ **Was ist sicher:**
- Password-Generation läuft nur serverseitig
- Seed und Master-Key sind nie im Client sichtbar
- PDF wird nur nach Token-Validierung ausgeliefert
- Token läuft nach 1 Stunde ab

❌ **Nicht in Git committen:**
- `.env.local` (lokale Secrets)
- `private/cv.pdf` (dein echter Lebenslauf)
- Production-Umgebungsvariablen

## Automatische Deployments

Jeder Push zu deinem GitHub Repository löst automatisch ein neues Vercel-Deployment aus:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Vercel baut und deployed automatisch!

## Troubleshooting

### Build schlägt fehl
- Prüfe ob alle Umgebungsvariablen gesetzt sind
- Checke Build-Logs in Vercel Dashboard
- Stelle sicher, dass `private/cv.pdf` existiert

### PDF nicht gefunden
- Überprüfe ob `private/cv.pdf` im Deployment enthalten ist
- Nutze `vercel --prod` statt nur `vercel` für Production-Deploy
- Checke Vercel-Logs für File-Access-Errors

### Passwort funktioniert nicht
- Teste mit Admin-API ob Passwort korrekt generiert wird
- Prüfe ob `CV_SECRET_SEED` korrekt gesetzt ist
- Beachte: Passwort wechselt alle 4 Tage!

## Support

Bei Problemen:
1. Checke Vercel Build-Logs
2. Überprüfe Environment Variables
3. Teste API-Routes direkt mit curl
4. Kontaktiere Vercel Support (sehr hilfsbereit!)
