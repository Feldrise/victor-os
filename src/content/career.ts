export type CareerStatus = "active" | "ended" | "ongoing";

export type CareerMetric = {
  label: string;
  value: string;
};

export type CareerPillar = {
  title: string;
  detail: string;
};

export type CareerSection = {
  title: string;
  body?: string;
  items?: CareerPillar[];
};

export type CareerActivity = {
  id: string;
  title: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  body: string;
  highlights: string[];
  sections?: CareerSection[];
  metrics?: CareerMetric[];
  status: CareerStatus;
  url?: string;
  /** Hex accent for list strip + preview chrome */
  accent: string;
  /** When false, skip iframe and show constructed preview */
  embedAllowed?: boolean;
};

export const careerActivities: CareerActivity[] = [
  {
    id: "feldrise",
    title: "Feldrise",
    role: "Fondateur",
    period: "→ 2025",
    summary:
      "Ancienne structure — cycle clos. L’énergie et les apprentissages ont été réalloués vers Katalyx et Webisport.",
    body: "Feldrise a été officiellement mise hors service en 2025. Ce n’est pas une page à effacer : c’est le socle. L’entreprise a servi de laboratoire grandeur nature — product, clients, dette technique, rythme entrepreneurial — avant que l’énergie soit réallouée vers deux déploiements plus nets : Katalyx (studio tech) et Webisport (produit sport amateur).",
    highlights: [
      "Structure fermée / EOL en 2025",
      "Apprentissages migrés vers Katalyx & Webisport",
      "Fin de cycle assumée plutôt que zombie-startup",
    ],
    sections: [
      {
        title: "Ce que ça a laissé",
        body: "Une façon de construire (ship tôt, parler vrai, couper ce qui ne tient pas) et un réseau qui a suivi dans les nouvelles structures. Le volume a été démonté : dépendances migrées, comptes clôturés, narrative basculée vers ce qui tourne maintenant.",
      },
      {
        title: "Pourquoi c’est encore là",
        items: [
          {
            title: "Honnêteté du changelog",
            detail:
              "Un portfolio qui n’efface pas les fins de cycle dit plus sur la façon de décider qu’une liste de success stories.",
          },
          {
            title: "Continuité",
            detail:
              "Les réflexes produit et l’exigence tech n’ont pas disparu — ils ont changé de véhicule.",
          },
        ],
      },
    ],
    status: "ended",
    accent: "#9880a0",
  },
  {
    id: "katalyx",
    title: "Katalyx",
    role: "Associé & CTO",
    period: "2025 → now",
    location: "Aix-en-Provence · 67 Cours Mirabeau",
    summary:
      "Studio tech aixois : Agents IA, LinkedIn B2B, SaaS (Parkour, Katapulse) et développement sur mesure.",
    body: "Katalyx est le studio tech basé à Aix-en-Provence. Positionnement clair : « Vos équipes n’ont plus à faire ce qu’un Agent IA fait mieux qu’elles. » Quatre métiers qui se renforcent — Agents IA, LinkedIn B2B, SaaS d’industrialisation, développement logiciel — pour accompagner des organisations publiques, industrielles et B2B, en présentiel PACA ou en remote partout en France.",
    highlights: [
      "Associé & CTO — delivery produit / tech",
      "Méthode AIFlow : audit → pilote → prod en ~90 jours",
      "SaaS édités : Parkour (prospection) & Katapulse (contenu)",
      "Clients cités : iZola, Hello Business, Norwest, Nappic…",
    ],
    metrics: [
      { label: "Entreprises B2B", value: "47+" },
      { label: "Note Google", value: "4,9 / 5" },
      { label: "ROI moyen (6 mois)", value: "3,2×" },
      { label: "Secteurs", value: "11" },
    ],
    sections: [
      {
        title: "Quatre piliers",
        body: "On ne fait pas tout — mais ce qu’on fait, on le fait à fond. La tech construit les agents et les outils ; LinkedIn génère les opportunités ; les SaaS industrialisent les bonnes pratiques.",
        items: [
          {
            title: "Agents IA",
            detail:
              "Automatisation de workflows B2B (qualification, veille, rédaction, reporting). Audit IA, pilote en 4–6 semaines, production en ~90 jours. Pilotes à partir de ~4 500 € HT ; scale mensuel selon volume LLM et intégrations.",
          },
          {
            title: "LinkedIn B2B",
            detail:
              "Moteur de RDV : copywriting dirigeant, social selling équipe, leads, Ads. Objectif type : de 2 à 12 RDV qualifiés / mois / commercial. Méthode rodée sur 40+ clients PACA. Premiers signaux ~30 j, RDV récurrents 60–90 j.",
          },
          {
            title: "SaaS — Parkour & Katapulse",
            detail:
              "Parkour transforme les commentaires LinkedIn en opportunités. Katapulse rédige des posts à la voix de marque. Self-service possible (essai 7 jours sans CB) ; accompagnement pour aligner l’outil sur une stratégie.",
          },
          {
            title: "Développement",
            detail:
              "Logiciels métier, apps mobiles, refontes. Audit technique, sprints de deux semaines, IP transférée à 100 %. Ex. : iZola (KYC biométrique, signature électronique, scoring), appli IA de reconnaissance d’images, sites & SaaS clients.",
          },
        ],
      },
      {
        title: "Méthode AIFlow",
        body: "De l’audit à la production avec un humain dans la boucle sur les décisions critiques. LLM choisis au cas par cas (GPT, Claude, Mistral, open source) selon qualité, coût et RGPD — infra européenne (OVH, Scaleway) quand c’est pertinent.",
        items: [
          {
            title: "1 · Audit flash (~1 sem.)",
            detail:
              "Cartographie des processus chronophages, scoring faisabilité × ROI × risque, Top 3 actionnable.",
          },
          {
            title: "2 · Pilote (4–6 sem.)",
            detail:
              "Architecture, choix LLM, branchements API / MCP, tests utilisateurs dans l’environnement client.",
          },
          {
            title: "3 · Production & scale",
            detail:
              "Déploiement, monitoring, garde-fous, formation. Puis industrialisation, nouveaux agents, reporting heures gagnées / RDV / ROI.",
          },
        ],
      },
      {
        title: "Terrain & preuve",
        body: "Studio au 67 Cours Mirabeau (Aix). Diagnostic flash gratuit (15–45 min, sans CB). Cas publics : +20 % productivité commerciale (Hello Business), +106 % conversion (Norwest Avocat), 14 clients restaurateurs (Nappic). Avis clients qui citent explicitement le suivi projet côté Victor (ex. iZola).",
      },
    ],
    status: "active",
    url: "https://katalyx.fr",
    accent: "#e0b878",
    embedAllowed: false,
  },
  {
    id: "webisport",
    title: "Webisport",
    role: "Associé & CTO",
    period: "2025 → now",
    summary:
      "App + site aux couleurs du club : convocations, actu, paiements, partenaires — iOS & Android.",
    body: "Webisport digitalise le sport amateur. Promesse produit : « Partagez vos valeurs avec une application à vos couleurs. » Les adhérents, partenaires et supporters téléchargent l’app ; le staff gère le contenu depuis le site fourni avec l’application. Objectif : sortir des groupes WhatsApp, réduire les forfaits, attirer bénévoles et partenaires, sans bricolage d’outils génériques.",
    highlights: [
      "Application native iOS & Android + site club",
      "Identité visuelle : logo & couleurs du club partout",
      "Convocations, présences, planning, compétitions auto",
      "Revenus : paiements en ligne + club des partenaires",
    ],
    metrics: [
      { label: "Stores", value: "iOS · Android" },
      { label: "Cible", value: "Clubs amateurs" },
      { label: "Stack produit", value: "App + back-office" },
      { label: "Rôle", value: "Associé & CTO" },
    ],
    sections: [
      {
        title: "Comment ça marche",
        body: "Deux surfaces : l’application membre (stores) et le site / back-office dirigeants. Chaque adhérent ne voit que les infos de son groupe. Le blason et les couleurs du club sont repris sur chaque écran — marqueur d’identité, pas un skin générique.",
      },
      {
        title: "Vie du club & compétition",
        items: [
          {
            title: "Convocations",
            detail:
              "Envoi individuel joueur / parent, suivi des réponses, alertes s’il manque des joueurs — pour réduire amendes et forfaits. Gestion parent-enfant intégrée.",
          },
          {
            title: "Entraînements & présence",
            detail:
              "Suivi de présence à chaque séance ; notification en cas d’absence.",
          },
          {
            title: "Compétitions",
            detail:
              "Calendriers, classements, résultats. Synchronisation automatique des matchs officiels + matchs amicaux manuels.",
          },
          {
            title: "Planning & événements",
            detail:
              "Calendrier par groupe ou membre, événements publics, système de bénévolat (places à pourvoir, inscription en un clic).",
          },
        ],
      },
      {
        title: "Communication & pédagogie",
        items: [
          {
            title: "Fini les groupes WhatsApp",
            detail:
              "Fil d’actu par groupe (staff only pour publier), chat room collective, messagerie privée — numéros de téléphone masqués entre adhérents.",
          },
          {
            title: "Facebook dans l’app",
            detail:
              "Publications Facebook synchronisées sur l’appli sans action supplémentaire — utile pour ceux qui n’ont pas Facebook.",
          },
          {
            title: "Wikisport",
            detail:
              "Bibliothèque pédagogique : fiches par thème sur le sport ou le club, outil de création simplifié.",
          },
        ],
      },
      {
        title: "Revenus club",
        items: [
          {
            title: "Paiement en ligne",
            detail:
              "Cotisations, stages, équipements, dons, produits dérivés — moins de chase admin.",
          },
          {
            title: "Club des partenaires",
            detail:
              "Visibilité digitale auprès des adhérents pour attirer / fidéliser des sponsors et générer de nouvelles recettes.",
          },
        ],
      },
    ],
    status: "active",
    url: "https://www.webisport.com",
    accent: "#8bc4a0",
    embedAllowed: true,
  },
  {
    id: "ynov",
    title: "Enseignement",
    role: "Master 2 — Ynov & transmission",
    period: "ongoing",
    summary:
      "Cursus intensifs mobile, API et architecture Next.js / React — transmettre pour stress-tester ses abstractions.",
    body: "L’enseignement tourne en tâche de fond à côté des boîtes. Conception de cursus intensifs autour du développement (mobile, API) et de l’architecture logicielle moderne (Next.js, React). Préparer un cours, c’est forcer la clarté : ce qu’on ne sait pas expliquer, on ne le maîtrise pas encore.",
    highlights: [
      "Cursus mobile & API",
      "Architecture applicative Next.js / React",
      "Pédagogie = revue de conception permanente",
    ],
    sections: [
      {
        title: "Ce qui est transmis",
        items: [
          {
            title: "Mobile & API",
            detail:
              "Concevoir des interfaces mobiles branchées à des backends sains : contrats d’API, auth, erreurs, perf perçue.",
          },
          {
            title: "Architecture front",
            detail:
              "Next.js / React au-delà du tutoriel — structure de projet, data fetching, frontières serveur/client, dette évitable.",
          },
        ],
      },
      {
        title: "Pourquoi ça compte côté Pro",
        body: "Les mêmes questions reviennent en mission Katalyx / Webisport. Enseigner accélère le feedback loop : les élèves cassent les explications floues plus vite qu’un code review poli.",
      },
    ],
    status: "ongoing",
    accent: "#9ab0d8",
  },
];
