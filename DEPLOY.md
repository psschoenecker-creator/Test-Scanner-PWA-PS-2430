# 📱 Room Scanner PWA — Render.com Setup (kostenlos, 5 Min)

## Was du bekommst
- ✅ Echte HTTPS-URL (z.B. `https://room-scanner-xyz.onrender.com`)
- ✅ Kamera funktioniert auf Android Chrome
- ✅ "Zum Homescreen hinzufügen" → sieht aus wie eine echte App
- ✅ Komplett kostenlos

---

## Schritt 1 — GitHub Repo erstellen
1. Gehe zu https://github.com → "New repository"
2. Name: `room-scanner` → "Create repository"
3. Lade alle Dateien hoch (drag & drop ins GitHub-Fenster):
   - `server.js`
   - `package.json`
   - `.gitignore`
   - Ordner `public/` mit `index.html`, `manifest.json`, `sw.js`, `icons/`

---

## Schritt 2 — Render.com deployen
1. Gehe zu https://render.com → kostenlos registrieren
2. Klicke **"New +"** → **"Web Service"**
3. **"Connect a repository"** → dein `room-scanner` Repo auswählen
4. Einstellungen:
   | Feld | Wert |
   |------|------|
   | Name | `room-scanner` (frei wählbar) |
   | Environment | `Node` |
   | Build Command | `npm install` |
   | Start Command | `node server.js` |
   | Plan | **Free** |
5. Klicke **"Advanced"** → **"Add Environment Variable"**:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-api03-DEIN-KEY` (von https://console.anthropic.com)
6. **"Create Web Service"** klicken

→ Nach ~2 Minuten bekommst du eine URL wie:
**`https://room-scanner-abc123.onrender.com`**

---

## Schritt 3 — Auf Android als App installieren
1. Öffne Chrome auf Android
2. Gehe zu deiner Render-URL
3. Chrome zeigt unten ein Banner: **"Zum Startbildschirm hinzufügen"**
   - Falls nicht: Menü (⋮) → "Zum Startbildschirm hinzufügen"
4. ✅ App erscheint auf dem Homescreen mit Icon!

---

## ⚠️ Hinweis Render Free Tier
Der kostenlose Plan "schläft" nach 15 Min Inaktivität ein.
Beim ersten Aufruf kann es 30–60 Sek dauern bis die App aufwacht.
Danach läuft alles normal schnell.

**Upgrade auf $7/Monat** verhindert das Einschlafen — optional.
