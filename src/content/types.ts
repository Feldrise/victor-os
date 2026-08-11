export type AppId =
  | "career"
  | "vera"
  | "travel"
  | "metrics"
  | "lab"
  | "browser";

export type ThemeMode = "dark" | "light";

export type WindowState = {
  id: AppId;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type AppMeta = {
  id: AppId;
  name: string;
  shortName: string;
  /** Fallback glyph when image icons are unavailable */
  icon: string;
  /** Per-app accent used for focus rings / open dots */
  accent: string;
  description: string;
  defaultSize: { width: number; height: number };
};

export type BrowserTarget = {
  activityId: string;
  title: string;
  url: string;
  accent: string;
  embedAllowed?: boolean;
};

export type ResizeEdge =
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw";
