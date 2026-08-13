"use client";

import { motion } from "motion/react";
import {
  tripsForTimeline,
  type TravelKind,
  type TravelTrip,
} from "@/content/travel";

const kindLabel: Record<TravelKind, string> = {
  leisure: "Loisir",
  work: "Pro",
  music: "Musique",
  family: "Famille",
};

type TravelTimelineProps = {
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onOpen: (id: string) => void;
};

export function TravelTimeline({
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  onOpen,
}: TravelTimelineProps) {
  const trips = tripsForTimeline();
  const dated = trips.filter((t) => !t.recurrent);
  const recurrent = trips.filter((t) => t.recurrent);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-[var(--vos-border)] px-4 py-3">
        <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--vos-sky)] uppercase">
          Timeline
        </p>
        <p className="mt-0.5 text-[11px] text-[var(--vos-text-muted)]">
          Chronologie des déplacements
        </p>
      </div>

      <div className="vos-scroll flex-1 overflow-y-auto px-2 py-2">
        <ul className="flex flex-col">
          {dated.map((trip, i) => (
            <TimelineRow
              key={trip.id}
              trip={trip}
              index={i}
              active={selectedId === trip.id}
              hovered={hoveredId === trip.id}
              onSelect={onSelect}
              onHover={onHover}
              onOpen={onOpen}
            />
          ))}
        </ul>

        {recurrent.length > 0 && (
          <>
            <p className="mt-4 mb-1 px-2 font-mono text-[10px] tracking-wider text-[var(--vos-text-dim)] uppercase">
              Récurrents
            </p>
            <ul className="flex flex-col">
              {recurrent.map((trip, i) => (
                <TimelineRow
                  key={trip.id}
                  trip={trip}
                  index={dated.length + i}
                  active={selectedId === trip.id}
                  hovered={hoveredId === trip.id}
                  onSelect={onSelect}
                  onHover={onHover}
                  onOpen={onOpen}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function TimelineRow({
  trip,
  index,
  active,
  hovered,
  onSelect,
  onHover,
  onOpen,
}: {
  trip: TravelTrip;
  index: number;
  active: boolean;
  hovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onOpen: (id: string) => void;
}) {
  const lit = active || hovered;

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.03 * index,
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        type="button"
        onClick={() => {
          onSelect(trip.id);
          onOpen(trip.id);
        }}
        onMouseEnter={() => onHover(trip.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(trip.id)}
        onBlur={() => onHover(null)}
        className={`group flex w-full gap-3 rounded-sm border-b border-[var(--vos-border-subtle)] px-2 py-3 text-left transition-colors last:border-b-0 ${
          lit
            ? "bg-[var(--vos-bg-elevated)]/50"
            : "hover:bg-[var(--vos-bg-elevated)]/35"
        }`}
      >
        <span className="relative mt-1 flex w-3 shrink-0 flex-col items-center">
          <span
            className="z-10 h-2.5 w-2.5 rounded-full ring-2 ring-[var(--vos-bg-content)] transition-transform"
            style={{
              background: trip.accent,
              transform: lit ? "scale(1.25)" : "scale(1)",
            }}
            aria-hidden
          />
          <span
            className="absolute top-3 bottom-[-14px] w-px bg-[var(--vos-border)]"
            aria-hidden
          />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span
              className="font-[family-name:var(--font-instrument)] text-lg leading-tight transition-colors group-hover:text-[var(--vos-amber)]"
              style={{ color: lit ? trip.accent : undefined }}
            >
              {trip.name}
            </span>
            <span className="font-mono text-[10px] text-[var(--vos-text-dim)]">
              {kindLabel[trip.kind]}
            </span>
          </span>
          <span className="mt-0.5 block font-mono text-[10px] text-[var(--vos-copper)]">
            {trip.region} · {trip.timing}
          </span>
          <span className="mt-1.5 line-clamp-2 block text-xs leading-relaxed text-[var(--vos-text-muted)]">
            {trip.summary}
          </span>
        </span>

        {trip.hasDetail !== false && (
          <span
            className="mt-1 shrink-0 text-[var(--vos-text-dim)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--vos-amber)]"
            aria-hidden
          >
            →
          </span>
        )}
      </button>
    </motion.li>
  );
}
