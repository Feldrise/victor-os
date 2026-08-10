import type { AppMeta } from "./types";

export const APPS: AppMeta[] = [
  {
    id: "career",
    name: "Pro",
    shortName: "Pro",
    icon: "✦",
    description: "Ce qui a changé côté boulot",
    defaultSize: { width: 640, height: 520 },
  },
  {
    id: "vera",
    name: "Vera",
    shortName: "Vera",
    icon: "♥",
    description: "Le patch le plus important de l'année",
    defaultSize: { width: 560, height: 480 },
  },
  {
    id: "travel",
    name: "Voyages",
    shortName: "Voyages",
    icon: "✈",
    description: "Où on a posé les pieds",
    defaultSize: { width: 720, height: 540 },
  },
  {
    id: "metrics",
    name: "Passions",
    shortName: "Passions",
    icon: "⚽",
    description: "Foot, ping-pong & racines",
    defaultSize: { width: 680, height: 500 },
  },
  {
    id: "lab",
    name: "Labo",
    shortName: "Labo",
    icon: "🍄",
    description: "Projets perso en cours",
    defaultSize: { width: 620, height: 460 },
  },
];

export const APP_BY_ID = Object.fromEntries(
  APPS.map((app) => [app.id, app]),
) as Record<(typeof APPS)[number]["id"], AppMeta>;

export const MIN_WINDOW = { width: 340, height: 260 };
