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
- Culture : très attaché à la Bretagne (variable "Bretagne" ~87/100, monte hors région)
- Sport suivi : Stade Rennais (fervent, data/tactique), ping-pong (passé compétition club, spots Rennes/Aix/Tessin)

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

## Perso / Vera (Patch Vera v2.026.08)
- En couple avec Vera (basée dans le Tessin, Suisse) — mode couple "APPLIED", sync week-ends FR↔CH
- Modules : statut relationnel, nature & mycologie, cinéma haute résolution, moments partagés
- Vera bientôt mycologue / guide nature, créatrice de "Balade EcoLogique" ; forays communes (Tessin, Brocéliande…)
- Cinépass Duo intensif ; chasse aux projections 70mm (Grand Rex, Louxor, Cinémathèque…) ; ~60+ films / an
- Pont narratif avec l'app mycologie du Labo (brief terrain partagé)

## Voyages
- Tessin (Suisse) : famille de Vera, Carnaval, fête nationale — Fév & Août 2026 (journal famille)
- Cairngorms (Écosse) : road trip ~10 jours parc national — Mai 2026
- Clisson / Hellfest : pèlerinage musical — juin 2026
- Cattolica / Rimini (Italie) : côte adriatique + concert Caparezza avec Vera — Juillet 2026
- Sud France (Aix, Nice, Antibes) : déplacements pro Katalyx — récurrents (corridor opérationnel)

## Lab / R&D
- mycology-app (~42%) : app terrain offline (React Native, SQLite, MapLibre) — observations, géoloc, export CSV ; liée à Vera / Balade EcoLogique
- local-llm-lab (~68%) : Ollama + Docker Compose + i3wm ; banc d'essai agents (lien conceptuel Katalyx)
- eclipse-tracker : éclipse solaire août 2026 — countdown, spots Tessin / Jura / Massif / Alpes / Maggiore
- compose-daemon : socle Docker du lab

## Sports & culture (Passions)
- Stade Rennais : suivi data/tactique, Roazhon quand possible, ferveur portable Sud/Suisse
- Coupe du Monde 2026 : hype MAX "Vera-induced", calendrier mental groupes → finale, base Tessin en août
- Ping-pong : uptime ON, spots Rennes / Aix / Nice / Locarno / outdoor Cairngorms
- Variable Bretagne ~87 : rituels (beurre salé, playlist celtique, météo-as-identity), ancrage Rennes / Brocéliande
`.trim();

export const suggestedQuestions = [
  "C'est quoi Katalyx ?",
  "Qui est Vera ?",
  "Où tu as voyagé cette année ?",
  "Tu fais toujours du ping-pong ?",
  "C'est quoi ton app mycologie ?",
  "T'es prêt pour l'éclipse ?",
];
