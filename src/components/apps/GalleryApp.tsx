"use client";

import { useCallback, useEffect, useState } from "react";
import { useDesktop } from "@/components/os/DesktopContext";
import { galleryAlbums } from "@/content/gallery";
import type { GalleryAlbum } from "@/content/types";

const sourceLabel: Record<GalleryAlbum["source"], string> = {
  travel: "Voyages",
  vera: "Vera",
};

export function GalleryApp() {
  const { galleryTarget, openGallery, clearGalleryTarget, activeId } =
    useDesktop();

  if (galleryTarget && galleryTarget.album.photos.length > 0) {
    return (
      <Viewer
        album={galleryTarget.album}
        index={galleryTarget.index}
        active={activeId === "gallery"}
        onIndexChange={(index) =>
          openGallery({ album: galleryTarget.album, index })
        }
        onBack={clearGalleryTarget}
      />
    );
  }

  return <AlbumBrowser onOpen={(album) => openGallery({ album, index: 0 })} />;
}

function AlbumBrowser({
  onOpen,
}: {
  onOpen: (album: GalleryAlbum) => void;
}) {
  return (
    <div className="vos-scroll flex h-full min-h-0 flex-col overflow-hidden">
      <header className="shrink-0 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-5">
        <p className="text-[10px] tracking-[0.2em] text-[var(--vos-copper)] uppercase">
          Médias
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-text)]">
          Galerie
        </h2>
        <p className="mt-1 max-w-md text-xs leading-relaxed text-[var(--vos-text-muted)]">
          Albums tirés de Voyages et Vera — ouvre une photo depuis une app pour
          défiler.
        </p>
      </header>

      <div className="vos-scroll flex-1 overflow-y-auto px-5 py-5">
        {galleryAlbums.length === 0 ? (
          <p className="text-sm text-[var(--vos-text-dim)]">
            Aucun album pour le moment.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {galleryAlbums.map((album) => {
              const cover = album.photos[0];
              return (
                <li key={album.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(album)}
                    className="group flex w-full flex-col overflow-hidden border border-[var(--vos-border)] bg-[var(--vos-bg-panel)] text-left transition-colors hover:border-[var(--vos-copper)]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vos-copper)]"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-[var(--vos-bg)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cover.src}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="absolute top-2 left-2 rounded border border-black/30 bg-black/55 px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-white/90 uppercase">
                        {sourceLabel[album.source]}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-2 px-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate font-[family-name:var(--font-instrument)] text-base text-[var(--vos-text)]">
                          {album.title}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-[var(--vos-text-dim)]">
                          {album.photos.length} photo
                          {album.photos.length > 1 ? "s" : ""}
                        </p>
                      </div>
                      <span
                        className="shrink-0 text-[var(--vos-copper)] opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      >
                        →
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function Viewer({
  album,
  index,
  active,
  onIndexChange,
  onBack,
}: {
  album: GalleryAlbum;
  index: number;
  active: boolean;
  onIndexChange: (index: number) => void;
  onBack: () => void;
}) {
  const count = album.photos.length;
  const safeIndex = ((index % count) + count) % count;
  const photo = album.photos[safeIndex];
  const [thumbFailed, setThumbFailed] = useState<Record<string, boolean>>({});

  const goPrev = useCallback(() => {
    onIndexChange((safeIndex - 1 + count) % count);
  }, [count, onIndexChange, safeIndex]);

  const goNext = useCallback(() => {
    onIndexChange((safeIndex + 1) % count);
  }, [count, onIndexChange, safeIndex]);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "Escape") {
        event.preventDefault();
        onBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goNext, goPrev, onBack]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#0a0b10]">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-[11px] text-[var(--vos-text-muted)] transition-colors hover:text-[var(--vos-copper)]"
        >
          <span aria-hidden>←</span> Albums
        </button>
        <div className="min-w-0 text-center">
          <p className="truncate font-mono text-[10px] tracking-wider text-[var(--vos-text-dim)] uppercase">
            {sourceLabel[album.source]}
          </p>
          <p className="truncate text-sm text-[var(--vos-text)]">{album.title}</p>
        </div>
        <p className="shrink-0 font-mono text-[11px] tabular-nums text-[var(--vos-text-muted)]">
          {safeIndex + 1} / {count}
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 py-4">
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--vos-border)] bg-black/50 text-lg text-[var(--vos-text)] transition-colors hover:border-[var(--vos-copper)] hover:text-[var(--vos-copper)]"
              aria-label="Photo précédente"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--vos-border)] bg-black/50 text-lg text-[var(--vos-text)] transition-colors hover:border-[var(--vos-copper)] hover:text-[var(--vos-copper)]"
              aria-label="Photo suivante"
            >
              ›
            </button>
          </>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.caption}
          className="max-h-full max-w-full object-contain shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
        />
      </div>

      <footer className="shrink-0 border-t border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-4 py-3">
        <p className="text-center text-sm leading-snug text-[var(--vos-text)]/90">
          {photo.caption}
        </p>
        {count > 1 && (
          <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {album.photos.map((item, i) => {
              const active = i === safeIndex;
              const failed = thumbFailed[item.id];
              return (
                <li key={item.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onIndexChange(i)}
                    className={`block h-12 w-16 overflow-hidden border transition-colors ${
                      active
                        ? "border-[var(--vos-copper)]"
                        : "border-[var(--vos-border)] opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Aller à la photo ${i + 1}`}
                    aria-current={active ? "true" : undefined}
                  >
                    {failed ? (
                      <span className="flex h-full w-full items-center justify-center bg-[var(--vos-bg)] font-mono text-[9px] text-[var(--vos-text-dim)]">
                        ·
                      </span>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.src}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={() =>
                          setThumbFailed((prev) => ({
                            ...prev,
                            [item.id]: true,
                          }))
                        }
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </footer>
    </div>
  );
}
