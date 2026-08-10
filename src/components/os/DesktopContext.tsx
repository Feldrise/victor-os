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
import { APP_BY_ID } from "@/content/apps";
import type { AppId, WindowState } from "@/content/types";

type DesktopContextValue = {
  windows: WindowState[];
  activeId: AppId | null;
  isMobile: boolean;
  mobileApp: AppId | null;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  moveWindow: (id: AppId, x: number, y: number) => void;
  setMobileApp: (id: AppId | null) => void;
  setIsMobile: (v: boolean) => void;
};

const DesktopContext = createContext<DesktopContextValue | null>(null);

function defaultWindows(): WindowState[] {
  const ids: AppId[] = ["career", "vera", "travel", "metrics", "lab", "bot"];
  return ids.map((id, i) => {
    const meta = APP_BY_ID[id];
    return {
      id,
      open: false,
      minimized: false,
      maximized: false,
      zIndex: i + 1,
      x: 48 + i * 28,
      y: 56 + i * 24,
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
    [focusApp, isMobile],
  );

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, open: false, minimized: false } : w)),
    );
    setActiveId((current) => (current === id ? null : current));
    setMobileApp((current) => (current === id ? null : current));
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

  const value = useMemo(
    () => ({
      windows,
      activeId,
      isMobile,
      mobileApp,
      openApp,
      closeApp,
      minimizeApp,
      focusApp,
      toggleMaximize,
      moveWindow,
      setMobileApp,
      setIsMobile,
    }),
    [
      windows,
      activeId,
      isMobile,
      mobileApp,
      openApp,
      closeApp,
      minimizeApp,
      focusApp,
      toggleMaximize,
      moveWindow,
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
