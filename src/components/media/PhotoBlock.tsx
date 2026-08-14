"use client";

import { useDesktop } from "@/components/os/DesktopContext";
import type { GalleryAlbum, GalleryPhoto } from "@/content/types";

type Props = {
  photo: GalleryPhoto;
  accent: string;
  tall?: boolean;
  /** When set, clicking an openable photo opens the gallery viewer on this album. */
  album?: GalleryAlbum;
};

export function PhotoBlock({ photo, accent, tall, album }: Props) {
  const { openGallery } = useDesktop();
  const showImg = Boolean(photo.src) && !photo.placeholder;
  const index =
    album && showImg
      ? album.photos.findIndex((p) => p.id === photo.id)
      : -1;
  const openable = Boolean(album) && index >= 0;

  const media = showImg ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo.src}
      alt={photo.caption}
      className="h-full w-full object-cover transition-transform duration-300 group-hover/photo:scale-[1.02]"
    />
  ) : (
    <div
      className="flex h-full w-full flex-col justify-end p-3"
      style={{
        background: `linear-gradient(135deg, ${accent}40, transparent 55%), radial-gradient(circle at 25% 75%, ${accent}28, var(--vos-bg) 70%)`,
      }}
    >
      <span className="font-mono text-[9px] tracking-wider text-[var(--vos-text-dim)] uppercase">
        placeholder
      </span>
    </div>
  );

  const caption = (
    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-2 text-[11px] leading-snug text-[var(--vos-text)]/90">
      {photo.caption}
    </figcaption>
  );

  if (openable && album) {
    return (
      <figure
        className={`relative overflow-hidden border border-[var(--vos-border)] ${
          tall ? "aspect-[4/3]" : "aspect-[3/2]"
        }`}
      >
        <button
          type="button"
          onClick={() => openGallery({ album, index })}
          className="group/photo absolute inset-0 block w-full text-left transition-colors hover:border-[var(--vos-text-dim)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vos-amber)]"
          aria-label={`Ouvrir dans la galerie : ${photo.caption}`}
        >
          {media}
        </button>
        {caption}
      </figure>
    );
  }

  return (
    <figure
      className={`relative overflow-hidden border border-[var(--vos-border)] ${
        tall ? "aspect-[4/3]" : "aspect-[3/2]"
      }`}
    >
      {media}
      {caption}
    </figure>
  );
}
