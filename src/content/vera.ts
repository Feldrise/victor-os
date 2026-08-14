export type VeraStatus = "applied" | "running" | "active";

export type VeraPhoto = {
  id: string;
  src: string;
  caption: string;
  placeholder?: boolean;
};

export type VeraMetric = {
  label: string;
  value: string;
};

export type VeraFilmVerdictTone =
  | "bad"
  | "ok"
  | "good"
  | "great"
  | "essential"
  | "classic";

export type VeraFilm = {
  id: string;
  title: string;
  originalTitle?: string;
  year: string;
  poster: string;
  synopsis: string;
  verdict: string;
  verdictTone: VeraFilmVerdictTone;
  series?: string;
};

export type VeraModule = {
  id: string;
  title: string;
  eyebrow: string;
  status: VeraStatus;
  accent: string;
  summary: string;
  body: string;
  highlights: string[];
  logLines: string[];
  metrics?: VeraMetric[];
  gallery?: VeraPhoto[];
  films?: VeraFilm[];
};

export const veraPatch = {
  version: "2.026.08",
  codename: "Patch Vera",
  appliedAt: "2026",
  summary:
    "Mise à jour majeure de l’équilibre personnel. Mode Couple activé. Nouvelles dépendances nature, mycologie et cinéma Pathé.",
  changelog: [
    "dependency vera@curio resolved — Tessin latence gérée",
    "module balade-ecologique linked — forest.walk() ↑",
    "first_kiss @ 2026-03-20 after 2 walks",
    "cinepass.duo authenticated — 37 films YTD, genre=Drame",
  ],
};

export const veraModules: VeraModule[] = [
  {
    id: "status",
    title: "Statut relationnel",
    eyebrow: "Core dependency",
    status: "applied",
    accent: "#e89a9a",
    summary:
      "Vera, née en Suisse et élevée à Curio (Tessin). Rencontre autour de l’IA, première balade, premiers bisous le 20 mars 2025 — mode couple APPLIED.",
    body: "Vera est née en Suisse et a grandi dans un tout petit patelin du Tessin : Curio. Elle connaît donc très bien ce que c’est que l’indépendantisme — et le goût d’un village où tout le monde se croise. On s’est rencontrés à une réunion un peu complotiste autour de l’IA. Très vite, dès la deuxième, j’ai appris qu’elle était guide nature (balades en forêt). L’invitation à marcher n’a pas traîné. Il nous a fallu deux balades pour le premier bisou — le 20 mars 2025. Aujourd’hui le quotidien est chargé : voyages, deux calendriers entrepreneuriaux, les cours… mais on s’amuse à fond, et on s’aime énormément.",
    highlights: [
      "Curio (Tessin) — village, lac, indépendantisme local inclus",
      "Meet-cute IA → guide nature → forest.walk()",
      "Premier bisou le 20 mars 2025 (après deux balades)",
      "Quotidien dense : voyages, business, cours — uptime couple 100%",
    ],
    logLines: [
      "[ok] dependency vera@curio resolved",
      "[ok] mode=couple enabled @ 2026-03-20",
      "[info] origin=reunion_IA → forest.invite()",
      "[warn] calendars.busy=true — still laughing",
    ],
    metrics: [
      { label: "Uptime couple", value: "100%" },
      { label: "Base", value: "Curio" },
      { label: "1er bisou", value: "20/03" },
      { label: "Statut", value: "STABLE" },
    ],
    gallery: [
      {
        id: "plage-koala",
        src: "/media/vera/status/plage-koala.jpg",
        caption: "Plage, soleil, koala à lunettes de coquillages",
      },
      {
        id: "balcon-plush",
        src: "/media/vera/status/balcon-plush.jpg",
        caption: "Balcon, lac, duo de peluches — moral au max",
      },
      {
        id: "vera-peluches",
        src: "/media/vera/status/vera-peluches.jpg",
        caption: "Vera + stock stratégique de doudous",
      },
    ],
  },
  {
    id: "nature",
    title: "Nature & mycologie",
    eyebrow: "Balade EcoLogique",
    status: "running",
    accent: "#6bbf8a",
    summary:
      "Vera, bientôt mycologue et guide nature (Balade EcoLogique), a injecté forêt, biodiversité et cueillette dans le quotidien — et une app de terrain côté Labo.",
    body: "Les week-ends ne se terminent plus uniquement en salle obscure : ils commencent souvent sous les hêtres. Vera construit Balade EcoLogique — sorties guidées, pédagogie terrain, regard naturaliste. De mon côté, la curiosité mycologique a muté en brief produit : l’app de saisie champignons du Labo n’est plus un toy project, c’est un compagnon de balade. On croise noms latins, photos floues, et la règle d’or : on ne mange rien qu’on n’identifie pas deux fois.",
    highlights: [
      "Balade EcoLogique — guide nature en construction",
      "Forêts tessinoises & sorties côté France",
      "Cueillettes raisonnables, carnets de terrain",
      "Pont direct avec mycology-app (Labo)",
    ],
    logLines: [
      "[ok] module balade-ecologique linked",
      "[ok] forest.walk() frequency ↑",
      "[info] mycelium curiosity daemon started",
      "[warn] edible=false until dual ID confirmed",
    ],
    metrics: [
      { label: "Balades / an", value: "24+" },
      { label: "Espèces notées", value: "40+" },
      { label: "App terrain", value: "β" },
      { label: "Statut", value: "RUNNING" },
    ],
    gallery: [
      {
        id: "randonnee",
        src: "/media/vera/nature/randonnee.jpg",
        caption: "Sentier sous canopée — équipe élargie",
      },
      {
        id: "champignon-inscription",
        src: "/media/vera/nature/champignon-inscription.jpg",
        caption: "Vera + Victor 2026 ♡ — gravé sous un polypore",
      },
      {
        id: "vera-foret",
        src: "/media/vera/nature/vera-foret.jpg",
        caption: "Guide nature en contexte : fleur, mousse, sourire",
      },
    ],
  },
  {
    id: "cinema",
    title: "Cinéma haute résolution",
    eyebrow: "Cinépass Duo · Pathé",
    status: "active",
    accent: "#c4a35a",
    summary:
      "Exploitation intensive du Cinépass Duo Pathé. 37 films depuis janvier, genre favori : Drame. Mur d’affiches des séances récentes — du nul au chef-d’œuvre.",
    body: "Le couple a un protocole cinéma : dès qu’une sortie intéressante apparaît, on bloque. Pathé compte pour nous 37 films depuis le début d’année — genre favori officiel : Drame. On mélange blockbusters, auteurs, rétros « Il était une fois », animation, et même une capture de la Comédie-Française. Vera note les salles ; je note les verdicts. Ensemble on remplit une filmothèque qui ressemble plus à un carnet de voyage qu’à une liste Netflix.",
    highlights: [
      "37 films Pathé depuis janvier 2026",
      "Genre favori : Drame",
      "Mix sorties, rétros, animation & scène filmée",
      "Verdicts duo sans filtre (nul → vraiment top)",
    ],
    logLines: [
      "[ok] cinepass.duo authenticated",
      "[ok] films_ytd=37 genre_fav=Drame",
      "[info] poster_wall rendered",
      "[ok] post-film debate.mode=enabled",
    ],
    metrics: [
      { label: "Films YTD", value: "37" },
      { label: "Genre fav.", value: "Drame" },
      { label: "Pass", value: "Duo" },
      { label: "Statut", value: "ACTIVE" },
    ],
    films: [
      {
        id: "disclosure-day",
        title: "Disclosure Day",
        year: "2026",
        poster: "/media/vera/cinema/posters/disclosure-day.jpg",
        synopsis:
          "Steven Spielberg revisitant le contact extraterrestre : une Amérique sous tension le jour où tout doit être révélé. Gros buzz, gros écran — petit frisson.",
        verdict: "Nul",
        verdictTone: "bad",
      },
      {
        id: "fight-club",
        title: "Fight Club",
        year: "1999",
        poster: "/media/vera/cinema/posters/fight-club.jpg",
        synopsis:
          "Reprise « Il était une fois » : soap, savon et double vie. Fincher en salle obscure, comme la première fois.",
        verdict: "Classique",
        verdictTone: "classic",
        series: "Il était une fois",
      },
      {
        id: "interstellar",
        title: "Interstellar",
        year: "2014",
        poster: "/media/vera/cinema/posters/interstellar.jpg",
        synopsis:
          "Toujours dans la série Pathé : blé, trous noirs et bande-son Zimmer. On y retourne pour le format, on reste pour Cooper.",
        verdict: "Classique",
        verdictTone: "classic",
        series: "Il était une fois",
      },
      {
        id: "la-la-land",
        title: "La La Land",
        year: "2016",
        poster: "/media/vera/cinema/posters/la-la-land.jpg",
        synopsis:
          "Dernière des trois séances « Il était une fois » : jazz, Hollywood et refrains qu’on fredonne en sortant.",
        verdict: "Classique",
        verdictTone: "classic",
        series: "Il était une fois",
      },
      {
        id: "comedie-francaise",
        title: "Comédie-Française",
        year: "2026",
        poster: "/media/vera/cinema/posters/comedie-francaise.jpg",
        synopsis:
          "La troupe au cinéma : plateau, diction, rideau. Une capture scénique qui rappelle que le grand écran peut aussi être une salle de théâtre.",
        verdict: "Super !",
        verdictTone: "good",
      },
      {
        id: "odyssee",
        title: "L'Odyssée",
        originalTitle: "The Odyssey",
        year: "2026",
        poster: "/media/vera/cinema/posters/odyssee.jpg",
        synopsis:
          "Christopher Nolan adapte Homère en IMAX : Ulysse, monstres et retour vers Ithaque. Épique, dense, fait pour la salle.",
        verdict: "Super !",
        verdictTone: "good",
      },
      {
        id: "the-drama",
        title: "The Drama",
        year: "2026",
        poster: "/media/vera/cinema/posters/the-drama.jpg",
        synopsis:
          "Kristoffer Borgli, Zendaya & Robert Pattinson : un couple « parfait » qui bascule dans le chaos d’une fausse rupture. Ironie sèche, romance tordue.",
        verdict: "Ok",
        verdictTone: "ok",
      },
      {
        id: "aigles-republique",
        title: "Les Aigles de la République",
        originalTitle: "Eagles of the Republic",
        year: "2025",
        poster: "/media/vera/cinema/posters/aigles-republique.jpg",
        synopsis:
          "Tarik Saleh referme sa trilogie du Caire : thriller politique, loyautés floues, pouvoir qui grince. Solide, sans miracle.",
        verdict: "Ok",
        verdictTone: "ok",
      },
      {
        id: "la-grazia",
        title: "La grazia",
        year: "2025",
        poster: "/media/vera/cinema/posters/la-grazia.jpg",
        synopsis:
          "Paolo Sorrentino & Toni Servillo : un président italien face à sa conscience, la loi et la fin de mandat. Élégant, drôle, profondément humain.",
        verdict: "Vraiment top !",
        verdictTone: "great",
      },
      {
        id: "nuremberg",
        title: "Nuremberg",
        year: "2025",
        poster: "/media/vera/cinema/posters/nuremberg.jpg",
        synopsis:
          "James Vanderbilt sur les procès de Nuremberg : psychologie, histoire, et la question de regarder le mal en face. Pas du divertissement — du nécessaire.",
        verdict: "D'utilité publique",
        verdictTone: "essential",
      },
      {
        id: "jumpers",
        title: "Jumpers",
        originalTitle: "Hoppers",
        year: "2026",
        poster: "/media/vera/cinema/posters/jumpers.jpg",
        synopsis:
          "Pixar : conscience humaine branchée dans des animaux robots. Mabel explore le monde animal de l’intérieur — fun, malin, très « on y va pour le popcorn ».",
        verdict: "Animation",
        verdictTone: "good",
        series: "Dessins animés",
      },
      {
        id: "zootopie-2",
        title: "Zootopie 2",
        originalTitle: "Zootopia 2",
        year: "2025",
        poster: "/media/vera/cinema/posters/zootopie-2.jpg",
        synopsis:
          "Judy et Nick de retour dans une Zootopie toujours trop grande pour ses préjugés. Suite Disney Animation, rythme cartoon garanti.",
        verdict: "Animation",
        verdictTone: "good",
        series: "Dessins animés",
      },
    ],
  },
];

export function getVeraModule(id: string): VeraModule | undefined {
  return veraModules.find((m) => m.id === id);
}

export const veraStatusLabel: Record<VeraStatus, string> = {
  applied: "APPLIED",
  running: "RUNNING",
  active: "ACTIVE",
};

export const veraVerdictLabel: Record<VeraFilmVerdictTone, string> = {
  bad: "NUL",
  ok: "OK",
  good: "SUPER",
  great: "TOP",
  essential: "UTILE",
  classic: "CLASSIC",
};
