export type LabProcess = {
  id: string;
  name: string;
  pid: number;
  cpu: number;
  mem: number;
  status: "running" | "sleeping" | "idle";
  user: string;
  command: string;
  detail: string;
};

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
      "Blueprint et développement continu d'une application de terrain pour saisir des données sur les champignons — tech × naturalisme.",
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
      "Workflows Linux / Docker Compose / i3wm + expérimentations de modèles de langage en local. L'infra personnelle reste un terrain de jeu.",
  },
  {
    id: "eclipse",
    name: "eclipse-tracker",
    pid: 8192,
    cpu: 12.4,
    mem: 8.1,
    status: "sleeping",
    user: "victor",
    command: " astro watch --solar-eclipse 2026-08",
    detail:
      "Suivi de l'éclipse solaire d'août 2026. Repérage des meilleurs spots d'observation entre la France et la Suisse.",
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
    detail: "Socle d'administration : tout le lab tourne dessus.",
  },
];
