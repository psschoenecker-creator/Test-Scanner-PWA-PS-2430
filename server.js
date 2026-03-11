/**
 * ROOM SCANNER PWA — Server
 * Läuft auf Render.com (HTTPS automatisch!) → Kamera auf Android funktioniert
 */
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (_, res) => res.json({ ok: true }));

// ── /api/scan ─────────────────────────────────────────────────
app.post('/api/scan', async (req, res) => {
  const { imageBase64 } = req.body;
  if (!imageBase64) return res.status(400).json({ error: 'imageBase64 fehlt' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'API Key fehlt' });

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: imageBase64 } },
          { type: 'text', text: `Erkenne ALLE Gegenstände in diesem Kamerabild.
Antworte NUR mit JSON: {"objects":["Gegenstand1","Gegenstand2"],"summary":"1-Satz Raumbeschreibung auf Deutsch"}
Alle Objekte auf Deutsch. Nur JSON.` }
        ]}]
      })
    });
    if (!r.ok) { const e = await r.json().catch(()=>({})); return res.status(r.status).json({ error: e.error?.message || 'API Fehler' }); }
    const d = await r.json();
    const txt = d.content?.map(b => b.text||'').join('') || '';
    let parsed;
    try { parsed = JSON.parse(txt.replace(/```json|```/g,'').trim()); }
    catch { parsed = { objects: [], summary: '' }; }
    res.json(parsed);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ── /api/search ───────────────────────────────────────────────
app.post('/api/search', async (req, res) => {
  const { imageBase64, query } = req.body;
  if (!imageBase64 || !query) return res.status(400).json({ error: 'Felder fehlen' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'API Key fehlt' });

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 600,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: imageBase64 } },
          { type: 'text', text: `Suche nach: "${query}"\nNur JSON: {"found":true/false,"confidence":0-100,"location":"Position (links oben/Mitte/rechts unten etc)","description":"was du siehst auf Deutsch","similar":["ähnliche Objekte"]}` }
        ]}]
      })
    });
    if (!r.ok) { const e = await r.json().catch(()=>({})); return res.status(r.status).json({ error: e.error?.message || 'API Fehler' }); }
    const d = await r.json();
    const txt = d.content?.map(b => b.text||'').join('') || '';
    let result;
    try { result = JSON.parse(txt.replace(/```json|```/g,'').trim()); }
    catch { result = { found: false, confidence: 0, location: '', description: 'Fehler', similar: [] }; }
    res.json(result);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✓ Room Scanner auf Port ${PORT}`));
