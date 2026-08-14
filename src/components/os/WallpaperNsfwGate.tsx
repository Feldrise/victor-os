"use client";

import { useWallpaper } from "./WallpaperProvider";

/** Consent overlay for mature wallpaper — sits above desktop icons, below menubar. */
export function WallpaperNsfwGate() {
  const { wallpaper, nsfwConsent, acceptNsfw, declineNsfw } = useWallpaper();
  const needsGate = Boolean(wallpaper.mature) && !nsfwConsent;

  if (!needsGate) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/35 p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nsfw-consent-title"
        className="max-w-sm rounded-2xl border border-[var(--vos-border)] bg-[var(--vos-window)] p-5 text-center shadow-xl backdrop-blur-md"
      >
        <p className="mb-1 text-[10px] font-medium tracking-[0.2em] text-[var(--vos-muted)] uppercase">
          18+
        </p>
        <h2
          id="nsfw-consent-title"
          className="font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-text)]"
        >
          Contenu artistique mature
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--vos-muted)]">
          Fond boudoir — photographie artistique. Afficher uniquement si tu
          acceptes de voir un contenu explicite.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={acceptNsfw}
            className="rounded-full border border-[var(--vos-teal)]/50 bg-[var(--vos-teal)]/20 px-4 py-2 text-sm text-[var(--vos-text)] transition hover:bg-[var(--vos-teal)]/35"
          >
            Afficher
          </button>
          <button
            type="button"
            onClick={declineNsfw}
            className="rounded-full border border-[var(--vos-border)] bg-[var(--vos-panel)]/55 px-4 py-2 text-sm text-[var(--vos-muted)] transition hover:text-[var(--vos-text)]"
          >
            Autre fond
          </button>
        </div>
      </div>
    </div>
  );
}
