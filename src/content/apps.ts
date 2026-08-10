import type { AppMeta } from "./types";

export const APPS: AppMeta[] = [
  {
    id: "career",
    name: "Career.app",
    shortName: "Career",
    icon: "⌘",
    description: "Release changelog & deployments",
    defaultSize: { width: 640, height: 520 },
  },
  {
    id: "vera",
    name: "PatchVera.app",
    shortName: "Vera",
    icon: "◆",
    description: "Major personal patch notes",
    defaultSize: { width: 560, height: 480 },
  },
  {
    id: "travel",
    name: "NetworkMap.app",
    shortName: "Map",
    icon: "◎",
    description: "Traffic routes & coordinates",
    defaultSize: { width: 720, height: 540 },
  },
  {
    id: "metrics",
    name: "Metrics.app",
    shortName: "Metrics",
    icon: "▦",
    description: "Physical & mental monitoring",
    defaultSize: { width: 680, height: 500 },
  },
  {
    id: "lab",
    name: "Lab.app",
    shortName: "Lab",
    icon: "⚛",
    description: "Background R&D processes",
    defaultSize: { width: 620, height: 460 },
  },
  {
    id: "bot",
    name: "VictorBot.app",
    shortName: "Bot",
    icon: "⟩",
    description: "Interrogate the year",
    defaultSize: { width: 480, height: 560 },
  },
];

export const APP_BY_ID = Object.fromEntries(
  APPS.map((app) => [app.id, app]),
) as Record<(typeof APPS)[number]["id"], AppMeta>;
