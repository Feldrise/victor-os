export type LabStatus = "running" | "sleeping" | "idle";

export type LabPhoto = {
  id: string;
  src: string;
  caption: string;
  placeholder?: boolean;
};

export type LabMetric = {
  label: string;
  value: string;
};

export type LabChangelog = {
  date: string;
  title: string;
  detail: string;
};

export type LabSpot = {
  id: string;
  name: string;
  region: string;
  note: string;
};

export type LabProcess = {
  id: string;
  name: string;
  pid: number;
  cpu: number;
  mem: number;
  status: LabStatus;
  user: string;
  command: string;
  /** Short line shown in overview selection pane */
  detail: string;
  /** Full project narrative — detail view */
  title: string;
  tagline: string;
  body: string;
  accent: string;
  stack: string[];
  progress: number;
  features: string[];
  changelog: LabChangelog[];
  metrics?: LabMetric[];
  gallery?: LabPhoto[];
  /** Eclipse observation spots */
  spots?: LabSpot[];
  /** Countdown target ISO date */
  targetDate?: string;
  /** When false, overview can open but detail is lighter (infra daemon) */
  hasDeepDive: boolean;
};

function ph(projectId: string, photoId: string, caption: string): LabPhoto {
  return {
    id: photoId,
    src: `/media/lab/${projectId}/${photoId}.jpg`,
    caption,
    placeholder: true,
  };
}

export const labProcesses: LabProcess[] = [
  {
    id: "myco",
    name: "mycology-app",
    pid: 2048,
    cpu: 34.2,
    mem: 28.5,
    status: "running",
    user: "victor",
    command: "node ./apps/mycology --field-mode",
    detail:
      "App de terrain pour saisir données champignons — tech × naturalisme (pont Vera / Balade EcoLogique).",
    title: "Mycology App",
    tagline: "Carnet de terrain digital — géoloc, photo, confiance ID",
    body: "Blueprint né des balades avec Vera : trop de notes papier humides, trop de photos orphelines. L’app vise la saisie rapide en forêt — espèce candidate, habitat, GPS, photo, niveau de confiance — puis sync quand le réseau revient. Stack mobile-first, mode offline, et un œil sur Balade EcoLogique pour un éventuel partage guide. Ce n’est plus un toy : c’est le compagnon des forays.",
    accent: "#6bbf8a",
    stack: ["React Native", "SQLite", "Expo", "MapLibre", "TypeScript"],
    progress: 42,
    features: [
      "Saisie offline : espèce, habitat, notes, confiance ID",
      "Photo + géoloc attachées à chaque observation",
      "Filtre par sortie / saison / lieu",
      "Export CSV pour carnets & partage Vera",
      "Roadmap : suggestions ID assistées (modèle léger)",
    ],
    changelog: [
      {
        date: "2025-11-02",
        title: "Brief terrain",
        detail: "Liste de champs dictée sous la pluie — v0 schema figé.",
      },
      {
        date: "2026-01-18",
        title: "Prototype offline",
        detail: "SQLite + file photos locale. Sync stub.",
      },
      {
        date: "2026-04-10",
        title: "Carte des sorties",
        detail: "MapLibre + pins par observation. Beta interne.",
      },
      {
        date: "2026-06-22",
        title: "Export CSV",
        detail: "Première livraison utilisable après une foray Tessin.",
      },
    ],
    metrics: [
      { label: "Progress", value: "42%" },
      { label: "Obs. test", value: "87" },
      { label: "Mode", value: "FIELD" },
      { label: "Statut", value: "RUNNING" },
    ],
    gallery: [
      ph("myco", "ui-list", "Liste d’observations — mock UI"),
      ph("myco", "ui-map", "Carte des pins — mock UI"),
      ph("myco", "field", "Téléphone sous la pluie — vrai terrain"),
    ],
    hasDeepDive: true,
  },
  {
    id: "llm",
    name: "local-llm-lab",
    pid: 4096,
    cpu: 61.8,
    mem: 72.0,
    status: "running",
    user: "victor",
    command: "docker compose up ollama i3wm-stack",
    detail:
      "Workflows Linux / Docker / i3wm + expérimentations LLM locaux. Infra perso comme terrain de jeu.",
    title: "Local LLM Lab",
    tagline: "Ollama, compose, et le plaisir de tout faire tourner chez soi",
    body: "Le lab IA personnel : modèles locaux via Ollama, stacks Docker Compose, session i3wm dédiée. Objectif — prototyper agents et pipelines sans cloud obligatoire, comprendre les limites VRAM, et garder une hygiène ops (logs, volumes, restarts). C’est aussi le banc d’essai mental pour Katalyx : ce qu’on apprend ici nourrit les briefs Agents IA côté studio.",
    accent: "#e8a04a",
    stack: ["Ollama", "Docker Compose", "Linux", "i3wm", "Python", "CUDA"],
    progress: 68,
    features: [
      "Compose stack : ollama + UI légère + volumes modèles",
      "Scripts d’eval prompts / latence / tokens",
      "Session i3wm lab isolée du desktop quotidien",
      "Notes ADR perso sur choix de modèles",
      "Pont conceptuel → Agents IA Katalyx",
    ],
    changelog: [
      {
        date: "2025-09-01",
        title: "Première stack compose",
        detail: "Ollama + port exposé. RAM trop juste — leçons apprises.",
      },
      {
        date: "2025-12-14",
        title: "GPU passthrough propre",
        detail: "CUDA ok, modèles 7B fluides, 13B selon humeur.",
      },
      {
        date: "2026-03-05",
        title: "Bench prompts agents",
        detail: "Suite de tests pour workflows type AIFlow.",
      },
      {
        date: "2026-07-01",
        title: "Hygiene volumes",
        detail: "Backup modèles + prune images. Ops therapy.",
      },
    ],
    metrics: [
      { label: "Progress", value: "68%" },
      { label: "CPU load", value: "61%" },
      { label: "MEM", value: "72%" },
      { label: "Modèles", value: "6+" },
    ],
    gallery: [
      ph("llm", "compose", "docker compose ps — terminal"),
      ph("llm", "i3", "Workspace i3wm lab"),
      ph("llm", "bench", "Graph latence tokens — stub"),
    ],
    hasDeepDive: true,
  },
  {
    id: "eclipse",
    name: "eclipse-tracker",
    pid: 8192,
    cpu: 12.4,
    mem: 8.1,
    status: "sleeping",
    user: "victor",
    command: "astro watch --solar-eclipse 2026-08",
    detail:
      "Éclipse solaire août 2026 — repérage spots d’observation France / Suisse.",
    title: "Eclipse Tracker",
    tagline: "Countdown août 2026 — spots FR / CH, météo, logistique",
    body: "L’éclipse solaire d’août 2026 est le prochain grand événement ciel. Processus en sleeping la plupart du temps, mais le brief est clair : comparer couloirs de totalité / partialité entre France et Suisse, croiser météo historique, accessibilité, et calendrier Tessin. Objectif — être au bon endroit sans improviser le jour J. Vera est dans la boucle (logistique familiale + curiosité).",
    accent: "#7eb8da",
    stack: ["Notes", "Cartes", "Météo hist.", "Calendrier partagé"],
    progress: 55,
    features: [
      "Liste de spots candidats FR / CH",
      "Countdown vers la date cible",
      "Checklist optique / photo / transport",
      "Sync calendrier couple (Tessin août)",
      "Veille météo J-7 / J-1",
    ],
    changelog: [
      {
        date: "2025-10-01",
        title: "Watch créé",
        detail: "Issue ouverte : ne pas rater août 2026.",
      },
      {
        date: "2026-02-20",
        title: "Première shortlist spots",
        detail: "Trois zones CH, deux FR — à affiner.",
      },
      {
        date: "2026-05-15",
        title: "Croisement météo",
        detail: "Historique août — favoris mis à jour.",
      },
      {
        date: "2026-07-28",
        title: "Plan logistique",
        detail: "Train / voiture / lodging — draft final.",
      },
    ],
    metrics: [
      { label: "Progress", value: "55%" },
      { label: "Cible", value: "Août 26" },
      { label: "Spots", value: "5" },
      { label: "Statut", value: "SLEEP" },
    ],
    targetDate: "2026-08-12",
    spots: [
      {
        id: "sp1",
        name: "Crêtes tessinoises",
        region: "Suisse — Tessin",
        note: "Accès famille + altitude. Favori émotionnel.",
      },
      {
        id: "sp2",
        name: "Plateau jurassien",
        region: "Suisse — Jura",
        note: "Horizon dégagé, météo à surveiller.",
      },
      {
        id: "sp3",
        name: "Haute Loire / Massif",
        region: "France",
        note: "Option road-trip si le couloir le justifie.",
      },
      {
        id: "sp4",
        name: "Côté Alpes sud",
        region: "France — Alpes",
        note: "Plan B depuis corridor Aix.",
      },
      {
        id: "sp5",
        name: "Lac — observation douce",
        region: "Suisse — Maggiore",
        note: "Si partialité locale suffit + confort.",
      },
    ],
    gallery: [
      ph("eclipse", "map", "Carte couloir — placeholder"),
      ph("eclipse", "kit", "Checklist optique — stub"),
    ],
    hasDeepDive: true,
  },
  {
    id: "docker",
    name: "compose-daemon",
    pid: 1,
    cpu: 3.1,
    mem: 4.2,
    status: "idle",
    user: "root",
    command: "dockerd --host=unix:///var/run/docker.sock",
    detail: "Socle d’administration : tout le lab tourne dessus.",
    title: "Compose Daemon",
    tagline: "Le PID 1 du lab — discret, indispensable",
    body: "Pas un projet narratif : l’infra. Docker / Compose sous-tendent mycology-app, le LLM lab, et les expériences one-shot. Ce process reste en idle la plupart du temps — jusqu’au prochain `compose up`.",
    accent: "#9aa3b5",
    stack: ["Docker", "Compose", "Linux"],
    progress: 100,
    features: [
      "Runtime pour tous les services lab",
      "Volumes persistants modèles & data",
      "Réseau bridge isolé",
    ],
    changelog: [
      {
        date: "ongoing",
        title: "Toujours là",
        detail: "Uptime boring = uptime réussi.",
      },
    ],
    metrics: [
      { label: "Role", value: "PID 1" },
      { label: "CPU", value: "3%" },
      { label: "MEM", value: "4%" },
      { label: "Statut", value: "IDLE" },
    ],
    hasDeepDive: true,
  },
];

export function getLabProcess(id: string): LabProcess | undefined {
  return labProcesses.find((p) => p.id === id);
}

/** Days remaining until target (floor). Negative if past. */
export function daysUntil(isoDate: string, now = new Date()): number {
  const target = new Date(isoDate + "T12:00:00");
  const ms = target.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}
