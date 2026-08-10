"use client";

import { bretagneGauge, sportsMetrics } from "@/content/sports";

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

function Gauge({ value, max, label }: { value: number; max: number; label: string }) {
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
          stroke="var(--vos-amber)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c * 0.75}
          strokeDashoffset={offset}
        />
        <text
          x="70"
          y="72"
          textAnchor="middle"
          fill="var(--vos-amber)"
          fontSize="28"
          fontFamily="var(--font-instrument), serif"
        >
          {value}
        </text>
        <text
          x="70"
          y="90"
          textAnchor="middle"
          fill="var(--vos-dim)"
          fontSize="10"
          fontFamily="var(--font-ibm-plex-mono), monospace"
        >
          / {max}
        </text>
      </svg>
      <p className="font-mono text-xs text-[var(--vos-muted)]">{label}</p>
    </div>
  );
}

export function MetricsApp() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-[var(--vos-border)] bg-[var(--vos-panel)] px-5 py-4">
        <p className="text-[10px] tracking-widest text-[var(--vos-rose)] uppercase">
          Passions
        </p>
        <h2 className="font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-text)]">
          Ce qui fait battre le cœur
        </h2>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {sportsMetrics.map((m) => (
          <div
            key={m.id}
            className="rounded-lg border border-[var(--vos-border)] bg-[var(--vos-bg)]/50 p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-mono text-[10px] text-[var(--vos-dim)]">{m.subtitle}</p>
                <h3 className="font-[family-name:var(--font-instrument)] text-lg text-[var(--vos-amber)]">
                  {m.title}
                </h3>
              </div>
              <div className="text-right">
                <p className="font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-text)]">
                  {m.value}
                </p>
                {m.unit && (
                  <p className="font-mono text-[10px] text-[var(--vos-dim)]">{m.unit}</p>
                )}
              </div>
            </div>
            <div className="mt-3">
              <Sparkline
                values={m.series}
                color={
                  m.trend === "up"
                    ? "var(--vos-success)"
                    : m.trend === "down"
                      ? "var(--vos-danger)"
                      : "var(--vos-info)"
                }
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--vos-muted)]">{m.note}</p>
          </div>
        ))}

        <div className="rounded-lg border border-[var(--vos-border)] bg-[var(--vos-bg)]/50 p-4 sm:col-span-2">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <p className="font-mono text-[10px] text-[var(--vos-dim)]">identity gauge</p>
              <h3 className="font-[family-name:var(--font-instrument)] text-lg text-[var(--vos-amber)]">
                {bretagneGauge.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--vos-muted)]">
                {bretagneGauge.description}
              </p>
            </div>
            <Gauge
              value={bretagneGauge.value}
              max={bretagneGauge.max}
              label="celtic affinity"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
