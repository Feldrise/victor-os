"use client";

import { motion } from "motion/react";
import { APPS, BROWSER_APP } from "@/content/apps";
import { useDesktop } from "./DesktopContext";
import { AppIcon } from "./AppIcon";

export function Dock() {
  const { openApp, windows, activeId, isMobile, mobileApp, browserTarget } =
    useDesktop();

  if (isMobile) return null;

  const browserWin = windows.find((w) => w.id === "browser");
  const showBrowser = Boolean(
    browserTarget && browserWin && (browserWin.open || browserWin.minimized),
  );

  const dockApps = showBrowser ? [...APPS, BROWSER_APP] : APPS;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-5 z-50 flex justify-center px-4 pr-44">
      <nav className="vos-dock-glass pointer-events-auto flex items-end gap-1.5 rounded-2xl px-2.5 py-2">
        {dockApps.map((app) => {
          const win = windows.find((w) => w.id === app.id);
          const isOpen = win?.open && !win.minimized;
          const isActive = activeId === app.id || mobileApp === app.id;

          return (
            <motion.button
              key={app.id}
              type="button"
              whileHover={{ y: -8, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => openApp(app.id)}
              className="group relative flex w-14 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[var(--vos-text)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--vos-amber)]"
              title={
                app.id === "browser" && browserTarget
                  ? browserTarget.title
                  : app.name
              }
            >
              <span
                className={`relative transition-[filter] ${
                  isActive ? "brightness-110 drop-shadow-md" : "group-hover:brightness-110"
                }`}
                style={
                  isActive
                    ? { filter: `drop-shadow(0 0 8px ${app.accent})` }
                    : undefined
                }
              >
                <AppIcon id={app.id} size="md" />
              </span>
              <span className="max-w-full truncate text-[9px] text-[var(--vos-dim)] group-hover:text-[var(--vos-muted)]">
                {app.id === "browser" && browserTarget
                  ? browserTarget.title
                  : app.shortName}
              </span>
              {(isOpen || win?.minimized) && (
                <span
                  className="absolute bottom-0.5 h-0.5 w-3 rounded-full"
                  style={{
                    background: win?.minimized
                      ? "var(--vos-dim)"
                      : app.accent,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
