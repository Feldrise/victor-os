"use client";

import { motion } from "motion/react";
import { APPS, BROWSER_APP } from "@/content/apps";
import { useDesktop } from "./DesktopContext";

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
      <nav className="vos-dock-glass pointer-events-auto flex items-end gap-1 rounded-2xl px-2.5 py-2">
        {dockApps.map((app) => {
          const win = windows.find((w) => w.id === app.id);
          const isOpen = win?.open && !win.minimized;
          const isActive = activeId === app.id || mobileApp === app.id;

          return (
            <motion.button
              key={app.id}
              type="button"
              whileHover={{ y: -6, scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openApp(app.id)}
              className="group relative flex w-14 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[var(--vos-text)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--vos-rose)]"
              title={
                app.id === "browser" && browserTarget
                  ? browserTarget.title
                  : app.name
              }
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-2xl border text-lg transition-colors ${
                  isActive
                    ? "border-[var(--vos-rose)] bg-[color-mix(in_srgb,var(--vos-rose)_22%,transparent)] text-[var(--vos-rose)]"
                    : "border-[var(--vos-border)] bg-[var(--vos-panel)] text-[var(--vos-muted)] group-hover:border-[var(--vos-copper)] group-hover:text-[var(--vos-text)]"
                }`}
              >
                {app.icon}
              </span>
              <span className="max-w-full truncate text-[9px] text-[var(--vos-dim)] group-hover:text-[var(--vos-muted)]">
                {app.id === "browser" && browserTarget
                  ? browserTarget.title
                  : app.shortName}
              </span>
              {(isOpen || win?.minimized) && (
                <span
                  className={`absolute bottom-0.5 h-0.5 w-3 rounded-full ${
                    win?.minimized ? "bg-[var(--vos-dim)]" : "bg-[var(--vos-rose)]"
                  }`}
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
