export type AppId =
  | "career"
  | "vera"
  | "travel"
  | "metrics"
  | "lab"
  | "gallery"
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

export type GalleryPhoto = {
  id: string;
  src: string;
  caption: string;
  placeholder?: boolean;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  source: "travel" | "vera";
  photos: GalleryPhoto[];
};

export type GalleryTarget = {
  album: GalleryAlbum;
  index: number;
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
