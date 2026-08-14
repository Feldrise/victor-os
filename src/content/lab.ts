export type LabStatus = "running" | "sleeping" | "idle";

export type LabProcess = {
  id: string;
  name: string;
  pid: number;
  cpu: number;
  mem: number;
  status: LabStatus;
  user: string;
  command: string;
  /** Short line shown in the selection pane */
  detail: string;
  accent: string;
  progress: number;
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
      "App de terrain pour saisir données champignons — tech × naturalisme (pont Vera / Balade EcoLogique).",
    accent: "#6bbf8a",
    progress: 42,
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
    accent: "#e8a04a",
    progress: 68,
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
    accent: "#7eb8da",
    progress: 100,
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
    accent: "#9aa3b5",
    progress: 100,
  },
];

export function getLabProcess(id: string): LabProcess | undefined {
  return labProcesses.find((p) => p.id === id);
}
