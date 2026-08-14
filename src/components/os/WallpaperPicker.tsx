"use client";

import { useEffect, useId, useRef, useState } from "react";
import { WALLPAPERS, type WallpaperId } from "@/content/wallpapers";
import { useWallpaper } from "./WallpaperProvider";

export function WallpaperPicker() {
  const { wallpaperId, setWallpaper } = useWallpaper();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (id: WallpaperId) => {
    setWallpaper(id);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Choisir le fond d’écran"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-[var(--vos-border)] bg-[var(--vos-panel)]/55 px-2.5 py-1 text-[var(--vos-text)] backdrop-blur-sm transition hover:border-[var(--vos-teal)]/60"
      >
        <span aria-hidden className="text-[11px] leading-none">
          ▦
        </span>
        <span className="hidden sm:inline">Fond</span>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Fonds d’écran"
          className="absolute top-full right-0 z-[60] mt-2 w-[min(18rem,calc(100vw-1.5rem))] rounded-2xl border border-[var(--vos-border)] bg-[var(--vos-window)] p-2.5 shadow-xl backdrop-blur-md"
        >
          <p className="mb-2 px-1 text-[10px] tracking-[0.18em] text-[var(--vos-dim)] uppercase">
            Fond d’écran
          </p>
          <div className="grid grid-cols-2 gap-2">
            {WALLPAPERS.map((wall) => {
              const selected = wall.id === wallpaperId;
              return (
                <button
                  key={wall.id}
                  type="button"
                  onClick={() => select(wall.id)}
                  className={`group relative overflow-hidden rounded-xl border text-left transition ${
                    selected
                      ? "border-[var(--vos-teal)] ring-1 ring-[var(--vos-teal)]/50"
                      : "border-[var(--vos-border)] hover:border-[var(--vos-teal)]/50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={wall.src}
                    alt=""
                    className={`h-16 w-full object-cover ${
                      wall.mature ? "blur-md scale-110 brightness-75" : ""
                    }`}
                    style={{
                      objectPosition: wall.objectPosition ?? "center center",
                    }}
                    draggable={false}
                  />
                  {wall.mature && (
                    <span className="absolute top-1.5 right-1.5 rounded-full bg-black/65 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-white/90">
                      18+
                    </span>
                  )}
                  <span
                    className={`block truncate px-2 py-1.5 text-[11px] ${
                      selected
                        ? "bg-[var(--vos-teal)]/15 text-[var(--vos-text)]"
                        : "bg-[var(--vos-panel)]/80 text-[var(--vos-muted)] group-hover:text-[var(--vos-text)]"
                    }`}
                  >
                    {wall.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
