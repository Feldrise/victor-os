"use client";

import { motion } from "motion/react";
import { APPS } from "@/content/apps";
import { useDesktop } from "./DesktopContext";

export function Dock() {
  const { openApp, windows, activeId, isMobile, mobileApp } = useDesktop();

  if (isMobile) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <nav className="vos-dock-glass pointer-events-auto flex items-end gap-1 rounded-2xl px-2 py-2">
        {APPS.map((app) => {
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
              className="group relative flex w-14 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[var(--vos-text)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--vos-amber)]"
              title={app.name}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl border font-mono text-lg transition-colors ${
                  isActive
                    ? "border-[var(--vos-amber)] bg-[rgba(232,160,74,0.18)] text-[var(--vos-amber)]"
                    : "border-[var(--vos-border)] bg-[var(--vos-panel)] text-[var(--vos-muted)] group-hover:border-[var(--vos-copper)] group-hover:text-[var(--vos-text)]"
                }`}
              >
                {app.icon}
              </span>
              <span className="max-w-full truncate font-mono text-[9px] text-[var(--vos-dim)] group-hover:text-[var(--vos-muted)]">
                {app.shortName}
              </span>
              {(isOpen || win?.minimized) && (
                <span
                  className={`absolute bottom-0.5 h-0.5 w-3 rounded-full ${
                    win?.minimized ? "bg-[var(--vos-dim)]" : "bg-[var(--vos-amber)]"
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
