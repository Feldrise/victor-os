export type AppId =
  | "career"
  | "vera"
  | "travel"
  | "metrics"
  | "lab"
  | "bot";

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
