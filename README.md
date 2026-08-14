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

## Docker (local)

```bash
# Depuis la racine du repo, avec ANTHROPIC_API_KEY dans l’environnement
export ANTHROPIC_API_KEY=…
docker compose -f docker/docker-compose.yml up --build
```

L’app écoute sur [http://localhost:3000](http://localhost:3000).

## Déploiement (VPS via GitHub Actions)

Un push sur `main` (ou un lancement manuel du workflow) construit l’image, la publie sur GHCR, puis la déploie en SSH sur le VPS (`/opt/victor-os`, port hôte **3006**).

Secrets GitHub à configurer (`Settings → Secrets and variables → Actions`) :

| Secret | Description |
|--------|-------------|
| `GH_TOKEN` | PAT GitHub avec `read:packages` / `write:packages` (login GHCR) |
| `VPS_HOST` | IP ou hostname du VPS |
| `VPS_USERNAME` | Utilisateur SSH |
| `VPS_SSH_KEY` | Clé privée SSH |
| `VPS_PORT` | Port SSH (optionnel, défaut `22`) |
| `ANTHROPIC_API_KEY` | Clé API Anthropic pour Victor-Bot |

Le VPS doit avoir Docker + Docker Compose, et le compte GitHub doit pouvoir pousser `ghcr.io/feldrise/victor-os`.

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
