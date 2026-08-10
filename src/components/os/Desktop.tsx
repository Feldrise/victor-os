"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { DesktopProvider, useDesktop } from "./DesktopContext";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { WindowFrame } from "./WindowFrame";
import { MobileLauncher } from "./MobileLauncher";
import { BootSequence } from "./BootSequence";
import { AppContent } from "@/components/apps/AppContent";
import type { AppId } from "@/content/types";

const APP_IDS: AppId[] = ["career", "vera", "travel", "metrics", "lab", "bot"];

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
      <div className="vos-grid-overlay pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute top-[18%] left-[12%] h-40 w-40 rounded-full bg-[var(--vos-amber)]/10 blur-3xl vos-uptime-pulse" />
      <div className="pointer-events-none absolute right-[10%] bottom-[22%] h-52 w-52 rounded-full bg-[var(--vos-copper)]/10 blur-3xl" />

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
              {/* Desktop icons */}
              <div className="absolute top-6 left-5 z-10 flex flex-col gap-4">
                {(
                  [
                    ["career", "Career"],
                    ["bot", "VictorBot"],
                    ["travel", "Map"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onDoubleClick={() => openApp(id)}
                    onClick={() => openApp(id)}
                    className="group flex w-20 flex-col items-center gap-1 rounded-lg p-2 hover:bg-white/5"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--vos-border)] bg-[var(--vos-panel)]/80 font-mono text-lg text-[var(--vos-amber)] shadow-lg">
                      {id === "career" ? "⌘" : id === "bot" ? "⟩" : "◎"}
                    </span>
                    <span className="text-center font-mono text-[10px] text-[var(--vos-muted)] group-hover:text-[var(--vos-text)]">
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="pointer-events-none select-none text-center opacity-[0.07]">
                  <p className="font-[family-name:var(--font-instrument)] text-7xl text-[var(--vos-text)] md:text-8xl">
                    VictorOS
                  </p>
                  <p className="mt-2 font-mono text-sm tracking-[0.35em] text-[var(--vos-text)] uppercase">
                    2026.08
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
      </div>
    </div>
  );
}

export function Desktop() {
  return (
    <DesktopProvider>
      <DesktopInner />
    </DesktopProvider>
  );
}
