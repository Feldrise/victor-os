import type { AppMeta } from "./types";

/** Apps shown in dock / mobile home. Browser is launched from Pro only. */
export const APPS: AppMeta[] = [
  {
    id: "career",
    name: "Pro",
    shortName: "Pro",
    icon: "✦",
    description: "Activités pro — fiches & sites",
    defaultSize: { width: 720, height: 560 },
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

export const BROWSER_APP: AppMeta = {
  id: "browser",
  name: "Navigateur",
  shortName: "Web",
  icon: "◎",
  description: "Site ouvert depuis Pro",
  defaultSize: { width: 860, height: 600 },
};

export const APP_BY_ID = Object.fromEntries(
  [...APPS, BROWSER_APP].map((app) => [app.id, app]),
) as Record<(typeof APPS)[number]["id"] | "browser", AppMeta>;

export const MIN_WINDOW = { width: 340, height: 260 };

export const ALL_APP_IDS = [
  ...APPS.map((a) => a.id),
  "browser" as const,
];
