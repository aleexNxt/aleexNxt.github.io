# Profilbild Sicherheit - Metadaten & Download-Schutz

## ⚠️ WICHTIG: EXIF-Metadaten entfernen

Dein Profilbild (`/public/images/Profilbild.jpeg`) enthält **EXIF-Metadaten**, die potentiell GPS-Koordinaten, Kameramodell, Aufnahmezeit und andere sensible Informationen enthalten können.

### Empfohlene Schritte zum Entfernen der Metadaten:

#### Option 1: Online Tools (Einfach)
1. Besuche: https://www.verexif.com/de/ oder https://www.imgonline.com.ua/delete-exif.php
2. Lade dein Profilbild hoch
3. Entferne alle EXIF-Daten
4. Lade das bereinigte Bild herunter
5. Ersetze `/public/images/Profilbild.jpeg` mit der bereinigten Version

#### Option 2: ExifTool (Kommandozeile - Empfohlen)
```bash
# ExifTool installieren
sudo apt-get install libimage-exiftool-perl  # Linux
brew install exiftool                        # macOS

# Metadaten prüfen
exiftool public/images/Profilbild.jpeg

# ALLE Metadaten entfernen
exiftool -all= public/images/Profilbild.jpeg

# Oder neues Bild ohne Metadaten erstellen
exiftool -all= -o Profilbild_clean.jpeg public/images/Profilbild.jpeg
```

#### Option 3: ImageMagick
```bash
# ImageMagick installieren
sudo apt-get install imagemagick  # Linux
brew install imagemagick          # macOS

# Bild ohne Metadaten neu speichern
convert public/images/Profilbild.jpeg -strip public/images/Profilbild_clean.jpeg
```

#### Option 4: Photoshop / GIMP
- **Photoshop**: Datei > Exportieren > Für Web speichern > Metadaten: Keine
- **GIMP**: Datei > Exportieren als > JPEG > Erweiterte Optionen > EXIF-Daten speichern deaktivieren

---

## 🔒 Download-Schutz

**Wichtiger Hinweis:** Bilder auf Websites können **NICHT vollständig** vor Downloads geschützt werden.

### Warum nicht?
- Browser müssen das Bild herunterladen, um es anzuzeigen
- Nutzer können:
  - Rechtsklick > "Bild speichern unter"
  - Browser DevTools > Network Tab
  - Screenshot machen
  - Browser-Extensions verwenden
  - Direkt die URL aufrufen (`/images/Profilbild.jpeg`)

### Was du tun kannst (Teilschutz):

#### 1. Niedrige Auflösung verwenden ✅ EMPFOHLEN
```bash
# Bild auf 400x500px verkleinern
convert public/images/Profilbild.jpeg -resize 400x500 -strip public/images/Profilbild.jpeg
```
→ Macht das Bild für Drucke oder große Verwendungen unbrauchbar

#### 2. Wasserzeichen hinzufügen ✅ EMPFOHLEN
```bash
# Wasserzeichen mit ImageMagick
convert public/images/Profilbild.jpeg \
  -pointsize 20 -fill 'rgba(255,255,255,0.3)' \
  -gravity center -annotate +0+0 '© Alexander Kruska' \
  public/images/Profilbild.jpeg
```

#### 3. Rechtsklick deaktivieren (leicht umgehbar, nicht empfohlen)
```tsx
// In Hero.tsx
<img
  src="/images/Profilbild.jpeg"
  alt="Alexander Kruska"
  className="w-full h-full object-cover"
  onContextMenu={(e) => e.preventDefault()}
  draggable={false}
/>
```

#### 4. CSS Pointer Events (leicht umgehbar)
```css
/* Verhindert Interaktionen */
.profile-image {
  pointer-events: none;
  user-select: none;
}
```

---

## ✅ Empfohlene Vorgehensweise

1. **EXIF-Metadaten entfernen** (Priorität: HOCH)
   - Nutze ExifTool oder Online-Tool
   - Prüfe mit `exiftool` oder `file` Command

2. **Bildauflösung reduzieren** (Priorität: MITTEL)
   - Max. 400x500px für Profilbild ausreichend
   - Reduziert Dateigröße und macht Missbrauch schwerer

3. **Optional: Wasserzeichen** (Priorität: NIEDRIG)
   - Dezentes © Wasserzeichen
   - Schützt vor kommerzieller Nutzung

4. **NICHT empfohlen:**
   - Rechtsklick-Blockierung (nervt legitime Nutzer)
   - Komplizierte JS-Lösungen (leicht umgehbar)

---

## 🔍 Metadaten prüfen (nach Bereinigung)

```bash
# Prüfen ob Metadaten entfernt wurden
exiftool public/images/Profilbild.jpeg | grep -i gps

# Sollte keine GPS-Daten mehr anzeigen
# Nur noch: File Type, Image Size, Encoding etc.
```

---

## 📌 Fazit

- **Metadaten entfernen:** JA, unbedingt!
- **Download-Schutz:** Nicht möglich, nur erschweren
- **Empfehlung:** Niedrige Auflösung + Metadaten entfernen = ausreichend

**Nach der Bereinigung:**
- Bild neu in `/public/images/Profilbild.jpeg` speichern
- `npm run build` ausführen
- Zu GitHub pushen
