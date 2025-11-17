# PDF-Integration Anleitung

## Ihre CV-PDF hinzufügen

### Schritt 1: PDF zu Base64 konvertieren

**Option A - Online:**
1. Besuchen Sie: https://base64.guru/converter/encode/pdf
2. Laden Sie Ihre CV-PDF hoch
3. Klicken Sie auf "Encode PDF to Base64"
4. Kopieren Sie den gesamten Base64-String

**Option B - Terminal (macOS/Linux):**
```bash
base64 -i ihr-lebenslauf.pdf -o cv-base64.txt
```

**Option C - Windows PowerShell:**
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("ihr-lebenslauf.pdf")) | Out-File cv-base64.txt
```

### Schritt 2: Base64 in Code einfügen

1. Öffnen Sie `lib/cv-pdf.ts`
2. Ersetzen Sie den Platzhalter bei `CV_PDF_BASE64` mit Ihrem Base64-String:

```typescript
const CV_PDF_BASE64 = `
IHR_GESAMTER_BASE64_STRING_HIER
`;
```

**Wichtig:**
- Behalten Sie die Backticks (`) bei
- Der String kann sehr lang sein (mehrere tausend Zeichen)
- Achten Sie darauf, dass keine Leerzeichen am Anfang/Ende sind

### Schritt 3: Dateiname anpassen (optional)

In `lib/cv-pdf.ts` können Sie den Dateinamen ändern:

```typescript
export function generatePDFDownloadURL(pdfBlob: Blob, filename: string = 'CV_IhrName.pdf'): string {
  return URL.createObjectURL(pdfBlob);
}
```

## Sicherheitshinweise

### Was ist geschützt:
✅ PDF ist nicht direkt im `public/` Ordner verfügbar
✅ PDF wird nur nach Passwort-Validierung dekodiert
✅ Base64-String ist obfuskiert im Source Code
✅ Passwort wechselt alle 4 Tage automatisch

### Was NICHT geschützt ist:
⚠️ Bei statischem Hosting ist der Base64-String theoretisch im Quellcode sichtbar
⚠️ Technisch versierte Benutzer könnten den String aus dem JavaScript extrahieren
⚠️ Dies ist KEINE echte serverseitige Authentifizierung

### Für maximale Sicherheit:
Wenn Sie echte serverseitige Sicherheit benötigen, müssen Sie:
1. Ein Backend-Service verwenden (z.B. Vercel Serverless Functions, AWS Lambda)
2. Das PDF auf einem geschützten Server speichern
3. Eine echte API-Route mit Server-Validierung erstellen

## Aktuelles Passwort abrufen

### Im Development-Modus:
Das aktuelle Passwort wird in der Browser-Konsole angezeigt:
```
npm run dev
# Öffnen Sie http://localhost:3000
# Öffnen Sie die Konsole (F12) und scrollen Sie zur CV-Section
```

### Programmatisch:
```bash
node -e "
const SECRET_SEED = 'portfolio-cv-2025';
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}
function generatePassword(hash) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let password = '';
  let num = hash;
  for (let i = 0; i < 6; i++) {
    password += chars[num % chars.length];
    num = Math.floor(num / chars.length);
  }
  return password;
}
const startDate = new Date('2025-01-01').getTime();
const now = Date.now();
const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
const period = Math.floor(daysSinceStart / 4);
const hash = simpleHash(SECRET_SEED + period);
console.log('Aktuelles Passwort:', generatePassword(hash));
"
```

## Passwort-Intervall ändern

In `lib/auth.ts` Zeile 10:
```typescript
const period = Math.floor(daysSinceStart / 4);  // 4 = alle 4 Tage
// Ändern zu:
const period = Math.floor(daysSinceStart / 7);  // Wöchentlich
const period = Math.floor(daysSinceStart / 1);  // Täglich
```

## Troubleshooting

### PDF wird nicht angezeigt:
- Überprüfen Sie, ob der Base64-String korrekt eingefügt wurde
- Stellen Sie sicher, dass keine Zeilenumbrüche im Base64-String fehlen
- Browser-Konsole öffnen und nach Fehlern suchen

### Passwort funktioniert nicht:
- Überprüfen Sie das aktuelle Passwort mit dem Node-Script oben
- Stellen Sie sicher, dass der SECRET_SEED übereinstimmt
- Prüfen Sie, ob die Systemzeit korrekt ist

### PDF-Download schlägt fehl:
- Überprüfen Sie die Browser-Konsole auf Fehler
- Testen Sie mit einem kleineren PDF (< 1MB)
- Stellen Sie sicher, dass Popup-Blocker deaktiviert sind
