"use client";

import { useWallpaper } from "./WallpaperProvider";

/** Full-bleed wallpaper with legibility veils; mature content stays blurred until consent. */
export function WallpaperArt() {
  const { wallpaper, wallpaperId, nsfwConsent } = useWallpaper();
  const needsBlur = Boolean(wallpaper.mature) && !nsfwConsent;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={wallpaperId}
        src={wallpaper.src}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-500 ${
          needsBlur ? "scale-110 blur-2xl brightness-50" : ""
        }`}
        style={{ objectPosition: wallpaper.objectPosition ?? "center center" }}
        draggable={false}
      />

      {/* Soft top veil so menubar stays readable */}
      <div
        className="absolute inset-x-0 top-0 h-28"
        style={{
          background:
            "linear-gradient(to bottom, var(--vos-wallpaper-veil), transparent)",
        }}
      />

      {/* Bottom vignette for dock + desktop icons */}
      <div
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background:
            "linear-gradient(to top, var(--vos-wallpaper-bottom), transparent)",
        }}
      />

      {/* Mobile: stronger full-bleed veil so launcher tiles stay readable */}
      <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--vos-bg)_42%,transparent)] md:bg-transparent" />

      {/* Subtle side darken so shortcuts pop (desktop icons) */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/25 via-transparent to-transparent md:block" />
    </div>
  );
}
