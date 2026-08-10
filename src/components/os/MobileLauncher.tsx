"use client";

import { motion } from "motion/react";
import { APPS, APP_BY_ID } from "@/content/apps";
import { useDesktop } from "./DesktopContext";
import { AppContent } from "@/components/apps/AppContent";

export function MobileLauncher() {
  const { isMobile, mobileApp, openApp, setMobileApp, closeApp } = useDesktop();

  if (!isMobile) return null;

  if (mobileApp) {
    const meta = APP_BY_ID[mobileApp];
    return (
      <div className="absolute inset-x-0 top-9 bottom-0 z-40 flex flex-col bg-[var(--vos-bg)]">
        <div className="flex h-12 shrink-0 items-center gap-3 border-b border-[var(--vos-border)] bg-[var(--vos-elevated)] px-3">
          <button
            type="button"
            onClick={() => {
              closeApp(mobileApp);
              setMobileApp(null);
            }}
            className="font-mono text-xs text-[var(--vos-amber)]"
          >
            ← Bureau
          </button>
          <span className="truncate font-mono text-sm text-[var(--vos-text)]">
            {meta.name}
          </span>
        </div>
        <div className="vos-scroll min-h-0 flex-1 overflow-auto">
          <AppContent id={mobileApp} />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 top-9 bottom-0 z-30 overflow-auto px-4 py-6">
      <p className="mb-1 font-[family-name:var(--font-instrument)] text-3xl text-[var(--vos-amber)]">
        Applications
      </p>
      <p className="mb-6 font-mono text-xs text-[var(--vos-muted)]">
        Explore le changelog 2026.08
      </p>
      <div className="grid grid-cols-2 gap-3">
        {APPS.map((app, i) => (
          <motion.button
            key={app.id}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => openApp(app.id)}
            className="flex flex-col items-start gap-2 rounded-2xl border border-[var(--vos-border)] bg-[var(--vos-panel)] p-4 text-left"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--vos-border)] bg-[var(--vos-elevated)] font-mono text-xl text-[var(--vos-amber)]">
              {app.icon}
            </span>
            <span className="font-mono text-sm text-[var(--vos-text)]">{app.shortName}</span>
            <span className="font-mono text-[10px] leading-snug text-[var(--vos-dim)]">
              {app.description}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
