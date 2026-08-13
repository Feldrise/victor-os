"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getTrip, travelTrips } from "@/content/travel";
import { TravelTimeline } from "@/components/apps/travel/TravelTimeline";
import { TravelDetail } from "@/components/apps/travel/TravelDetail";

const TravelMap = dynamic(
  () =>
    import("@/components/apps/travel/TravelMap").then((m) => m.TravelMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-[var(--vos-bg)]/80">
        <p className="font-mono text-[11px] text-[var(--vos-text-dim)]">
          Chargement de la carte…
        </p>
      </div>
    ),
  },
);

type View = { kind: "overview" } | { kind: "detail"; id: string };

export function NetworkMapApp() {
  const [view, setView] = useState<View>({ kind: "overview" });
  const [selectedId, setSelectedId] = useState<string | null>(
    travelTrips[0]?.id ?? null,
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const detailTrip =
    view.kind === "detail" ? getTrip(view.id) : undefined;

  const openTrip = (id: string) => {
    setSelectedId(id);
    const trip = getTrip(id);
    if (!trip || trip.hasDetail === false) return;
    setView({ kind: "detail", id });
  };

  return (
    <div className="vos-scroll relative flex h-full min-h-0 flex-col overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {view.kind === "overview" && (
          <motion.div
            key="overview"
            className="flex h-full min-h-0 flex-col"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="shrink-0 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-4">
              <p className="text-[10px] tracking-[0.2em] text-[var(--vos-sky)] uppercase">
                Trafic réseau
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-text)]">
                Sur la route
              </h2>
              <p className="mt-1 max-w-md text-xs leading-relaxed text-[var(--vos-text-muted)]">
                Carte et chronologie — ouvre un voyage pour le journal.
              </p>
            </header>

            <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[1.45fr_1fr]">
              <div className="relative min-h-[240px] border-b border-[var(--vos-border)] sm:min-h-0 sm:border-r sm:border-b-0">
                <TravelMap
                  trips={travelTrips}
                  selectedId={selectedId}
                  hoveredId={hoveredId}
                  onSelect={setSelectedId}
                  onHover={setHoveredId}
                  onOpen={openTrip}
                />
              </div>
              <TravelTimeline
                selectedId={selectedId}
                hoveredId={hoveredId}
                onSelect={setSelectedId}
                onHover={setHoveredId}
                onOpen={openTrip}
              />
            </div>
          </motion.div>
        )}

        {view.kind === "detail" && detailTrip && (
          <motion.div
            key={`detail-${detailTrip.id}`}
            className="flex h-full min-h-0 flex-col"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <TravelDetail
              trip={detailTrip}
              onBack={() => setView({ kind: "overview" })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
