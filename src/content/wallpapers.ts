export type WallpaperId = "koala" | "retrouvailles" | "violet" | "boudoir";

export type WallpaperMeta = {
  id: WallpaperId;
  label: string;
  src: string;
  /** CSS object-position for framing */
  objectPosition?: string;
  /** Requires explicit NSFW consent before unblur */
  mature?: boolean;
};

export const DEFAULT_WALLPAPER: WallpaperId = "koala";

export const WALLPAPERS: readonly WallpaperMeta[] = [
  {
    id: "koala",
    label: "Fontaine",
    src: "/media/os/wallpaper-koala.png",
    objectPosition: "center 40%",
  },
  {
    id: "retrouvailles",
    label: "Retrouvailles",
    src: "/media/os/wallpaper-retrouvailles.png",
    objectPosition: "center 35%",
  },
  {
    id: "violet",
    label: "Violet",
    src: "/media/os/wallpaper-violet.png",
    objectPosition: "center center",
  },
  {
    id: "boudoir",
    label: "Boudoir",
    src: "/media/os/wallpaper-boudoir.png",
    objectPosition: "center 30%",
    mature: true,
  },
] as const;

export const WALLPAPER_STORAGE_KEY = "victoros-wallpaper";
export const NSFW_CONSENT_STORAGE_KEY = "victoros-wallpaper-nsfw-consent";

export function isWallpaperId(value: string | undefined): value is WallpaperId {
  return (
    value === "koala" ||
    value === "retrouvailles" ||
    value === "violet" ||
    value === "boudoir"
  );
}

export function resolveWallpaperId(value: string | undefined): WallpaperId {
  return isWallpaperId(value) ? value : DEFAULT_WALLPAPER;
}

export function resolveNsfwConsent(value: string | undefined): boolean {
  return value === "1";
}

export function getWallpaper(id: WallpaperId): WallpaperMeta {
  const found = WALLPAPERS.find((w) => w.id === id);
  return found ?? WALLPAPERS[0]!;
}
