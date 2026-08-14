import type { AppMeta } from "./types";

/** Apps shown in dock / mobile home. Browser is launched from Pro only. */
export const APPS: AppMeta[] = [
  {
    id: "career",
    name: "Pro",
    shortName: "Pro",
    icon: "✦",
    accent: "var(--vos-sky)",
    description: "Activités pro — fiches & sites",
    defaultSize: { width: 720, height: 560 },
  },
  {
    id: "vera",
    name: "Vera",
    shortName: "Vera",
    icon: "♥",
    accent: "var(--vos-rose)",
    description: "Patch Vera — couple, nature & cinéma",
    defaultSize: { width: 700, height: 540 },
  },
  {
    id: "travel",
    name: "Voyages",
    shortName: "Voyages",
    icon: "✈",
    accent: "var(--vos-teal)",
    description: "Où on a posé les pieds",
    defaultSize: { width: 720, height: 540 },
  },
  {
    id: "metrics",
    name: "Passions",
    shortName: "Passions",
    icon: "⚽",
    accent: "var(--vos-success)",
    description: "Foot, Mondial, ping & Bretagne",
    defaultSize: { width: 760, height: 580 },
  },
  {
    id: "lab",
    name: "Labo",
    shortName: "Labo",
    icon: "🍄",
    accent: "var(--vos-amber)",
    description: "htop perso — processus en cours",
    defaultSize: { width: 700, height: 540 },
  },
  {
    id: "gallery",
    name: "Galerie",
    shortName: "Photos",
    icon: "▣",
    accent: "var(--vos-copper)",
    description: "Albums photos — Voyages & Vera",
    defaultSize: { width: 820, height: 600 },
  },
];

export const BROWSER_APP: AppMeta = {
  id: "browser",
  name: "Navigateur",
  shortName: "Web",
  icon: "◎",
  accent: "var(--vos-info)",
  description: "Site ouvert depuis Pro",
  defaultSize: { width: 860, height: 600 },
};

export const APP_BY_ID = Object.fromEntries(
  [...APPS, BROWSER_APP].map((app) => [app.id, app]),
) as Record<AppMeta["id"], AppMeta>;

export const MIN_WINDOW = { width: 340, height: 260 };

export const ALL_APP_IDS = [
  ...APPS.map((a) => a.id),
  "browser" as const,
];
