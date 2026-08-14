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

export type WcMatchTone =
  | "ghost"
  | "snippet"
  | "pride"
  | "underdog"
  | "night"
  | "finale";

export type WcMatch = {
  id: string;
  date: string;
  stage: string;
  left: string;
  right: string;
  leftCode: string;
  rightCode: string;
  score: string;
  suffix?: string;
  note?: string;
  tone?: WcMatchTone;
};

export type WcChannel = {
  id: string;
  ch: string;
  title: string;
  screen: string;
  place: string;
  body: string;
  accent: string;
  travelHint?: string;
  matches: WcMatch[];
};

export type WcLoyalty = {
  id: string;
  name: string;
  code: string;
  line: string;
};

export type WcStudio = {
  kicker: string;
  manifestoTitle: string;
  manifesto: string;
  loyalties: WcLoyalty[];
  channels: WcChannel[];
};

export type RennesMatch = {
  id: string;
  date: string;
  round: string;
  label?: string;
  left: string;
  right: string;
  leftCode: string;
  rightCode: string;
  score: string;
  result: "W" | "L";
};

export type RennesPrologue = {
  kicker: string;
  title: string;
  body: string;
  travelHint?: string;
  match: RennesMatch;
};

export type RennesHope = {
  kicker: string;
  title: string;
  body: string;
};

export type RennesAside = {
  kicker: string;
  title: string;
  body: string;
  date: string;
  left: string;
  right: string;
  leftCode: string;
  rightCode: string;
  score: string;
  suffix: string;
};

export type RennesRun = {
  kicker: string;
  manifestoTitle: string;
  manifesto: string;
  venueName: string;
  venueLine: string;
  finish: string;
  prologue: RennesPrologue;
  hope: RennesHope;
  matches: RennesMatch[];
  aside: RennesAside;
};

export type PassionSpot = {
  id: string;
  name: string;
  city: string;
  vibe: string;
  note: string;
  featured?: boolean;
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
  wc?: WcStudio;
  rennes?: RennesRun;
  spots?: PassionSpot[];
  rituals?: PassionRitual[];
  places?: { id: string; name: string; note: string }[];
};

export const passions: Passion[] = [
  {
    id: "rennes",
    title: "Stade Rennais",
    subtitle: "Sprint tardif",
    accent: "#e01e37",
    value: "4",
    unit: "matchs",
    trend: "up",
    series: [0, 0, 0, 0, 0, 0, 0, 8, 55, 72, 48, 40],
    summary:
      "Saison branchée trop tard : un 3–1 contre le PSG au Tessin, puis le derby et le sprint Fox — jusqu’à la dernière journée, la C1 était encore possible.",
    body: "On n’a pas fait la saison. On a branché au derby. Et on a pu y croire jusqu’au bout.",
    highlights: [
      "13 février · Tessin · Rennes 3–1 PSG (Vera + son père)",
      "Branchement sprint : derby du 26 avril",
      "Tout au Fox & Friends",
      "C1 encore possible jusqu’à J34",
    ],
    metrics: [
      { label: "Depuis", value: "26.04" },
      { label: "Écran", value: "FOX" },
      { label: "Classement", value: "6e" },
      { label: "C1", value: "ESPOIR" },
    ],
    rennes: {
      kicker: "Saison 2025–26 · on arrive au sprint",
      manifestoTitle: "Branché au derby",
      manifesto:
        "Je n’ai suivi le Stade Rennais que très tard — les derniers matchs de Ligue 1. Point d’entrée : Rennes–Nantes, le 26 avril. Ensuite on n’a plus zappé. Les quatre, on les a tous regardés au Fox & Friends.",
      venueName: "Fox & Friends",
      venueLine: "Meilleur bar de Rennes. Table unique, course C1.",
      finish: "6e · 59 pts",
      prologue: {
        kicker: "Exception · avant le sprint",
        title: "Tessin",
        body: "13 février, Rennes–PSG, chez Vera. Son père est fan de foot — on a regardé ça ensemble. 3–1. Même trop tôt dans la saison pour moi, le match est resté.",
        travelHint: "Voyages · Tessin",
        match: {
          id: "sr-psg",
          date: "2026-02-13",
          round: "L1",
          label: "Chez Vera",
          left: "Rennes",
          right: "Paris SG",
          leftCode: "SRFC",
          rightCode: "PSG",
          score: "3–1",
          result: "W",
        },
      },
      hope: {
        kicker: "Jusqu’à la dernière journée",
        title: "On pouvait encore y croire",
        body: "Lille, Lyon et Rennes pouvaient encore finir 3es. La Ligue des champions était sur la table — jusqu’au coup de sifflet de la dernière journée.",
      },
      matches: [
        {
          id: "sr-fcn",
          date: "2026-04-26",
          round: "J31",
          label: "Derby",
          left: "Rennes",
          right: "Nantes",
          leftCode: "SRFC",
          rightCode: "FCN",
          score: "2–1",
          result: "W",
        },
        {
          id: "ol-sr",
          date: "2026-05-03",
          round: "J32",
          left: "Lyon",
          right: "Rennes",
          leftCode: "OL",
          rightCode: "SRFC",
          score: "4–2",
          result: "L",
        },
        {
          id: "sr-pfc",
          date: "2026-05-10",
          round: "J33",
          left: "Rennes",
          right: "Paris FC",
          leftCode: "SRFC",
          rightCode: "PFC",
          score: "2–1",
          result: "W",
        },
        {
          id: "om-sr",
          date: "2026-05-17",
          round: "J34",
          label: "Porte close",
          left: "Marseille",
          right: "Rennes",
          leftCode: "OM",
          rightCode: "SRFC",
          score: "3–1",
          result: "L",
        },
      ],
      aside: {
        kicker: "Petite mention",
        title: "Finale de la Ligue des champions",
        body: "Derrière le PSG. Ils gardent le trophée.",
        date: "2026-05-30",
        left: "Paris SG",
        right: "Arsenal",
        leftCode: "PSG",
        rightCode: "ARS",
        score: "1–1",
        suffix: "4–3 t.a.b.",
      },
    },
  },
  {
    id: "wc2026",
    title: "Coupe du Monde 2026",
    subtitle: "Zapping Vera-induced",
    accent: "#6bbf8a",
    value: "25",
    unit: "écrans",
    trend: "up",
    series: [10, 12, 15, 20, 35, 55, 70, 85, 92, 95, 98, 100],
    summary:
      "Premier Mondial vraiment regardé — Vera connaissait les joueurs, Louna a trouvé l’écran, le Cap-Vert a failli. 25 matchs, 1 manqué (tenu).",
    body: "Pas un calendrier. Une collection d’écrans — du tout petit NOW au jumbo Hellfest, du canapé au Roazhon’s Call, jusqu’à la finale derrière les Espagnols.",
    highlights: [
      "Vera connaissait les joueurs — moi, je découvrais",
      "Louna · tout petit écran au NOW",
      "Cap-Vert : on y a tous cru",
      "Suisse–Argentine à 3 h du matin : on était devant",
    ],
    metrics: [
      { label: "Matchs", value: "25" },
      { label: "Manqué", value: "1" },
      { label: "Driver", value: "VERA" },
      { label: "Hosts", value: "USA/CA/MX" },
    ],
    wc: {
      kicker: "Pas un calendrier Webisport",
      manifestoTitle: "Premier Mondial vraiment regardé",
      manifesto:
        "Jamais autant de matchs. Vera suit le foot — elle connaissait plein de joueurs, les postes, les « attends il est trop fort ». Moi, associé d’une appli clubs amateurs, je construis des convocations et des classements auto ; ce Mondial, c’était l’inverse : des écrans trouvés, trop petits, trop grands, à 3 h du matin. On a zappé le tournoi plus qu’on ne l’a tenu.",
      loyalties: [
        {
          id: "fra",
          name: "France",
          code: "FRA",
          line: "Les Bleus jusqu’au bout — y compris la petite finale.",
        },
        {
          id: "sui",
          name: "Suisse",
          code: "SUI",
          line: "Le pays de Vera. Fierté max après la Colombie.",
        },
        {
          id: "cpv",
          name: "Cap-Vert",
          code: "CPV",
          line: "On y a tous cru. Bravo, vraiment.",
        },
      ],
      channels: [
        {
          id: "missed",
          ch: "00",
          title: "Signal perdu",
          screen: "hors antenne",
          place: "Tenue",
          body: "Ouverture Mexique–Afrique du Sud : ratée. J’étais en tenu — franc-maçon. Le Mondial a commencé sans moi.",
          accent: "#8a8078",
          matches: [
            {
              id: "mex-rsa",
              date: "2026-06-11",
              stage: "Ouverture",
              left: "Mexique",
              right: "Afrique du Sud",
              leftCode: "MEX",
              rightCode: "RSA",
              score: "2–0",
              note: "Non vu.",
              tone: "ghost",
            },
          ],
        },
        {
          id: "now",
          ch: "01",
          title: "NOW",
          screen: "minuscule → grand écran",
          place: "Le bar",
          body: "Louna nous a déniché un tout petit écran au NOW. Premier match du Mondial, pour de vrai : Qatar–Suisse. On est restés. Un bout de Brésil–Maroc encore au bar, puis les Bleus — cette fois sur le grand écran.",
          accent: "#e8b86a",
          matches: [
            {
              id: "qat-sui",
              date: "2026-06-13",
              stage: "Groupes",
              left: "Qatar",
              right: "Suisse",
              leftCode: "QAT",
              rightCode: "SUI",
              score: "1–1",
              note: "Premier match. Tout petit écran.",
            },
            {
              id: "bra-mar",
              date: "2026-06-13",
              stage: "Groupes",
              left: "Brésil",
              right: "Maroc",
              leftCode: "BRA",
              rightCode: "MAR",
              score: "1–1",
              note: "Un bout — on était encore au bar.",
              tone: "snippet",
            },
            {
              id: "fra-sen",
              date: "2026-06-16",
              stage: "Groupes",
              left: "France",
              right: "Sénégal",
              leftCode: "FRA",
              rightCode: "SEN",
              score: "3–1",
              note: "Toujours au NOW, grand écran.",
            },
          ],
        },
        {
          id: "hellfest",
          ch: "02",
          title: "Hellfest",
          screen: "jumbo",
          place: "Clisson",
          body: "Portugal–RD Congo diffusé sur grand écran au milieu du festival. Entre deux scènes, un match.",
          accent: "#d46a6a",
          matches: [
            {
              id: "por-cod",
              date: "2026-06-17",
              stage: "Groupes",
              left: "Portugal",
              right: "RD Congo",
              leftCode: "POR",
              rightCode: "COD",
              score: "1–1",
            },
          ],
        },
        {
          id: "home",
          ch: "03",
          title: "Maison",
          screen: "canapé",
          place: "Relais TV",
          body: "Le Cap-Vert tient l’Espagne depuis le canapé — bravo. Ensuite le relais TV : Vera commente, le Cap-Vert fait encore rêver contre l’Argentine, la Suisse sort la Colombie aux tirs au but.",
          accent: "#6bbf8a",
          matches: [
            {
              id: "esp-cpv",
              date: "2026-06-15",
              stage: "Groupes",
              left: "Espagne",
              right: "Cap-Vert",
              leftCode: "ESP",
              rightCode: "CPV",
              score: "0–0",
              note: "Bravo au Cap-Vert !!",
              tone: "underdog",
            },
            {
              id: "fra-irq",
              date: "2026-06-22",
              stage: "Groupes",
              left: "France",
              right: "Irak",
              leftCode: "FRA",
              rightCode: "IRQ",
              score: "3–0",
              note: "À la maison.",
            },
            {
              id: "sui-can",
              date: "2026-06-24",
              stage: "Groupes",
              left: "Suisse",
              right: "Canada",
              leftCode: "SUI",
              rightCode: "CAN",
              score: "2–1",
            },
            {
              id: "fra-swe",
              date: "2026-06-30",
              stage: "32es",
              left: "France",
              right: "Suède",
              leftCode: "FRA",
              rightCode: "SWE",
              score: "3–0",
            },
            {
              id: "sui-alg",
              date: "2026-07-02",
              stage: "32es",
              left: "Suisse",
              right: "Algérie",
              leftCode: "SUI",
              rightCode: "ALG",
              score: "2–0",
            },
            {
              id: "arg-cpv",
              date: "2026-07-03",
              stage: "32es",
              left: "Argentine",
              right: "Cap-Vert",
              leftCode: "ARG",
              rightCode: "CPV",
              score: "3–2",
              suffix: "a.p.",
              note: "On y a tous cru.",
              tone: "underdog",
            },
            {
              id: "bra-nor",
              date: "2026-07-05",
              stage: "16es",
              left: "Brésil",
              right: "Norvège",
              leftCode: "BRA",
              rightCode: "NOR",
              score: "1–2",
              note: "Ahou !",
            },
            {
              id: "por-esp",
              date: "2026-07-06",
              stage: "16es",
              left: "Portugal",
              right: "Espagne",
              leftCode: "POR",
              rightCode: "ESP",
              score: "0–1",
            },
            {
              id: "arg-egy",
              date: "2026-07-07",
              stage: "16es",
              left: "Argentine",
              right: "Égypte",
              leftCode: "ARG",
              rightCode: "EGY",
              score: "3–2",
            },
            {
              id: "sui-col",
              date: "2026-07-07",
              stage: "16es",
              left: "Suisse",
              right: "Colombie",
              leftCode: "SUI",
              rightCode: "COL",
              score: "0–0",
              suffix: "4–3 t.a.b.",
              note: "Trop fière pour la Suisse !!!!",
              tone: "pride",
            },
          ],
        },
        {
          id: "fox",
          ch: "04",
          title: "Fox & Friends",
          screen: "le bon écran",
          place: "Rennes",
          body: "France–Norvège au Fox & Friends. Meilleur bar de Rennes — ce n’est pas négociable.",
          accent: "#c49248",
          matches: [
            {
              id: "fra-nor",
              date: "2026-06-26",
              stage: "Groupes",
              left: "France",
              right: "Norvège",
              leftCode: "FRA",
              rightCode: "NOR",
              score: "4–1",
            },
          ],
        },
        {
          id: "delirium",
          ch: "05",
          title: "Delirium",
          screen: "double séance",
          place: "Rennes",
          body: "Canada–Maroc, puis France–Paraguay. Le même jour, le même bar.",
          accent: "#e8c878",
          matches: [
            {
              id: "can-mar",
              date: "2026-07-04",
              stage: "16es",
              left: "Canada",
              right: "Maroc",
              leftCode: "CAN",
              rightCode: "MAR",
              score: "0–3",
            },
            {
              id: "fra-par",
              date: "2026-07-04",
              stage: "16es",
              left: "France",
              right: "Paraguay",
              leftCode: "FRA",
              rightCode: "PAR",
              score: "1–0",
            },
          ],
        },
        {
          id: "roazhon",
          ch: "06",
          title: "Roazhon’s Call",
          screen: "choppes & stores rouges",
          place: "Paris",
          body: "Airbnb pile au-dessus du bar supporters du Stade Rennais. Suivre la Coupe du Monde depuis Paris, dans un QG breton : descente en trente secondes pour certains matchs, on crie, on remonte d’un étage. Quarts, demies — et ce Suisse–Argentine à 3 h du matin, forcément encore allumés.",
          accent: "#e01e37",
          travelHint: "Voyages · Paris",
          matches: [
            {
              id: "fra-mar",
              date: "2026-07-09",
              stage: "Quarts",
              left: "France",
              right: "Maroc",
              leftCode: "FRA",
              rightCode: "MAR",
              score: "2–0",
            },
            {
              id: "esp-bel",
              date: "2026-07-10",
              stage: "Quarts",
              left: "Espagne",
              right: "Belgique",
              leftCode: "ESP",
              rightCode: "BEL",
              score: "2–1",
            },
            {
              id: "nor-eng",
              date: "2026-07-11",
              stage: "Quarts",
              left: "Norvège",
              right: "Angleterre",
              leftCode: "NOR",
              rightCode: "ENG",
              score: "1–2",
              suffix: "a.p.",
            },
            {
              id: "sui-arg",
              date: "2026-07-11",
              stage: "Quarts",
              left: "Suisse",
              right: "Argentine",
              leftCode: "SUI",
              rightCode: "ARG",
              score: "1–3",
              suffix: "a.p.",
              note: "Oui, à 3 h du matin on était devant.",
              tone: "night",
            },
            {
              id: "fra-esp",
              date: "2026-07-14",
              stage: "Demies",
              left: "France",
              right: "Espagne",
              leftCode: "FRA",
              rightCode: "ESP",
              score: "0–2",
            },
            {
              id: "eng-arg",
              date: "2026-07-15",
              stage: "Demies",
              left: "Angleterre",
              right: "Argentine",
              leftCode: "ENG",
              rightCode: "ARG",
              score: "1–2",
            },
          ],
        },
        {
          id: "finale",
          ch: "07",
          title: "Derrière les Espagnols",
          screen: "leur fête",
          place: "Finale",
          body: "Petite finale France–Angleterre d’abord — un score de match de foot à 8. Puis, bien sûr, la finale : derrière les Espagnols. L’écran n’était plus le nôtre ; l’ambiance, si.",
          accent: "#c4a35a",
          matches: [
            {
              id: "fra-eng",
              date: "2026-07-18",
              stage: "Petite finale",
              left: "France",
              right: "Angleterre",
              leftCode: "FRA",
              rightCode: "ENG",
              score: "4–6",
            },
            {
              id: "esp-arg",
              date: "2026-07-19",
              stage: "Finale",
              left: "Espagne",
              right: "Argentine",
              leftCode: "ESP",
              rightCode: "ARG",
              score: "1–0",
              suffix: "a.p.",
              note: "Derrière les Espagnols.",
              tone: "finale",
            },
          ],
        },
      ],
    },
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
      "Trois tables, pas plus. Le clou : la salle privée d’Antoine, pote millionnaire de Vera.",
    body: "Le tennis de table reste le loisir le plus portable : une table, deux raquettes, et le réflexe compétition qui revient. Passé club encore dans les muscles — service coupé, pied d’appel, mauvais perdant en mode soft. Trois adresses seulement. Deux modestes. Une qui n’a rien de modeste.",
    highlights: [
      "Background compétition club",
      "Camping Paimpont · chez Vera",
      "PAM · association de quartier, Rennes",
      "Salle privée d’Antoine — le clou",
    ],
    metrics: [
      { label: "Uptime", value: "ON" },
      { label: "Niveau", value: "Club+" },
      { label: "Tables", value: "3" },
      { label: "Mood", value: "STABLE" },
    ],
    spots: [
      {
        id: "antoine",
        name: "Salle de sport privée",
        city: "Chez Antoine",
        vibe: "VIP",
        note: "Le pote millionnaire de Vera. Table nickel, vestiaire — le genre d’endroit où le service coupé a un public.",
        featured: true,
      },
      {
        id: "paimpont",
        name: "Table du camping",
        city: "Paimpont",
        vibe: "Chez Vera",
        note: "Outdoor, forêt à côté, score parfois contesté par le vent.",
      },
      {
        id: "pam",
        name: "PAM",
        city: "Rennes",
        vibe: "Quartier",
        note: "Association de quartier. Tables un peu mortes, public fidèle, parfait pour se remettre.",
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
    body: "Plus on s’éloigne (Aix, Nice, Tessin), plus la variable Bretagne s’incrémente. Beurre salé, météo comme excuse, et ce réflexe de corriger gentiment ceux qui confondent galette et crêpe. Ce n’est pas du folklore de carte postale : c’est un ancrage. Les retours Rennes / Brocéliande recalibrent le compteur ; les déplacements pro le font monter par contraste.",
    highlights: [
      "Racines Rennes / culture celtique assumée",
      "Jauge ↑ hors Bretagne (paradoxe validé)",
      "Rituels food + météo-as-identity",
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

/** Overview doors — only passions with a detail view */
export const sportsDoors = passions.filter(
  (p) => p.id === "rennes" || p.id === "wc2026",
);

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
