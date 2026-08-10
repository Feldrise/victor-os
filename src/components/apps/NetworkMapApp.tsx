"use client";

import { useState } from "react";
import { travelPins, type TravelPin } from "@/content/travel";

function EuropeMap({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" role="img" aria-label="Carte des déplacements">
      <defs>
        <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e222d" />
          <stop offset="100%" stopColor="#161922" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Stylized continent blob */}
      <path
        d="M180 80 C220 40 300 50 340 90 C380 50 450 70 480 120 C540 100 600 140 620 200 C680 220 700 300 660 360 C690 430 620 480 540 500 C480 540 400 530 340 500 C280 540 200 510 170 450 C120 420 100 340 130 280 C100 220 120 140 180 80 Z"
        fill="url(#land)"
        stroke="#2c3140"
        strokeWidth="2"
      />
      {/* UK-ish */}
      <path
        d="M230 100 C250 85 280 95 285 120 C275 150 250 155 235 140 C220 125 220 110 230 100 Z"
        fill="#1a1d26"
        stroke="#2c3140"
        strokeWidth="1.5"
      />
      {/* Grid accents */}
      {[150, 250, 350, 450].map((y) => (
        <line key={y} x1="120" y1={y} x2="680" y2={y} stroke="rgba(232,160,74,0.06)" strokeWidth="1" />
      ))}
      {[200, 300, 400, 500, 600].map((x) => (
        <line key={x} x1={x} y1="60" x2={x} y2="520" stroke="rgba(232,160,74,0.06)" strokeWidth="1" />
      ))}

      {/* Routes from a rough "home" node in south FR */}
      {travelPins.map((pin) => (
        <line
          key={`route-${pin.id}`}
          x1={355}
          y1={360}
          x2={pin.x}
          y2={pin.y}
          stroke={pin.accent}
          strokeOpacity={selected === pin.id ? 0.55 : 0.2}
          strokeWidth={selected === pin.id ? 2 : 1}
          strokeDasharray="4 4"
        />
      ))}

      {travelPins.map((pin) => {
        const active = selected === pin.id;
        return (
          <g
            key={pin.id}
            className="cursor-pointer"
            onClick={() => onSelect(pin.id)}
            filter={active ? "url(#glow)" : undefined}
          >
            <circle
              cx={pin.x}
              cy={pin.y}
              r={active ? 10 : 7}
              fill={pin.accent}
              fillOpacity={0.25}
              stroke={pin.accent}
              strokeWidth={2}
            />
            <circle cx={pin.x} cy={pin.y} r={3} fill={pin.accent} />
            <text
              x={pin.x + 12}
              y={pin.y + 4}
              fill={active ? "#e8e4dc" : "#8b91a0"}
              fontSize="11"
              fontFamily="var(--font-ibm-plex-mono), monospace"
            >
              {pin.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function PinDetail({ pin }: { pin: TravelPin }) {
  return (
    <div className="border-t border-[var(--vos-border)] bg-[var(--vos-panel)] p-4 sm:border-t-0 sm:border-l">
      <p className="font-mono text-[10px] tracking-widest text-[var(--vos-dim)] uppercase">
        packet trace
      </p>
      <h3 className="mt-1 font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-amber)]">
        {pin.name}
      </h3>
      <p className="font-mono text-xs text-[var(--vos-copper)]">{pin.region}</p>
      <p className="mt-1 font-mono text-[11px] text-[var(--vos-info)]">{pin.timing}</p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--vos-muted)]">{pin.context}</p>
      <div
        className="mt-4 h-24 rounded-lg border border-[var(--vos-border)]"
        style={{
          background: `linear-gradient(135deg, ${pin.accent}33, transparent 60%), radial-gradient(circle at 30% 70%, ${pin.accent}22, #0c0d12)`,
        }}
      >
        <div className="flex h-full items-end p-3 font-mono text-[10px] text-[var(--vos-dim)]">
          media://travel/{pin.id} · placeholder
        </div>
      </div>
    </div>
  );
}

export function NetworkMapApp() {
  const [selected, setSelected] = useState<string | null>(travelPins[0]?.id ?? null);
  const pin = travelPins.find((p) => p.id === selected) ?? travelPins[0];

  return (
    <div className="flex h-full min-h-[420px] flex-col">
      <div className="border-b border-[var(--vos-border)] px-5 py-3">
        <h2 className="font-[family-name:var(--font-instrument)] text-xl text-[var(--vos-text)]">
          Sur la route
        </h2>
        <p className="text-[11px] text-[var(--vos-muted)]">
          Clique un lieu pour l&apos;histoire
        </p>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[1.4fr_1fr]">
        <div className="min-h-[260px] bg-[var(--vos-bg)]/60 p-2">
          <EuropeMap selected={selected} onSelect={setSelected} />
        </div>
        {pin && <PinDetail pin={pin} />}
      </div>
    </div>
  );
}
