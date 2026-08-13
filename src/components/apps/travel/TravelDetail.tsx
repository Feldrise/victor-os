"use client";

import type {
  JournalEntry,
  TravelChapter,
  TravelKind,
  TravelPhoto,
  TravelTrip,
} from "@/content/travel";

const kindLabel: Record<TravelKind, string> = {
  leisure: "Loisir",
  work: "Pro",
  music: "Musique",
  family: "Famille",
};

function PhotoBlock({
  photo,
  accent,
  tall,
}: {
  photo: TravelPhoto;
  accent: string;
  tall?: boolean;
}) {
  const showImg = photo.src && !photo.placeholder;

  return (
    <figure
      className={`relative overflow-hidden border border-[var(--vos-border)] ${
        tall ? "aspect-[4/3]" : "aspect-[3/2]"
      }`}
    >
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo.src}
          alt={photo.caption}
          className="h-full w-full object-cover"
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
      )}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-2 text-[11px] leading-snug text-[var(--vos-text)]/90">
        {photo.caption}
      </figcaption>
    </figure>
  );
}

function Highlights({
  items,
  accent,
  label = "Points clés",
}: {
  items: string[];
  accent: string;
  label?: string;
}) {
  return (
    <ul className="mt-6 space-y-0 border-t border-[var(--vos-border)] pt-5">
      <li className="mb-3 font-mono text-[10px] tracking-wider text-[var(--vos-text-dim)] uppercase">
        {label}
      </li>
      {items.map((h, i) => (
        <li
          key={h}
          className="flex gap-3 border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
        >
          <span
            className="font-mono text-[10px] tabular-nums"
            style={{ color: accent }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-sm text-[var(--vos-text-muted)]">{h}</span>
        </li>
      ))}
    </ul>
  );
}

function JournalList({
  entries,
  accent,
}: {
  entries: JournalEntry[];
  accent: string;
}) {
  const journalSorted = [...entries].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  return (
    <ol className="mt-6 space-y-8">
      {journalSorted.map((entry) => (
        <li key={entry.id} className="relative pl-4">
          <span
            className="absolute top-1.5 left-0 h-2 w-2 rounded-full"
            style={{ background: accent }}
            aria-hidden
          />
          <time
            dateTime={entry.date}
            className="font-mono text-[10px] text-[var(--vos-info)]"
          >
            {formatJournalDate(entry.date)}
          </time>
          <h4 className="mt-1 font-[family-name:var(--font-instrument)] text-lg text-[var(--vos-text)]">
            {entry.title}
          </h4>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-[var(--vos-text-muted)]">
            {entry.body}
          </p>
          {entry.photos && entry.photos.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {entry.photos.map((photo) => (
                <PhotoBlock key={photo.id} photo={photo} accent={accent} />
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

function ChapterBlock({
  chapter,
  accent,
  index,
  unit,
  layout,
}: {
  chapter: TravelChapter;
  accent: string;
  index: number;
  unit: string;
  layout: "linear" | "constellation";
}) {
  const gallery = chapter.gallery ?? [];

  return (
    <section className="mt-12 border-t border-[var(--vos-border)] pt-10 first:mt-10">
      <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--vos-text-dim)] uppercase">
        {layout === "constellation"
          ? `${unit} · ${chapter.id.split("-").pop()}`
          : `${unit} ${String(index + 1).padStart(2, "0")}`}
      </p>
      <h3
        className="mt-2 font-[family-name:var(--font-instrument)] text-2xl leading-none"
        style={{ color: accent }}
      >
        {chapter.label}
      </h3>
      <p className="mt-2 font-mono text-xs text-[var(--vos-copper)]">
        {chapter.timing}
      </p>
      <p className="mt-3 max-w-prose text-sm italic leading-relaxed text-[var(--vos-text)]/75">
        {chapter.mood}
      </p>

      {chapter.cover && (
        <div className="mt-6 max-w-xl">
          <PhotoBlock photo={chapter.cover} accent={accent} tall />
        </div>
      )}

      <p className="mt-6 max-w-prose text-sm leading-relaxed text-[var(--vos-text)]/90">
        {chapter.body}
      </p>

      {gallery.length > 0 && (
        <div className="mt-5 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
          {gallery.map((photo) => (
            <PhotoBlock key={photo.id} photo={photo} accent={accent} />
          ))}
        </div>
      )}

      <Highlights items={chapter.highlights} accent={accent} label="Sur place" />

      {chapter.journal.length > 0 && (
        <div className="mt-8">
          <h4 className="font-mono text-[10px] tracking-wider text-[var(--vos-text-dim)] uppercase">
            Carnet
          </h4>
          <JournalList entries={chapter.journal} accent={accent} />
        </div>
      )}
    </section>
  );
}

export function TravelDetail({
  trip,
  onBack,
}: {
  trip: TravelTrip;
  onBack: () => void;
}) {
  const chapters = trip.chapters ?? [];
  const hasChapters = chapters.length > 0;
  const unit = trip.chapterUnit ?? "Séjour";
  const layout = trip.chapterLayout ?? "linear";

  return (
    <>
      <header className="shrink-0 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-4">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 flex items-center gap-1.5 text-[11px] text-[var(--vos-text-muted)] transition-colors hover:text-[var(--vos-amber)]"
        >
          <span aria-hidden>←</span> Sur la route
        </button>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] tracking-wider text-[var(--vos-sky)] uppercase">
              {kindLabel[trip.kind]}
              {trip.recurrent ? " · récurrent" : ""}
              {hasChapters
                ? layout === "constellation"
                  ? " · constellation"
                  : ` · ${chapters.length} ${unit.toLowerCase()}${chapters.length > 1 ? "s" : ""}`
                : ""}
            </p>
            <h2
              className="mt-1 font-[family-name:var(--font-instrument)] text-3xl leading-none"
              style={{ color: trip.accent }}
            >
              {trip.name}
            </h2>
            <p className="mt-2 font-mono text-xs text-[var(--vos-copper)]">
              {trip.region} · {trip.timing}
            </p>
          </div>
        </div>
      </header>

      <div className="vos-scroll flex-1 overflow-y-auto px-5 py-5">
        {trip.cover && (
          <div className="mb-6 max-w-xl">
            <PhotoBlock photo={trip.cover} accent={trip.accent} tall />
          </div>
        )}

        <p className="max-w-prose text-sm leading-relaxed text-[var(--vos-text)]/90">
          {trip.body}
        </p>

        {layout === "constellation" && hasChapters && (
          <p className="mt-4 max-w-prose font-mono text-[11px] leading-relaxed text-[var(--vos-text-dim)]">
            Lecture non linéaire — fragments autour du hub, dans n’importe quel
            ordre.
          </p>
        )}

        <Highlights items={trip.highlights} accent={trip.accent} />

        {hasChapters ? (
          <div className="mt-2">
            {chapters.map((chapter, i) => (
              <ChapterBlock
                key={chapter.id}
                chapter={chapter}
                accent={trip.accent}
                index={i}
                unit={unit}
                layout={layout}
              />
            ))}
          </div>
        ) : (
          <section className="mt-10">
            <h3
              className="font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: trip.accent }}
            >
              Journal
            </h3>
            <p className="mt-1 text-xs text-[var(--vos-text-muted)]">
              Entrées de voyage.
            </p>
            <JournalList entries={trip.journal} accent={trip.accent} />
          </section>
        )}
      </div>
    </>
  );
}

function formatJournalDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
