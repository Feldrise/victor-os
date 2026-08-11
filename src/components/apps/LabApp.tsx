"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  daysUntil,
  getLabProcess,
  labProcesses,
  type LabPhoto,
  type LabProcess,
  type LabStatus,
} from "@/content/lab";

type View = { kind: "overview" } | { kind: "detail"; id: string };

const statusColor: Record<LabStatus, string> = {
  running: "text-[var(--vos-success)]",
  sleeping: "text-[var(--vos-info)]",
  idle: "text-[var(--vos-text-dim)]",
};

function PhotoBlock({
  photo,
  accent,
}: {
  photo: LabPhoto;
  accent: string;
}) {
  const showImg = photo.src && !photo.placeholder;

  return (
    <figure className="relative aspect-[3/2] overflow-hidden border border-[var(--vos-border)]">
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

export function LabApp() {
  const [view, setView] = useState<View>({ kind: "overview" });
  const [selectedId, setSelectedId] = useState(labProcesses[0]?.id ?? "");
  const selected =
    view.kind === "detail" ? getLabProcess(view.id) : undefined;
  const preview =
    getLabProcess(selectedId) ?? labProcesses[0];

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
            <Overview
              selectedId={selectedId}
              preview={preview}
              onSelect={setSelectedId}
              onOpen={(id) => setView({ kind: "detail", id })}
            />
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
              process={selected}
              onBack={() => setView({ kind: "overview" })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Overview({
  selectedId,
  preview,
  onSelect,
  onOpen,
}: {
  selectedId: string;
  preview: LabProcess | undefined;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
}) {
  return (
    <>
      <header className="shrink-0 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-5">
        <p className="text-[10px] tracking-[0.2em] text-[var(--vos-amber)] uppercase">
          En coulisses
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-text)]">
          Labo
        </h2>
        <p className="mt-1 max-w-md text-xs leading-relaxed text-[var(--vos-text-muted)]">
          Processus perso — sélectionne une ligne, ouvre la fiche projet.
        </p>
      </header>

      <div className="overflow-x-auto border-b border-[var(--vos-border)] font-mono text-xs">
        <table className="w-full min-w-[520px] text-left">
          <thead className="bg-[var(--vos-bg)] text-[10px] text-[var(--vos-text-dim)]">
            <tr>
              <th className="px-3 py-2 font-normal">PID</th>
              <th className="px-3 py-2 font-normal">USER</th>
              <th className="px-3 py-2 font-normal">CPU%</th>
              <th className="px-3 py-2 font-normal">MEM%</th>
              <th className="px-3 py-2 font-normal">STAT</th>
              <th className="px-3 py-2 font-normal">COMMAND</th>
            </tr>
          </thead>
          <tbody>
            {labProcesses.map((p) => {
              const active = selectedId === p.id;
              return (
                <tr
                  key={p.id}
                  onClick={() => onSelect(p.id)}
                  onDoubleClick={() => onOpen(p.id)}
                  className={`cursor-pointer border-t border-[var(--vos-border-subtle)] ${
                    active
                      ? "bg-[rgba(232,160,74,0.12)] text-[var(--vos-text)]"
                      : "text-[var(--vos-text-muted)] hover:bg-[var(--vos-bg-elevated)]"
                  }`}
                >
                  <td className="px-3 py-2 tabular-nums text-[var(--vos-amber)]">
                    {p.pid}
                  </td>
                  <td className="px-3 py-2">{p.user}</td>
                  <td className="px-3 py-2 tabular-nums">
                    {p.cpu.toFixed(1)}
                  </td>
                  <td className="px-3 py-2 tabular-nums">
                    {p.mem.toFixed(1)}
                  </td>
                  <td className={`px-3 py-2 ${statusColor[p.status]}`}>
                    {p.status}
                  </td>
                  <td className="truncate px-3 py-2">{p.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {preview && (
        <div className="vos-scroll flex-1 space-y-3 overflow-y-auto p-4 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h3
                className="font-[family-name:var(--font-instrument)] text-lg"
                style={{ color: preview.accent }}
              >
                {preview.name}
              </h3>
              <span className={`text-[10px] ${statusColor[preview.status]}`}>
                {preview.status}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onOpen(preview.id)}
              className="border px-3 py-1.5 text-[11px] transition-colors hover:bg-[var(--vos-bg-elevated)]"
              style={{
                borderColor: `color-mix(in srgb, ${preview.accent} 45%, transparent)`,
                color: preview.accent,
              }}
            >
              Ouvrir la fiche →
            </button>
          </div>
          <p className="text-[11px] text-[var(--vos-text-dim)]">
            $ {preview.command}
          </p>
          <p className="font-sans text-sm leading-relaxed text-[var(--vos-text-muted)]">
            {preview.detail}
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded border border-[var(--vos-border)] bg-[var(--vos-bg)]/50 p-3">
              <p className="text-[10px] text-[var(--vos-text-dim)]">CPU</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--vos-border)]">
                <div
                  className="h-full bg-[var(--vos-copper)]"
                  style={{ width: `${Math.min(100, preview.cpu)}%` }}
                />
              </div>
              <p className="mt-1 tabular-nums text-[var(--vos-text)]">
                {preview.cpu}%
              </p>
            </div>
            <div className="rounded border border-[var(--vos-border)] bg-[var(--vos-bg)]/50 p-3">
              <p className="text-[10px] text-[var(--vos-text-dim)]">MEM</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--vos-border)]">
                <div
                  className="h-full bg-[var(--vos-info)]"
                  style={{ width: `${Math.min(100, preview.mem)}%` }}
                />
              </div>
              <p className="mt-1 tabular-nums text-[var(--vos-text)]">
                {preview.mem}%
              </p>
            </div>
          </div>
          <div className="pt-1">
            <p className="text-[10px] text-[var(--vos-text-dim)]">PROGRESS</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--vos-border)]">
              <div
                className="h-full rounded-full transition-[width]"
                style={{
                  width: `${preview.progress}%`,
                  background: preview.accent,
                }}
              />
            </div>
            <p className="mt-1 tabular-nums text-[var(--vos-text)]">
              {preview.progress}%
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function DetailView({
  process,
  onBack,
}: {
  process: LabProcess;
  onBack: () => void;
}) {
  const countdown =
    process.targetDate != null ? daysUntil(process.targetDate) : null;

  return (
    <>
      <header className="shrink-0 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-4">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 flex items-center gap-1.5 text-[11px] text-[var(--vos-text-muted)] transition-colors hover:text-[var(--vos-amber)]"
        >
          <span aria-hidden>←</span> Labo
        </button>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className={`font-mono text-[10px] ${statusColor[process.status]}`}>
              pid {process.pid} · {process.status}
            </p>
            <h2
              className="mt-1 font-[family-name:var(--font-instrument)] text-3xl leading-none"
              style={{ color: process.accent }}
            >
              {process.title}
            </h2>
            <p className="mt-2 font-mono text-xs text-[var(--vos-copper)]">
              {process.tagline}
            </p>
          </div>
        </div>
      </header>

      <div className="vos-scroll flex-1 overflow-y-auto px-5 py-5">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-[var(--vos-text-dim)]">
            <span>PROGRESS</span>
            <span>{process.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--vos-border)]">
            <div
              className="h-full rounded-full"
              style={{
                width: `${process.progress}%`,
                background: process.accent,
              }}
            />
          </div>
        </div>

        {countdown != null && (
          <div
            className="mb-6 border border-[var(--vos-border)] px-4 py-3"
            style={{
              borderColor: `color-mix(in srgb, ${process.accent} 40%, transparent)`,
            }}
          >
            <p className="font-mono text-[10px] tracking-wider text-[var(--vos-text-dim)] uppercase">
              Countdown éclipse
            </p>
            <p
              className="mt-1 font-[family-name:var(--font-instrument)] text-3xl"
              style={{ color: process.accent }}
            >
              {countdown > 0
                ? `J−${countdown}`
                : countdown === 0
                  ? "Jour J"
                  : `J+${Math.abs(countdown)}`}
            </p>
            <p className="mt-1 font-mono text-[11px] text-[var(--vos-copper)]">
              cible {process.targetDate}
            </p>
          </div>
        )}

        <p className="max-w-prose text-sm leading-relaxed text-[var(--vos-text)]/90">
          {process.body}
        </p>

        {process.metrics && process.metrics.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[var(--vos-border)] py-4 sm:grid-cols-4">
            {process.metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[10px] text-[var(--vos-text-dim)]">
                  {m.label}
                </dt>
                <dd
                  className="mt-1 font-[family-name:var(--font-instrument)] text-xl"
                  style={{ color: process.accent }}
                >
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <section className="mt-6">
          <h3 className="mb-3 font-mono text-[10px] tracking-wider text-[var(--vos-text-dim)] uppercase">
            Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {process.stack.map((s) => (
              <span
                key={s}
                className="border px-2 py-1 font-mono text-[11px]"
                style={{
                  borderColor: `color-mix(in srgb, ${process.accent} 35%, transparent)`,
                  color: process.accent,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <ul className="mt-8 space-y-0 border-t border-[var(--vos-border)] pt-5">
          <li className="mb-3 font-mono text-[10px] tracking-wider text-[var(--vos-text-dim)] uppercase">
            Features / roadmap
          </li>
          {process.features.map((f, i) => (
            <li
              key={f}
              className="flex gap-3 border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
            >
              <span
                className="font-mono text-[10px] tabular-nums"
                style={{ color: process.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-[var(--vos-text-muted)]">{f}</span>
            </li>
          ))}
        </ul>

        {process.spots && process.spots.length > 0 && (
          <section className="mt-8">
            <h3
              className="font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: process.accent }}
            >
              Spots d’observation
            </h3>
            <ul className="mt-4 space-y-0">
              {process.spots.map((s) => (
                <li
                  key={s.id}
                  className="border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
                >
                  <p className="text-sm text-[var(--vos-text)]">{s.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-[var(--vos-copper)]">
                    {s.region}
                  </p>
                  <p className="mt-1 text-sm text-[var(--vos-text-muted)]">
                    {s.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-8">
          <h3
            className="font-[family-name:var(--font-instrument)] text-xl"
            style={{ color: process.accent }}
          >
            Changelog
          </h3>
          <ul className="mt-4 space-y-0">
            {process.changelog.map((c) => (
              <li
                key={`${c.date}-${c.title}`}
                className="border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
              >
                <p className="font-mono text-[10px] text-[var(--vos-copper)]">
                  {c.date}
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--vos-text)]">
                  {c.title}
                </p>
                <p className="mt-1 text-sm text-[var(--vos-text-muted)]">
                  {c.detail}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {process.gallery && process.gallery.length > 0 && (
          <section className="mt-8">
            <h3
              className="mb-4 font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: process.accent }}
            >
              Captures
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {process.gallery.map((photo) => (
                <PhotoBlock
                  key={photo.id}
                  photo={photo}
                  accent={process.accent}
                />
              ))}
            </div>
          </section>
        )}

        <p className="mt-8 font-mono text-[11px] text-[var(--vos-text-dim)]">
          $ {process.command}
        </p>
      </div>
    </>
  );
}
