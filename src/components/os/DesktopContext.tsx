"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { APP_BY_ID, MIN_WINDOW, ALL_APP_IDS } from "@/content/apps";
import type {
  AppId,
  BrowserTarget,
  GalleryTarget,
  ResizeEdge,
  WindowState,
} from "@/content/types";

type DesktopContextValue = {
  windows: WindowState[];
  activeId: AppId | null;
  isMobile: boolean;
  mobileApp: AppId | null;
  botOpen: boolean;
  browserTarget: BrowserTarget | null;
  galleryTarget: GalleryTarget | null;
  openApp: (id: AppId) => void;
  openBrowser: (target: BrowserTarget) => void;
  openGallery: (target: GalleryTarget) => void;
  clearGalleryTarget: () => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  moveWindow: (id: AppId, x: number, y: number) => void;
  resizeWindow: (
    id: AppId,
    next: Pick<WindowState, "x" | "y" | "width" | "height">,
  ) => void;
  setMobileApp: (id: AppId | null) => void;
  setIsMobile: (v: boolean) => void;
  setBotOpen: (open: boolean) => void;
  toggleBot: () => void;
};

const DesktopContext = createContext<DesktopContextValue | null>(null);

function defaultWindows(): WindowState[] {
  return ALL_APP_IDS.map((id, i) => {
    const meta = APP_BY_ID[id];
    const isBrowser = id === "browser";
    return {
      id,
      open: false,
      minimized: false,
      maximized: false,
      zIndex: i + 1,
      x: isBrowser ? 120 : 56 + i * 32,
      y: isBrowser ? 72 : 64 + i * 28,
      width: meta.defaultSize.width,
      height: meta.defaultSize.height,
    };
  });
}

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>(defaultWindows);
  const [activeId, setActiveId] = useState<AppId | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileApp, setMobileApp] = useState<AppId | null>(null);
  const [botOpen, setBotOpen] = useState(false);
  const [browserTarget, setBrowserTarget] = useState<BrowserTarget | null>(
    null,
  );
  const [galleryTarget, setGalleryTarget] = useState<GalleryTarget | null>(
    null,
  );
  const zCounter = useRef(10);

  const focusApp = useCallback((id: AppId) => {
    zCounter.current += 1;
    const next = zCounter.current;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: next, minimized: false } : w)),
    );
    setActiveId(id);
  }, []);

  const openApp = useCallback(
    (id: AppId) => {
      if (id === "browser" && !browserTarget) return;
      if (id === "gallery") setGalleryTarget(null);
      if (isMobile) {
        setMobileApp(id);
        setActiveId(id);
        return;
      }
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, open: true, minimized: false } : w,
        ),
      );
      focusApp(id);
    },
    [browserTarget, focusApp, isMobile],
  );

  const openBrowser = useCallback(
    (target: BrowserTarget) => {
      setBrowserTarget(target);
      if (isMobile) {
        setMobileApp("browser");
        setActiveId("browser");
        return;
      }
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id !== "browser") return w;
          const career = prev.find((c) => c.id === "career");
          const offsetX = career ? career.x + 48 : w.x;
          const offsetY = career ? career.y + 36 : w.y;
          return {
            ...w,
            open: true,
            minimized: false,
            x: Math.min(offsetX, Math.max(40, window.innerWidth - w.width - 24)),
            y: Math.min(offsetY, Math.max(48, window.innerHeight - w.height - 120)),
          };
        }),
      );
      focusApp("browser");
    },
    [focusApp, isMobile],
  );

  const openGallery = useCallback(
    (target: GalleryTarget) => {
      const photos = target.album.photos;
      if (photos.length === 0) return;
      const index = Math.min(
        Math.max(0, target.index),
        photos.length - 1,
      );
      setGalleryTarget({ album: target.album, index });
      if (isMobile) {
        setMobileApp("gallery");
        setActiveId("gallery");
        return;
      }
      setWindows((prev) =>
        prev.map((w) =>
          w.id === "gallery" ? { ...w, open: true, minimized: false } : w,
        ),
      );
      focusApp("gallery");
    },
    [focusApp, isMobile],
  );

  const clearGalleryTarget = useCallback(() => {
    setGalleryTarget(null);
  }, []);

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, open: false, minimized: false } : w)),
    );
    setActiveId((current) => (current === id ? null : current));
    setMobileApp((current) => (current === id ? null : current));
    if (id === "browser") setBrowserTarget(null);
    if (id === "gallery") setGalleryTarget(null);
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    );
    setActiveId((current) => (current === id ? null : current));
  }, []);

  const toggleMaximize = useCallback(
    (id: AppId) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)),
      );
      focusApp(id);
    },
    [focusApp],
  );

  const moveWindow = useCallback((id: AppId, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w)),
    );
  }, []);

  const resizeWindow = useCallback(
    (id: AppId, next: Pick<WindowState, "x" | "y" | "width" | "height">) => {
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id !== id) return w;
          return {
            ...w,
            x: Math.max(0, next.x),
            y: Math.max(40, next.y),
            width: Math.max(MIN_WINDOW.width, next.width),
            height: Math.max(MIN_WINDOW.height, next.height),
          };
        }),
      );
    },
    [],
  );

  const toggleBot = useCallback(() => {
    setBotOpen((o) => !o);
  }, []);

  const value = useMemo(
    () => ({
      windows,
      activeId,
      isMobile,
      mobileApp,
      botOpen,
      browserTarget,
      galleryTarget,
      openApp,
      openBrowser,
      openGallery,
      clearGalleryTarget,
      closeApp,
      minimizeApp,
      focusApp,
      toggleMaximize,
      moveWindow,
      resizeWindow,
      setMobileApp,
      setIsMobile,
      setBotOpen,
      toggleBot,
    }),
    [
      windows,
      activeId,
      isMobile,
      mobileApp,
      botOpen,
      browserTarget,
      galleryTarget,
      openApp,
      openBrowser,
      openGallery,
      clearGalleryTarget,
      closeApp,
      minimizeApp,
      focusApp,
      toggleMaximize,
      moveWindow,
      resizeWindow,
      toggleBot,
    ],
  );

  return (
    <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>
  );
}

export function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error("useDesktop must be used within DesktopProvider");
  return ctx;
}

/** Apply resize from an edge given pointer delta from drag start. */
export function computeResize(
  edge: ResizeEdge,
  start: { x: number; y: number; width: number; height: number },
  dx: number,
  dy: number,
) {
  let { x, y, width, height } = start;

  if (edge.includes("e")) width = start.width + dx;
  if (edge.includes("s")) height = start.height + dy;
  if (edge.includes("w")) {
    width = start.width - dx;
    x = start.x + dx;
  }
  if (edge.includes("n")) {
    height = start.height - dy;
    y = start.y + dy;
  }

  if (width < MIN_WINDOW.width) {
    if (edge.includes("w")) x = start.x + start.width - MIN_WINDOW.width;
    width = MIN_WINDOW.width;
  }
  if (height < MIN_WINDOW.height) {
    if (edge.includes("n")) y = start.y + start.height - MIN_WINDOW.height;
    height = MIN_WINDOW.height;
  }

  return { x, y, width, height };
}
