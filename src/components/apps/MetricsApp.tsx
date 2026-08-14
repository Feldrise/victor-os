"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  bretagneGauge,
  getPassion,
  sportsDoors,
  type PassionSpot,
  type Trend,
} from "@/content/sports";
import { WorldCupStudio } from "@/components/apps/WorldCupStudio";
import { RennesLateRun } from "@/components/apps/RennesLateRun";

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
          stroke="var(--vos-border)"
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
            {selected.id === "wc2026" && selected.wc ? (
              <WorldCupStudio
                passion={selected}
                onBack={() => setView({ kind: "overview" })}
              />
            ) : selected.id === "rennes" && selected.rennes ? (
              <RennesLateRun
                passion={selected}
                onBack={() => setView({ kind: "overview" })}
              />
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-sm text-[var(--vos-text-dim)]">
                Rien à ouvrir ici.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Overview({ onOpen }: { onOpen: (id: string) => void }) {
  const ping = getPassion("pingpong");
  const bretagne = getPassion("bretagne");

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
          Deux dossiers à ouvrir. Le ping-pong et la Bretagne tiennent ici.
        </p>
      </header>

      <div className="vos-scroll flex-1 overflow-y-auto p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {sportsDoors.map((m, i) => (
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
        </div>

        {ping && <PingPongTable ping={ping} />}
        {bretagne && <BretagneGaugeBlock />}
      </div>
    </>
  );
}

function PingPongTable({
  ping,
}: {
  ping: NonNullable<ReturnType<typeof getPassion>>;
}) {
  const spots = ping.spots ?? [];
  const featured = spots.find((s) => s.featured);
  const others = spots.filter((s) => !s.featured);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8"
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--vos-text-dim)] uppercase">
        {ping.subtitle} · pas de dossier
      </p>
      <div className="mt-1 flex items-baseline justify-between gap-3">
        <h3
          className="font-[family-name:var(--font-instrument)] text-2xl leading-none"
          style={{ color: ping.accent }}
        >
          {ping.title}
        </h3>
        <p className="font-mono text-[10px] text-[var(--vos-text-dim)]">
          {ping.value} · {ping.unit}
        </p>
      </div>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-[var(--vos-text-muted)]">
        {ping.body}
      </p>

      <div className="relative mt-5 overflow-hidden">
        <svg viewBox="0 0 360 128" className="h-auto w-full" aria-hidden>
          <rect
            x="18"
            y="18"
            width="324"
            height="92"
            rx="3"
            fill="color-mix(in srgb, #1e5c3a 82%, var(--vos-bg))"
            stroke={ping.accent}
            strokeWidth="2.5"
          />
          <rect
            x="26"
            y="26"
            width="308"
            height="76"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.2"
          />
          <line
            x1="180"
            y1="26"
            x2="180"
            y2="102"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.6"
          />
          <rect
            x="176"
            y="22"
            width="8"
            height="84"
            fill="rgba(244,239,230,0.18)"
          />
          <circle
            cx="180"
            cy="64"
            r="7"
            fill={ping.accent}
            className="vos-uptime-pulse"
          />
        </svg>
      </div>

      {featured && (
        <article
          className="relative mt-4 overflow-hidden px-4 py-4"
          style={{
            border: `1px solid ${ping.accent}`,
            background: `linear-gradient(135deg, color-mix(in srgb, ${ping.accent} 22%, var(--vos-bg)) 0%, var(--vos-bg) 62%)`,
            boxShadow: `inset 4px 0 0 ${ping.accent}`,
          }}
        >
          <p
            className="font-mono text-[9px] tracking-[0.22em] uppercase"
            style={{ color: ping.accent }}
          >
            Le clou · {featured.vibe}
          </p>
          <h4 className="mt-1 font-[family-name:var(--font-instrument)] text-xl leading-none text-[var(--vos-text)]">
            {featured.city}
          </h4>
          <p className="mt-1 text-[12px] text-[var(--vos-text)]">
            {featured.name}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-[var(--vos-text-muted)]">
            {featured.note}
          </p>
        </article>
      )}

      <ol className="mt-3 grid gap-3 sm:grid-cols-2">
        {others.map((s) => (
          <SpotChip key={s.id} spot={s} accent={ping.accent} />
        ))}
      </ol>
    </motion.section>
  );
}

function SpotChip({
  spot,
  accent,
}: {
  spot: PassionSpot;
  accent: string;
}) {
  return (
    <li className="flex items-start gap-2 py-1">
      <span
        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: accent }}
        aria-hidden
      />
      <div>
        <p className="text-[12px] leading-snug text-[var(--vos-text)]">
          {spot.city}
          <span className="ml-1.5 font-mono text-[9px] tracking-wider text-[var(--vos-text-dim)] uppercase">
            {spot.vibe}
          </span>
        </p>
        <p className="text-[11px] leading-snug text-[var(--vos-text-muted)]">
          {spot.name}
          {spot.note ? ` — ${spot.note}` : ""}
        </p>
      </div>
    </li>
  );
}

function BretagneGaugeBlock() {
  const bretagne = getPassion("bretagne");
  if (!bretagne) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 border-t border-[var(--vos-border)] pt-7"
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--vos-text-dim)] uppercase">
        {bretagne.subtitle} · pas de dossier
      </p>
      <h3
        className="mt-1 font-[family-name:var(--font-instrument)] text-2xl leading-none"
        style={{ color: bretagne.accent }}
      >
        {bretagneGauge.label}
      </h3>

      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
        <Gauge
          value={bretagneGauge.value}
          max={bretagneGauge.max}
          label="plus loin → plus fort"
          accent={bretagne.accent}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-relaxed text-[var(--vos-text-muted)]">
            {bretagne.body}
          </p>
          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {bretagne.metrics?.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[9px] tracking-wider text-[var(--vos-text-dim)] uppercase">
                  {m.label}
                </dt>
                <dd
                  className="font-[family-name:var(--font-instrument)] text-lg leading-none"
                  style={{ color: bretagne.accent }}
                >
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {bretagne.rituals && bretagne.rituals.length > 0 && (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {bretagne.rituals.map((r) => (
            <li key={r.id} className="relative pl-3">
              <span
                className="absolute top-1.5 left-0 h-4 w-px"
                style={{ background: bretagne.accent }}
                aria-hidden
              />
              <p className="text-[12px] text-[var(--vos-text)]">{r.title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-[var(--vos-text-muted)]">
                {r.detail}
              </p>
            </li>
          ))}
        </ul>
      )}

      {bretagne.places && bretagne.places.length > 0 && (
        <p className="mt-5 font-mono text-[10px] leading-relaxed tracking-wide text-[var(--vos-text-dim)]">
          {bretagne.places.map((p) => p.name).join("  ·  ")}
        </p>
      )}
    </motion.section>
  );
}
