"use client";

import type { TravelKind, TravelPhoto, TravelTrip } from "@/content/travel";

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

export function TravelDetail({
  trip,
  onBack,
}: {
  trip: TravelTrip;
  onBack: () => void;
}) {
  const journalSorted = [...trip.journal].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

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

        <ul className="mt-6 space-y-0 border-t border-[var(--vos-border)] pt-5">
          <li className="mb-3 font-mono text-[10px] tracking-wider text-[var(--vos-text-dim)] uppercase">
            Points clés
          </li>
          {trip.highlights.map((h, i) => (
            <li
              key={h}
              className="flex gap-3 border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
            >
              <span
                className="font-mono text-[10px] tabular-nums"
                style={{ color: trip.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-[var(--vos-text-muted)]">{h}</span>
            </li>
          ))}
        </ul>

        <section className="mt-10">
          <h3
            className="font-[family-name:var(--font-instrument)] text-xl"
            style={{ color: trip.accent }}
          >
            Journal
          </h3>
          <p className="mt-1 text-xs text-[var(--vos-text-muted)]">
            Entrées de voyage — contenu placeholder, à remplacer plus tard.
          </p>

          <ol className="mt-6 space-y-8">
            {journalSorted.map((entry) => (
              <li key={entry.id} className="relative pl-4">
                <span
                  className="absolute top-1.5 left-0 h-2 w-2 rounded-full"
                  style={{ background: trip.accent }}
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
                      <PhotoBlock
                        key={photo.id}
                        photo={photo}
                        accent={trip.accent}
                      />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
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
