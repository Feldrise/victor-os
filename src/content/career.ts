export type ChangelogTag =
  | "DEPRECATED"
  | "NEW DEPLOYMENT"
  | "BACKGROUND"
  | "ARCHITECTURE";

export type CareerEntry = {
  id: string;
  tag: ChangelogTag;
  title: string;
  subtitle: string;
  body: string;
  bullets?: string[];
  version: string;
  date: string;
};

export const careerEntries: CareerEntry[] = [
  {
    id: "feldrise",
    tag: "DEPRECATED",
    title: "Feldrise",
    subtitle: "Fin de cycle — structure fermée",
    body: "Ancienne entreprise officiellement mise hors service en 2025. Le volume a été démonté, les dépendances migrées, et l'énergie réallouée vers de nouveaux déploiements.",
    version: "v0.0.0-EOL",
    date: "2025",
  },
  {
    id: "katalyx",
    tag: "NEW DEPLOYMENT",
    title: "Katalyx",
    subtitle: "Associé & CTO — Aix-en-Provence",
    body: "Studio tech structuré autour de quatre pôles. Montée en charge après l'arrêt de Feldrise : agents IA, produit, growth B2B et SaaS internes.",
    bullets: [
      "Conception d'agents IA sur mesure pour les entreprises",
      "Développement logiciel & applications mobiles",
      "Accompagnement stratégique LinkedIn (leads B2B)",
      "Édition SaaS internes : Parkour, Katapulse",
    ],
    version: "v1.0.0",
    date: "2025 → now",
  },
  {
    id: "webisport",
    tag: "NEW DEPLOYMENT",
    title: "Webisport",
    subtitle: "Associé & CTO — plateforme clubs amateurs",
    body: "Application + site web pour structurer les clubs de sport amateur : convocations, fil d'actualité, paiements en ligne, club des partenaires.",
    bullets: [
      "Gestion des convocations",
      "Fil d'actualité club",
      "Paiements en ligne",
      "Espace partenaires",
    ],
    version: "v1.0.0",
    date: "2025 → now",
  },
  {
    id: "ynov",
    tag: "BACKGROUND",
    title: "Enseignement supérieur",
    subtitle: "Master 2 — Ynov & transmission",
    body: "Processus en tâche de fond : conception de cursus intensifs autour du développement (mobile, API) et de l'architecture logicielle (Next.js, React). Transmettre, c'est aussi stress-tester ses propres abstractions.",
    bullets: [
      "Cursus mobile & API",
      "Architecture Next.js / React",
      "Préparation intensive de cours = pics CPU mentaux",
    ],
    version: "daemon/ynov",
    date: "ongoing",
  },
];
