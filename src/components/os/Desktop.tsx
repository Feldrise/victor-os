"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { DesktopProvider, useDesktop } from "./DesktopContext";
import { ThemeProvider } from "./ThemeProvider";
import { WallpaperProvider, useWallpaper } from "./WallpaperProvider";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { WindowFrame } from "./WindowFrame";
import { MobileLauncher } from "./MobileLauncher";
import { BootSequence } from "./BootSequence";
import { WallpaperArt } from "./WallpaperArt";
import { WallpaperNsfwGate } from "./WallpaperNsfwGate";
import { BotCompanion } from "./BotCompanion";
import { AppIcon } from "./AppIcon";
import { AppContent } from "@/components/apps/AppContent";
import { ALL_APP_IDS } from "@/content/apps";
import type { WallpaperId } from "@/content/wallpapers";
import type { AppId, ThemeMode } from "@/content/types";

function DesktopInner() {
  const { setIsMobile, isMobile, openApp } = useDesktop();
  const { wallpaperId } = useWallpaper();
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
        className={`relative h-full transition-opacity duration-500 ${
          booted ? "opacity-100" : "opacity-0"
        }`}
      >
        <MenuBar />
        <WallpaperNsfwGate />

        <div className="absolute inset-0">
          {!isMobile && (
            <>
              <div className="absolute top-14 left-5 z-10 flex flex-col gap-3">
                {(
                  [
                    ["career", "Pro"],
                    ["vera", "Vera"],
                    ["travel", "Voyages"],
                  ] as const satisfies ReadonlyArray<readonly [AppId, string]>
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => openApp(id)}
                    className="group flex w-20 flex-col items-center gap-1 rounded-xl p-2 hover:bg-black/25"
                  >
                    <AppIcon
                      id={id}
                      size="xl"
                      className="ring-1 ring-white/20 transition group-hover:ring-white/40 group-hover:brightness-110"
                    />
                    <span className="text-center text-[11px] font-medium text-white/85 drop-shadow-md group-hover:text-white">
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              {wallpaperId === "retrouvailles" && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="pointer-events-none select-none text-center opacity-[0.14]">
                    <p className="font-[family-name:var(--font-instrument)] text-6xl text-white md:text-7xl">
                      Retrouvailles
                    </p>
                    <p className="mt-2 text-sm tracking-[0.25em] text-white uppercase">
                      Été 2026
                    </p>
                  </div>
                </div>
              )}

              <AnimatePresence>
                {ALL_APP_IDS.map((id) => (
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

export function Desktop({
  initialTheme = "dark",
  initialWallpaper = "koala",
  initialNsfwConsent = false,
}: {
  initialTheme?: ThemeMode;
  initialWallpaper?: WallpaperId;
  initialNsfwConsent?: boolean;
}) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <WallpaperProvider
        initialWallpaper={initialWallpaper}
        initialNsfwConsent={initialNsfwConsent}
      >
        <DesktopProvider>
          <DesktopInner />
        </DesktopProvider>
      </WallpaperProvider>
    </ThemeProvider>
  );
}
