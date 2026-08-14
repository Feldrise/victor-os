"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_WALLPAPER,
  getWallpaper,
  NSFW_CONSENT_STORAGE_KEY,
  WALLPAPER_STORAGE_KEY,
  type WallpaperId,
  type WallpaperMeta,
} from "@/content/wallpapers";

type WallpaperContextValue = {
  wallpaperId: WallpaperId;
  wallpaper: WallpaperMeta;
  nsfwConsent: boolean;
  setWallpaper: (id: WallpaperId) => void;
  acceptNsfw: () => void;
  /** Switch away from mature wallpaper (to default) */
  declineNsfw: () => void;
};

const WallpaperContext = createContext<WallpaperContextValue | null>(null);
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function writeCookie(key: string, value: string) {
  document.cookie = `${key}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function applyWallpaper(id: WallpaperId) {
  window.localStorage.setItem(WALLPAPER_STORAGE_KEY, id);
  writeCookie(WALLPAPER_STORAGE_KEY, id);
}

function applyNsfwConsent(accepted: boolean) {
  const value = accepted ? "1" : "0";
  window.localStorage.setItem(NSFW_CONSENT_STORAGE_KEY, value);
  writeCookie(NSFW_CONSENT_STORAGE_KEY, value);
}

export function WallpaperProvider({
  children,
  initialWallpaper = DEFAULT_WALLPAPER,
  initialNsfwConsent = false,
}: {
  children: ReactNode;
  initialWallpaper?: WallpaperId;
  initialNsfwConsent?: boolean;
}) {
  const [wallpaperId, setWallpaperId] = useState<WallpaperId>(initialWallpaper);
  const [nsfwConsent, setNsfwConsent] = useState(initialNsfwConsent);

  const setWallpaper = useCallback((id: WallpaperId) => {
    setWallpaperId(id);
    applyWallpaper(id);
  }, []);

  const acceptNsfw = useCallback(() => {
    setNsfwConsent(true);
    applyNsfwConsent(true);
  }, []);

  const declineNsfw = useCallback(() => {
    setWallpaperId(DEFAULT_WALLPAPER);
    applyWallpaper(DEFAULT_WALLPAPER);
  }, []);

  const wallpaper = useMemo(() => getWallpaper(wallpaperId), [wallpaperId]);

  const value = useMemo(
    () => ({
      wallpaperId,
      wallpaper,
      nsfwConsent,
      setWallpaper,
      acceptNsfw,
      declineNsfw,
    }),
    [wallpaperId, wallpaper, nsfwConsent, setWallpaper, acceptNsfw, declineNsfw],
  );

  return (
    <WallpaperContext.Provider value={value}>{children}</WallpaperContext.Provider>
  );
}

export function useWallpaper() {
  const ctx = useContext(WallpaperContext);
  if (!ctx) throw new Error("useWallpaper must be used within WallpaperProvider");
  return ctx;
}
