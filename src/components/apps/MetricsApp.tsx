"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  bretagneGauge,
  getPassion,
  sportsMetrics,
  type Passion,
  type Trend,
} from "@/content/sports";

type View = { kind: "overview" } | { kind: "detail"; id: string };

function sparkColor(trend: Trend): string {
  if (trend === "up") return "var(--vos-success)";
  if (trend === "down") return "var(--vos-danger, #e07070)";
  return "var(--vos-info)";
}

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 120;
  const h = 36;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}

function Gauge({
  value,
  max,
  label,
  accent,
}: {
  value: number;
  max: number;
  label: string;
  accent: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c * 0.75;

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="110" viewBox="0 0 140 110">
        <path
          d="M 16 90 A 54 54 0 1 1 124 90"
          fill="none"
          stroke="#2c3140"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 16 90 A 54 54 0 1 1 124 90"
          fill="none"
          stroke={accent}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c * 0.75}
          strokeDashoffset={offset}
        />
        <text
          x="70"
          y="72"
          textAnchor="middle"
          fill={accent}
          fontSize="28"
          fontFamily="var(--font-instrument), serif"
        >
          {value}
        </text>
        <text
          x="70"
          y="90"
          textAnchor="middle"
          fill="var(--vos-text-dim)"
          fontSize="10"
          fontFamily="var(--font-ibm-plex-mono), monospace"
        >
          / {max}
        </text>
      </svg>
      <p className="font-mono text-xs text-[var(--vos-text-muted)]">{label}</p>
    </div>
  );
}

export function MetricsApp() {
  const [view, setView] = useState<View>({ kind: "overview" });
  const selected =
    view.kind === "detail" ? getPassion(view.id) : undefined;

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
            <Overview onOpen={(id) => setView({ kind: "detail", id })} />
          </motion.div>
        )}

        {view.kind === "detail" && selected && (
          <motion.div
            key={`detail-${selected.id}`}
            className="flex h-full min-h-0 flex-col"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <DetailView
              passion={selected}
              onBack={() => setView({ kind: "overview" })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Overview({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <>
      <header className="shrink-0 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-5">
        <p className="text-[10px] tracking-[0.2em] text-[var(--vos-success)] uppercase">
          Monitoring
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-text)]">
          Passions
        </h2>
        <p className="mt-1 max-w-md text-xs leading-relaxed text-[var(--vos-text-muted)]">
          Foot, Mondial, ping-pong et racines — métriques du cœur, drill-down
          autorisé.
        </p>
      </header>

      <div className="vos-scroll flex-1 overflow-y-auto p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {sportsMetrics.map((m, i) => (
            <motion.button
              key={m.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.04 * i,
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => onOpen(m.id)}
              className="group border border-[var(--vos-border)] bg-[var(--vos-bg)]/50 p-4 text-left transition-colors hover:bg-[var(--vos-bg-elevated)]/40"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-[10px] text-[var(--vos-text-dim)]">
                    {m.subtitle}
                  </p>
                  <h3
                    className="font-[family-name:var(--font-instrument)] text-lg transition-colors group-hover:text-[var(--vos-amber)]"
                    style={{ color: m.accent }}
                  >
                    {m.title}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-text)]">
                    {m.value}
                  </p>
                  {m.unit && (
                    <p className="font-mono text-[10px] text-[var(--vos-text-dim)]">
                      {m.unit}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <Sparkline values={m.series} color={sparkColor(m.trend)} />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[var(--vos-text-muted)]">
                {m.summary}
              </p>
              <span className="mt-3 inline-block text-[11px] text-[var(--vos-text-dim)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--vos-amber)]">
                Ouvrir →
              </span>
            </motion.button>
          ))}

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.04 * sportsMetrics.length,
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => onOpen(bretagneGauge.id)}
            className="group border border-[var(--vos-border)] bg-[var(--vos-bg)]/50 p-4 text-left transition-colors hover:bg-[var(--vos-bg-elevated)]/40 sm:col-span-2"
          >
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <p className="font-mono text-[10px] text-[var(--vos-text-dim)]">
                  identity gauge
                </p>
                <h3
                  className="font-[family-name:var(--font-instrument)] text-lg transition-colors group-hover:text-[var(--vos-amber)]"
                  style={{ color: bretagneGauge.accent }}
                >
                  {bretagneGauge.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--vos-text-muted)]">
                  {bretagneGauge.description}
                </p>
                <span className="mt-3 inline-block text-[11px] text-[var(--vos-text-dim)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--vos-amber)]">
                  Ouvrir →
                </span>
              </div>
              <Gauge
                value={bretagneGauge.value}
                max={bretagneGauge.max}
                label="celtic affinity"
                accent={bretagneGauge.accent}
              />
            </div>
          </motion.button>
        </div>
      </div>
    </>
  );
}

function DetailView({
  passion,
  onBack,
}: {
  passion: Passion;
  onBack: () => void;
}) {
  return (
    <>
      <header className="shrink-0 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-4">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 flex items-center gap-1.5 text-[11px] text-[var(--vos-text-muted)] transition-colors hover:text-[var(--vos-amber)]"
        >
          <span aria-hidden>←</span> Passions
        </button>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] text-[var(--vos-copper)]">
              {passion.subtitle}
            </p>
            <h2
              className="mt-1 font-[family-name:var(--font-instrument)] text-3xl leading-none"
              style={{ color: passion.accent }}
            >
              {passion.title}
            </h2>
          </div>
          <div className="text-right">
            <p
              className="font-[family-name:var(--font-instrument)] text-3xl"
              style={{ color: passion.accent }}
            >
              {passion.value}
            </p>
            {passion.unit && (
              <p className="font-mono text-[10px] text-[var(--vos-text-dim)]">
                {passion.unit}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="vos-scroll flex-1 overflow-y-auto px-5 py-5">
        <div className="mb-6">
          <Sparkline
            values={passion.series}
            color={sparkColor(passion.trend)}
          />
        </div>

        <p className="max-w-prose text-sm leading-relaxed text-[var(--vos-text)]/90">
          {passion.body}
        </p>

        {passion.metrics && passion.metrics.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[var(--vos-border)] py-4 sm:grid-cols-4">
            {passion.metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[10px] text-[var(--vos-text-dim)]">
                  {m.label}
                </dt>
                <dd
                  className="mt-1 font-[family-name:var(--font-instrument)] text-xl"
                  style={{ color: passion.accent }}
                >
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-6 space-y-0 border-t border-[var(--vos-border)] pt-5">
          <li className="mb-3 font-mono text-[10px] tracking-wider text-[var(--vos-text-dim)] uppercase">
            Points clés
          </li>
          {passion.highlights.map((h, i) => (
            <li
              key={h}
              className="flex gap-3 border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
            >
              <span
                className="font-mono text-[10px] tabular-nums"
                style={{ color: passion.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-[var(--vos-text-muted)]">{h}</span>
            </li>
          ))}
        </ul>

        {passion.matches && passion.matches.length > 0 && (
          <section className="mt-8">
            <h3
              className="font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: passion.accent }}
            >
              Matchs mémorables
            </h3>
            <ul className="mt-4 space-y-0">
              {passion.matches.map((m) => (
                <li
                  key={m.id}
                  className="border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm text-[var(--vos-text)]">
                      vs {m.opponent}{" "}
                      <span style={{ color: passion.accent }}>{m.score}</span>
                    </p>
                    <p className="font-mono text-[10px] text-[var(--vos-copper)]">
                      {m.date} · {m.competition}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-[var(--vos-text-muted)]">
                    {m.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {passion.wcGames && passion.wcGames.length > 0 && (
          <section className="mt-8">
            <h3
              className="font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: passion.accent }}
            >
              Calendrier mental CdM
            </h3>
            <ul className="mt-4 space-y-0">
              {passion.wcGames.map((g) => (
                <li
                  key={g.id}
                  className="border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm text-[var(--vos-text)]">{g.matchup}</p>
                    <p className="font-mono text-[10px] text-[var(--vos-copper)]">
                      {g.date} · {g.stage}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-[var(--vos-text-muted)]">
                    {g.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {passion.spots && passion.spots.length > 0 && (
          <section className="mt-8">
            <h3
              className="font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: passion.accent }}
            >
              Spots ping-pong
            </h3>
            <ul className="mt-4 space-y-0">
              {passion.spots.map((s) => (
                <li
                  key={s.id}
                  className="border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm text-[var(--vos-text)]">
                      {s.name}{" "}
                      <span className="font-mono text-[11px] text-[var(--vos-text-dim)]">
                        · {s.city}
                      </span>
                    </p>
                    <p
                      className="font-mono text-[10px]"
                      style={{ color: passion.accent }}
                    >
                      {s.vibe}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-[var(--vos-text-muted)]">
                    {s.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {passion.rituals && passion.rituals.length > 0 && (
          <section className="mt-8">
            <h3
              className="font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: passion.accent }}
            >
              Rituels
            </h3>
            <ul className="mt-4 space-y-4">
              {passion.rituals.map((r) => (
                <li key={r.id} className="relative pl-4">
                  <span
                    className="absolute top-1.5 left-0 h-2 w-2 rounded-full"
                    style={{ background: passion.accent }}
                    aria-hidden
                  />
                  <p className="text-sm font-medium text-[var(--vos-text)]">
                    {r.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--vos-text-muted)]">
                    {r.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {passion.places && passion.places.length > 0 && (
          <section className="mt-8">
            <h3
              className="font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: passion.accent }}
            >
              Lieux d’ancrage
            </h3>
            <ul className="mt-4 space-y-0">
              {passion.places.map((p) => (
                <li
                  key={p.id}
                  className="border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
                >
                  <p className="text-sm text-[var(--vos-text)]">{p.name}</p>
                  <p className="mt-1 text-sm text-[var(--vos-text-muted)]">
                    {p.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {passion.id === "bretagne" && (
          <div className="mt-8 flex justify-center border-t border-[var(--vos-border)] pt-6">
            <Gauge
              value={bretagneGauge.value}
              max={bretagneGauge.max}
              label="celtic affinity"
              accent={passion.accent}
            />
          </div>
        )}
      </div>
    </>
  );
}
