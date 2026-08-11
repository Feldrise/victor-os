export type Trend = "up" | "down" | "stable";

export type PassionMetric = {
  label: string;
  value: string;
};

export type PassionMatch = {
  id: string;
  date: string;
  opponent: string;
  score: string;
  competition: string;
  note: string;
};

export type PassionWcGame = {
  id: string;
  date: string;
  stage: string;
  matchup: string;
  note: string;
};

export type PassionSpot = {
  id: string;
  name: string;
  city: string;
  vibe: string;
  note: string;
};

export type PassionRitual = {
  id: string;
  title: string;
  detail: string;
};

export type Passion = {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  value: string;
  unit?: string;
  trend: Trend;
  series: number[];
  summary: string;
  body: string;
  highlights: string[];
  metrics?: PassionMetric[];
  matches?: PassionMatch[];
  wcGames?: PassionWcGame[];
  spots?: PassionSpot[];
  rituals?: PassionRitual[];
  places?: { id: string; name: string; note: string }[];
};

export const passions: Passion[] = [
  {
    id: "rennes",
    title: "Stade Rennais",
    subtitle: "Module Football & Data",
    accent: "#e01e37",
    value: "∞",
    unit: "ferveur",
    trend: "up",
    series: [42, 48, 45, 55, 52, 61, 58, 67, 72, 70, 78, 84],
    summary:
      "Suivi assidu des métriques tactiques et des probabilités européennes. Le dashboard mental ne se coupe jamais.",
    body: "Le Stade Rennais n’est pas un club qu’on regarde : c’est un thread ouvert en permanence. Formations, xG, rumeurs de mercato, soirées Roazhon Park ou streams depuis le Sud / le Tessin — la ferveur suit le fuseau. Entre deux sprints Katalyx, un coup d’œil aux stats calme ou enflamme. Vera a appris à reconnaître le silence suspect quand le score est mauvais.",
    highlights: [
      "Roazhon Park quand le calendrier le permet",
      "Veille data : forme, presses, qualifs Europe",
      "Communauté discord / potes foot toujours online",
      "Ferveur portable — Sud, Suisse, peu importe",
    ],
    metrics: [
      { label: "Matchs suivis", value: "38+/an" },
      { label: "Europe hope", value: "HIGH" },
      { label: "Mode", value: "ALWAYS ON" },
      { label: "Trend", value: "↑" },
    ],
    matches: [
      {
        id: "m1",
        date: "2025-09-14",
        opponent: "OM",
        score: "2–1",
        competition: "Ligue 1",
        note: "Soirée Roazhon — gorge en miettes, moral au max.",
      },
      {
        id: "m2",
        date: "2025-11-02",
        opponent: "PSG",
        score: "1–1",
        competition: "Ligue 1",
        note: "Point volé. Analyse xG jusqu’à 2h du mat.",
      },
      {
        id: "m3",
        date: "2026-02-08",
        opponent: "Nantes",
        score: "3–0",
        competition: "Derby",
        note: "Derby vu depuis Aix — group call + maillot obligatoire.",
      },
      {
        id: "m4",
        date: "2026-04-19",
        opponent: "Lyon",
        score: "0–2",
        competition: "Ligue 1",
        note: "Soirée courte. Vera a changé de sujet avec tact.",
      },
      {
        id: "m5",
        date: "2026-05-17",
        opponent: "Lille",
        score: "2–2",
        competition: "Course Europe",
        note: "Dernière journée — tableau Excel mental jusqu’au bout.",
      },
    ],
  },
  {
    id: "wc2026",
    title: "Coupe du Monde 2026",
    subtitle: "Sous-module Vera-induced",
    accent: "#6bbf8a",
    value: "MAX",
    unit: "visionnage",
    trend: "up",
    series: [10, 12, 15, 20, 35, 55, 70, 85, 92, 95, 98, 100],
    summary:
      "Événement massivement visionné grâce — ou à cause — de Vera. Pic de charge audiovisuelle planifié.",
    body: "Vera a activé le mode Mondial plus tôt que prévu : groupes, horaires NA, favoris, et un tableau partagé digne d’un ops room. Entre France, Suisse et curiosité pour les outsiders, on enchaîne les matchs comme des épisodes. Le Tessin en août 2026 risque d’être un camp de base football autant que familiale — écrans, apéros, débats tactiques bilingues.",
    highlights: [
      "Calendrier partagé FR / CH / outsiders",
      "Pic de charge été 2026 (Tessin + écrans)",
      "Protocol apéro-match validé",
      "Stats live + débat post-sifflet",
    ],
    metrics: [
      { label: "Hype", value: "100%" },
      { label: "Hosts", value: "USA/CA/MX" },
      { label: "Driver", value: "VERA" },
      { label: "Charge AV", value: "MAX" },
    ],
    wcGames: [
      {
        id: "w1",
        date: "2026-06-12",
        stage: "Groupe",
        matchup: "France — ouverture",
        note: "Réveil tôt ou séance décalée — à arbitrer.",
      },
      {
        id: "w2",
        date: "2026-06-18",
        stage: "Groupe",
        matchup: "Suisse — match clé",
        note: "Vera side quest : drapeau suisse sur la table.",
      },
      {
        id: "w3",
        date: "2026-06-25",
        stage: "Groupe",
        matchup: "Outsider surprise",
        note: "On parie sur le chaos. Historique favorable.",
      },
      {
        id: "w4",
        date: "2026-07-05",
        stage: "Huitièmes",
        matchup: "À définir",
        note: "Blocage calendrier Tessin déjà posé.",
      },
      {
        id: "w5",
        date: "2026-07-19",
        stage: "Finale",
        matchup: "Qui sait",
        note: "Écran le plus large disponible. Non négociable.",
      },
    ],
  },
  {
    id: "pingpong",
    title: "Ping-Pong",
    subtitle: "Service de loisir",
    accent: "#e8a04a",
    value: "ON",
    unit: "uptime",
    trend: "stable",
    series: [60, 58, 62, 55, 64, 66, 63, 70, 68, 72, 75, 74],
    summary:
      "Maintien de l’activité pongiste, chasse aux spots régionaux. Expérience club toujours dans le buffer.",
    body: "Le tennis de table reste le loisir le plus portable : une table, deux raquettes, et le réflexe compétition qui revient. Passé club encore dans les muscles — service coupé, pied d’appel, mauvais perdant en mode soft. Depuis les allers-retours Sud / Suisse, la mission est claire : mapper les spots (salles municipales, bars à tables, clubs ouverts aux freelances du dimanche).",
    highlights: [
      "Background compétition club",
      "Chasse aux tables Rennes / Aix / Tessin",
      "Sessions récréatives + défis amicaux",
      "Uptime loisir stable malgré le pro",
    ],
    metrics: [
      { label: "Uptime", value: "ON" },
      { label: "Niveau", value: "Club+" },
      { label: "Spots", value: "8+" },
      { label: "Mood", value: "STABLE" },
    ],
    spots: [
      {
        id: "s1",
        name: "Maison de quartier",
        city: "Rennes",
        vibe: "Classique",
        note: "Tables un peu mortes, public fidèle, parfait pour se remettre.",
      },
      {
        id: "s2",
        name: "Club municipal soirée ouverte",
        city: "Aix-en-Provence",
        vibe: "Sérieux soft",
        note: "Entre deux syncs Katalyx — 45 min qui sauvent la journée.",
      },
      {
        id: "s3",
        name: "Bar à jeux — table du fond",
        city: "Nice",
        vibe: "Chaotique",
        note: "Éclairage douteux, parties mémorables.",
      },
      {
        id: "s4",
        name: "Salle associative",
        city: "Locarno",
        vibe: "Découverte",
        note: "Vera spectatrice, puis adversaire. Erreur stratégique.",
      },
      {
        id: "s5",
        name: "Camping / table outdoor",
        city: "Cairngorms",
        vibe: "Improvisé",
        note: "Vent horizontal. Score officiel contesté.",
      },
    ],
  },
  {
    id: "bretagne",
    title: "Variable Bretagne",
    subtitle: "Identity gauge",
    accent: "#7eb8da",
    value: "87",
    unit: "/ 100",
    trend: "up",
    series: [70, 72, 74, 71, 76, 78, 80, 79, 82, 84, 86, 87],
    summary:
      "Fervent défenseur de la culture bretonne. La jauge monte à chaque rappel des racines — surtout depuis le Sud ou la Suisse.",
    body: "Plus on s’éloigne (Aix, Nice, Tessin), plus la variable Bretagne s’incrémente. Beurre salé, météo comme excuse, playlists fest-noz, et ce réflexe de corriger gentiment ceux qui confondent galette et crêpe. Ce n’est pas du folklore de carte postale : c’est un ancrage. Les retours Rennes / Brocéliande recalibrent le compteur ; les déplacements pro le font monter par contraste.",
    highlights: [
      "Racines Rennes / culture celtique assumée",
      "Jauge ↑ hors Bretagne (paradoxe validé)",
      "Rituels food + musique + météo-as-identity",
      "Pont émotionnel même en mode Sud / CH",
    ],
    metrics: [
      { label: "Affinity", value: "87" },
      { label: "Max", value: "100" },
      { label: "Delta Sud", value: "+12" },
      { label: "Delta CH", value: "+8" },
    ],
    rituals: [
      {
        id: "r1",
        title: "Beurre salé non négociable",
        detail:
          "Petit-déj hors Bretagne = test d’intégrité. Échec fréquent, moral intact.",
      },
      {
        id: "r2",
        title: "Playlist celtique en train",
        detail:
          "Rennes → Aix : bande-son de recentrage. Vera connaît déjà les refrains.",
      },
      {
        id: "r3",
        title: "Météo comme personnalité",
        detail:
          "« Il pleut » n’est jamais une plainte — c’est une signature.",
      },
    ],
    places: [
      {
        id: "p1",
        name: "Roazhon Park & centre Rennes",
        note: "Base opérationnelle historique.",
      },
      {
        id: "p2",
        name: "Brocéliande",
        note: "Forêt + mycologie + racines — combo parfait.",
      },
      {
        id: "p3",
        name: "Côte (week-ends inventés)",
        note: "Vent, goélands, crêpe obligatoire au retour.",
      },
    ],
  },
];

/** Overview cards — first three passions + Bretagne shown as gauge */
export const sportsMetrics = passions.filter((p) => p.id !== "bretagne");

export const bretagneGauge = {
  id: "bretagne",
  label: "Variable Bretagne",
  value: 87,
  max: 100,
  description:
    "Fervent défenseur de la culture bretonne. Cette jauge s’incrémente à chaque rappel des racines celtiques — surtout depuis le sud de la France ou la Suisse.",
  accent: "#7eb8da",
};

export function getPassion(id: string): Passion | undefined {
  return passions.find((p) => p.id === id);
}
