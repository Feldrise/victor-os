# VictorOS 2026.08

Dashboard interactif type « système d'exploitation » pour le bilan de l'année — avec **Victor-Bot** (Claude).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Motion (animations fenêtres / dock)
- Anthropic SDK (API route serveur uniquement)

## Setup local

```bash
npm install
cp .env.example .env.local
# Ajoute ta clé ANTHROPIC_API_KEY dans .env.local
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Clé API Anthropic pour Victor-Bot |

Sans cette clé, le reste du dashboard fonctionne ; seul le chat renvoie une erreur 503 claire.

## Déploiement (Vercel ou autre)

1. Connecte le repo / déploie le dossier
2. Ajoute `ANTHROPIC_API_KEY` dans les env vars de production
3. Build command : `npm run build`
4. Output : Next.js standard

```bash
npm run build && npm start
```

## Médias

Place tes photos dans `public/media/{career,vera,travel,sports,lab}/` — les apps utilisent pour l'instant des placeholders stylisés prêts à être remplacés.

## Apps

| App | Contenu |
|-----|---------|
| Career.app | Changelog Feldrise → Katalyx / Webisport / Ynov |
| PatchVera.app | Patch relationnel + mycologie + cinéma |
| NetworkMap.app | Carte des voyages |
| Metrics.app | Rennes, CdM, ping-pong, Variable Bretagne |
| Lab.app | Processus R&D (htop) |
| VictorBot.app | Chat Claude sarcastique / anti-spoil |
