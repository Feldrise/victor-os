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
  icon: string;
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
