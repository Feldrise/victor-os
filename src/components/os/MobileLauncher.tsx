"use client";

import { motion } from "motion/react";
import { APPS, APP_BY_ID } from "@/content/apps";
import { useDesktop } from "./DesktopContext";
import { AppContent } from "@/components/apps/AppContent";

export function MobileLauncher() {
  const {
    isMobile,
    mobileApp,
    openApp,
    setMobileApp,
    closeApp,
    browserTarget,
  } = useDesktop();

  if (!isMobile) return null;

  if (mobileApp) {
    const meta = APP_BY_ID[mobileApp];
    const title =
      mobileApp === "browser" && browserTarget
        ? browserTarget.title
        : meta.name;
    return (
      <div className="absolute inset-x-0 top-10 bottom-0 z-40 flex flex-col bg-[var(--vos-bg)] pb-24">
        <div className="flex h-12 shrink-0 items-center gap-3 border-b border-[var(--vos-border)] bg-[var(--vos-elevated)] px-3">
          <button
            type="button"
            onClick={() => {
              closeApp(mobileApp);
              setMobileApp(null);
            }}
            className="text-sm text-[var(--vos-rose)]"
          >
            ← Accueil
          </button>
          <span className="truncate text-sm text-[var(--vos-text)]">{title}</span>
        </div>
        <div
          className={`min-h-0 flex-1 ${
            mobileApp === "browser" ? "overflow-hidden" : "vos-scroll overflow-auto"
          }`}
        >
          <AppContent id={mobileApp} />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 top-10 bottom-0 z-30 overflow-auto px-4 py-6 pb-28">
      <p className="mb-1 font-[family-name:var(--font-instrument)] text-3xl text-[var(--vos-rose)]">
        Explore
      </p>
      <p className="mb-6 text-sm text-[var(--vos-muted)]">
        Choisis une pièce de l&apos;année — le bot reste en bas à droite.
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
            className="flex flex-col items-start gap-2 rounded-2xl border border-[var(--vos-border)] bg-[var(--vos-panel)]/80 p-4 text-left backdrop-blur-sm"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--vos-border)] bg-[var(--vos-elevated)] text-xl text-[var(--vos-rose)]">
              {app.icon}
            </span>
            <span className="text-sm text-[var(--vos-text)]">{app.shortName}</span>
            <span className="text-[11px] leading-snug text-[var(--vos-dim)]">
              {app.description}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
