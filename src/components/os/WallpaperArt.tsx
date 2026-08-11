"use client";

/** Full-bleed photographic wallpaper with legibility veils for chrome. */
export function WallpaperArt() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/os/wallpaper-retrouvailles.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
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

      {/* Subtle side darken so shortcuts pop */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
    </div>
  );
}
