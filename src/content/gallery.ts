import type { GalleryAlbum, GalleryPhoto } from "./types";
import {
  travelTrips,
  type JournalEntry,
  type TravelChapter,
  type TravelPhoto,
  type TravelTrip,
} from "./travel";
import { veraModules, type VeraModule, type VeraPhoto } from "./vera";

function isOpenable(photo: { src: string; placeholder?: boolean }): boolean {
  return Boolean(photo.src) && !photo.placeholder;
}

function asGalleryPhoto(photo: TravelPhoto | VeraPhoto): GalleryPhoto {
  return {
    id: photo.id,
    src: photo.src,
    caption: photo.caption,
    placeholder: photo.placeholder,
  };
}

function collectJournalPhotos(entries: JournalEntry[]): GalleryPhoto[] {
  return entries.flatMap((entry) =>
    (entry.photos ?? []).filter(isOpenable).map(asGalleryPhoto),
  );
}

function dedupePhotos(photos: GalleryPhoto[]): GalleryPhoto[] {
  const seen = new Set<string>();
  return photos.filter((photo) => {
    if (seen.has(photo.id)) return false;
    seen.add(photo.id);
    return true;
  });
}

/** Trip-level album: cover + root journal (no chapters). */
export function albumForTrip(trip: TravelTrip): GalleryAlbum {
  const photos = dedupePhotos([
    ...(trip.cover && isOpenable(trip.cover)
      ? [asGalleryPhoto(trip.cover)]
      : []),
    ...collectJournalPhotos(trip.journal),
  ]);

  return {
    id: `travel:${trip.id}`,
    title: trip.name,
    source: "travel",
    photos,
  };
}

/** Chapter album: cover + gallery + chapter journal. */
export function albumForChapter(
  trip: TravelTrip,
  chapter: TravelChapter,
): GalleryAlbum {
  const photos = dedupePhotos([
    ...(chapter.cover && isOpenable(chapter.cover)
      ? [asGalleryPhoto(chapter.cover)]
      : []),
    ...(chapter.gallery ?? []).filter(isOpenable).map(asGalleryPhoto),
    ...collectJournalPhotos(chapter.journal),
  ]);

  return {
    id: `travel:${trip.id}:${chapter.id}`,
    title: `${trip.name} · ${chapter.label}`,
    source: "travel",
    photos,
  };
}

export function albumForVeraModule(module: VeraModule): GalleryAlbum {
  const photos = dedupePhotos(
    (module.gallery ?? []).filter(isOpenable).map(asGalleryPhoto),
  );

  return {
    id: `vera:${module.id}`,
    title: module.title,
    source: "vera",
    photos,
  };
}

function albumsFromTrip(trip: TravelTrip): GalleryAlbum[] {
  if (trip.hasDetail === false) return [];

  const chapters = trip.chapters ?? [];
  const albums: GalleryAlbum[] = [];

  if (chapters.length > 0) {
    const tripAlbum = albumForTrip(trip);
    if (tripAlbum.photos.length > 0) albums.push(tripAlbum);
    for (const chapter of chapters) {
      const album = albumForChapter(trip, chapter);
      if (album.photos.length > 0) albums.push(album);
    }
    return albums;
  }

  const album = albumForTrip(trip);
  return album.photos.length > 0 ? [album] : [];
}

/** All browsable albums with at least one openable photo. */
export const galleryAlbums: GalleryAlbum[] = [
  ...travelTrips.flatMap(albumsFromTrip),
  ...veraModules
    .map(albumForVeraModule)
    .filter((album) => album.photos.length > 0),
];

export function getGalleryAlbum(id: string): GalleryAlbum | undefined {
  return galleryAlbums.find((album) => album.id === id);
}
