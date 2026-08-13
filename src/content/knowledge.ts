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
- En couple avec Vera (née en Suisse, a grandi à Curio dans le Tessin — connaît bien l'indépendantisme local)
- Rencontre à une réunion un peu complotiste autour de l'IA ; à la 2ᵉ réunion, découvre qu'elle est guide nature → invitation rapide à une balade
- Premier bisou le 20 mars 2026, après deux balades en forêt
- Quotidien chargé (voyages, calendriers entrepreneuriaux, cours) mais ils s'amusent et s'aiment énormément
- Modules : statut relationnel, nature & mycologie, cinéma haute résolution
- Vera bientôt mycologue / guide nature, créatrice de "Balade EcoLogique"
- Cinépass Duo Pathé : 37 films depuis le début d'année 2026, genre favori "Drame"
- Films récents notables : Disclosure Day (nul), rétros Il était une fois (Fight Club, Interstellar, La La Land), Comédie-Française (super), L'Odyssée (super), The Drama (ok), Les Aigles de la République (ok), La grazia (vraiment top), Nuremberg (d'utilité publique), dessins animés (Jumpers/Hoppers, Zootopie 2)
- Pont narratif avec l'app mycologie du Labo (brief terrain partagé)

## Voyages
- Tessin / Curio (Suisse) : deux séjours famille Vera — Carnaval 14–21 fév. 2026 (Curio + nuit Bellinzone) ; été 28 juil.–11 août (canicule, lacs, 1er août / feu d’artifice Lugano)
- Écosse / Montrose : 7–17 mars 2026 — hub Montrose (imparfait), Édimbourg & Aberdeen, routes paysages ; bières, billard, full breakfasts ; Vera rejoint le 12 mars
- Clisson / Hellfest : pèlerinage musical — juin 2026 (pin carte uniquement, pas de journal photo)
- Paris : 9–16 juil. 2026 avec Vera — nénuphars, Airbnb au-dessus de Roazhon’s Call (CdM), Fontainebleau (avant incendies), Atelier des Lumières (Petit Prince), Dior Champs-Élysées, 14 juillet (défilé + feu), Odyssey Nolan en 70 mm
- Adriatique (Italie) : Bologne (hôtel creepy / bus fantôme) → Cattolica (Caparezza, meilleur café) → Rimini/Riccione (plage vide, cocktails 50€) → train retour Suisse (retards) — 17–23 juillet 2026
- Sud France (Aix, Nice, Antibes) : déplacements pro Katalyx & Webisport — récurrents (pin carte uniquement, pas de journal)

## Lab / R&D
- mycology-app (~42%) : app terrain offline (React Native, SQLite, MapLibre) — observations, géoloc, export CSV ; liée à Vera / Balade EcoLogique
- local-llm-lab (~68%) : Ollama + Docker Compose + i3wm ; banc d'essai agents (lien conceptuel Katalyx)
- eclipse-tracker : éclipse solaire août 2026 — countdown, spots Tessin / Jura / Massif / Alpes / Maggiore
- compose-daemon : socle Docker du lab

## Sports & culture (Passions)
- Stade Rennais : suivi data/tactique, Roazhon quand possible, ferveur portable Sud/Suisse
- Coupe du Monde 2026 : hype MAX "Vera-induced", calendrier mental groupes → finale, base Tessin en août
- Ping-pong : uptime ON, spots Rennes / Aix / Nice / Locarno / outdoor Écosse
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
