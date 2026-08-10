"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { DesktopProvider, useDesktop } from "./DesktopContext";
import { ThemeProvider } from "./ThemeProvider";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { WindowFrame } from "./WindowFrame";
import { MobileLauncher } from "./MobileLauncher";
import { BootSequence } from "./BootSequence";
import { WallpaperArt } from "./WallpaperArt";
import { BotCompanion } from "./BotCompanion";
import { AppContent } from "@/components/apps/AppContent";
import type { AppId, ThemeMode } from "@/content/types";

const APP_IDS: AppId[] = ["career", "vera", "travel", "metrics", "lab"];

function DesktopInner() {
  const { setIsMobile, isMobile, openApp } = useDesktop();
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [setIsMobile]);

  return (
    <div className="vos-wallpaper vos-grain relative h-dvh w-full overflow-hidden">
      <WallpaperArt />

      {!booted && <BootSequence onDone={() => setBooted(true)} />}

      <div
        className={`relative flex h-full flex-col transition-opacity duration-500 ${
          booted ? "opacity-100" : "opacity-0"
        }`}
      >
        <MenuBar />

        <div className="relative min-h-0 flex-1">
          {!isMobile && (
            <>
              <div className="absolute top-6 left-5 z-10 flex flex-col gap-3">
                {(
                  [
                    ["career", "Pro", "✦"],
                    ["vera", "Vera", "♥"],
                    ["travel", "Voyages", "✈"],
                  ] as const
                ).map(([id, label, icon]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => openApp(id)}
                    className="group flex w-20 flex-col items-center gap-1 rounded-xl p-2 hover:bg-white/10"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--vos-border)] bg-[var(--vos-panel)]/70 text-xl text-[var(--vos-rose)] shadow-md backdrop-blur-sm">
                      {icon}
                    </span>
                    <span className="text-center text-[11px] text-[var(--vos-muted)] group-hover:text-[var(--vos-text)]">
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="pointer-events-none select-none text-center opacity-[0.12]">
                  <p className="font-[family-name:var(--font-instrument)] text-6xl text-[var(--vos-text)] md:text-7xl">
                    Retrouvailles
                  </p>
                  <p className="mt-2 text-sm tracking-[0.25em] text-[var(--vos-text)] uppercase">
                    Été 2026
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {APP_IDS.map((id) => (
                  <WindowFrame key={id} id={id}>
                    <AppContent id={id} />
                  </WindowFrame>
                ))}
              </AnimatePresence>
            </>
          )}

          <MobileLauncher />
        </div>

        <Dock />
        <BotCompanion />
      </div>
    </div>
  );
}

export function Desktop({ initialTheme = "dark" }: { initialTheme?: ThemeMode }) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <DesktopProvider>
        <DesktopInner />
      </DesktopProvider>
    </ThemeProvider>
  );
}
