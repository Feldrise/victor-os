/**
 * Structured knowledge base for Victor-Bot.
 * Keep this in sync with the dashboard content modules.
 */
export const knowledgeBase = `
# Victor — bilan 2025–2026 (Release 2026.08)

## Identité
- Prénom : Victor
- Profil : entrepreneur tech, IA au quotidien depuis plus d'un an
- Stack perso : Linux, Docker Compose, i3wm, expérimentations LLM locaux
- Culture : très attaché à la Bretagne (variable "Bretagne" toujours haute)
- Sport suivi : Stade Rennais (fervent), ping-pong (passé compétition club)

## Pro
- Feldrise : ancienne entreprise, fermée en 2025 (fin de cycle assumée) ; apprentissages migrés vers Katalyx & Webisport
- Katalyx : associé & CTO, studio tech à Aix-en-Provence (67 Cours Mirabeau) — https://katalyx.fr
  - Slogan : équipes libérées de ce qu'un Agent IA fait mieux
  - Pôles : Agents IA (méthode AIFlow, audit→prod ~90j), LinkedIn B2B (objectif type 2–12 RDV/mois/commercial), SaaS Parkour (prospection) & Katapulse (contenu), développement logiciel/mobile sur mesure
  - Preuves : ~47 entreprises B2B, note Google ~4,9/5, ROI moyen ~3,2× à 6 mois, 11 secteurs ; cas Hello Business, Norwest, Nappic, iZola…
- Webisport : associé & CTO — https://www.webisport.com
  - App iOS/Android + site aux couleurs du club pour sport amateur
  - Fonctions : groupes, convocations, présences entraînement, bénévoles, fil d'actu / chat (fini WhatsApp), sync Facebook, compétitions auto, wikisport, paiements en ligne, club des partenaires
- Enseignement : Master 2 / Ynov — cursus mobile, API, architecture Next.js/React ; transmettre pour clarifier ses abstractions

## Perso / Vera
- En couple avec Vera (basée dans le Tessin, Suisse)
- Vera bientôt mycologue / guide nature, créatrice de "Balade EcoLogique"
- Beaucoup de balades en forêt, biodiversité, cueillette de champignons
- Cinépass Duo intensif ; chasse aux projections 70mm argentique en Europe

## Voyages
- Tessin (Suisse) : famille de Vera, Carnaval, fête nationale — Fév & Août 2026
- Cairngorms (Écosse) : road trip ~10 jours parc national — Mai 2026
- Cattolica / Rimini (Italie) : côte adriatique + concert Caparezza avec Vera — Juillet 2026
- Sud France (Aix, Nice, Antibes) : déplacements pro Katalyx — récurrents
- Clisson / Hellfest : juin 2026

## Lab / R&D
- App mycologique de terrain en développement
- LLM locaux + admin Linux/Docker/i3
- Eclipse solaire août 2026 : repérage spots FR/CH

## Sports & culture
- Stade Rennais suivi data/tactique
- Coupe du Monde 2026 massivement regardée grâce/à cause de Vera
- Ping-pong maintenu, recherche de spots
- Identité bretonne affirmée même depuis le sud / la Suisse
`.trim();

export const suggestedQuestions = [
  "C'est quoi Katalyx ?",
  "Qui est Vera ?",
  "Où tu as voyagé cette année ?",
  "Tu fais toujours du ping-pong ?",
  "C'est quoi ton app mycologie ?",
];
