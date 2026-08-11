"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  getVeraModule,
  veraModules,
  veraPatch,
  veraStatusLabel,
  type VeraModule,
  type VeraPhoto,
  type VeraStatus,
} from "@/content/vera";

type View = { kind: "overview" } | { kind: "detail"; id: string };

const statusTone: Record<VeraStatus, string> = {
  applied: "text-[var(--vos-success)]",
  running: "text-[var(--vos-info)]",
  active: "text-[var(--vos-amber)]",
};

function PhotoBlock({
  photo,
  accent,
}: {
  photo: VeraPhoto;
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

export function PatchVeraApp() {
  const [view, setView] = useState<View>({ kind: "overview" });
  const selected =
    view.kind === "detail" ? getVeraModule(view.id) : undefined;

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
              module={selected}
              onBack={() => setView({ kind: "overview" })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Overview({ onOpen }: { onOpen: (id: string) => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <header className="relative shrink-0 overflow-hidden border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-5">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(232,160,74,0.35), transparent 45%), radial-gradient(circle at 10% 90%, rgba(232,154,154,0.3), transparent 40%)",
          }}
        />
        <p className="relative text-[10px] tracking-[0.2em] text-[var(--vos-rose)] uppercase">
          Mise à jour majeure
        </p>
        <h2 className="relative mt-1 font-[family-name:var(--font-instrument)] text-3xl text-[var(--vos-text)]">
          {veraPatch.codename}
        </h2>
        <p className="relative mt-1 font-mono text-xs text-[var(--vos-amber)]">
          v{veraPatch.version} · {veraPatch.appliedAt}
        </p>
        <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--vos-bg)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--vos-copper)] to-[var(--vos-amber)] transition-[width] duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="relative mt-2 font-mono text-[10px] text-[var(--vos-text-muted)]">
          {progress < 100
            ? `Applying patch… ${progress}%`
            : "Patch applied successfully ✓"}
        </p>
        <p className="relative mt-3 max-w-md text-xs leading-relaxed text-[var(--vos-text-muted)]">
          {veraPatch.summary}
        </p>
      </header>

      <div className="vos-scroll flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        <ul className="mb-6 space-y-1 border-b border-[var(--vos-border)] pb-5 font-mono text-[11px] text-[var(--vos-success)]/90">
          <li className="mb-2 text-[10px] tracking-wider text-[var(--vos-text-dim)] uppercase">
            Changelog
          </li>
          {veraPatch.changelog.map((line) => (
            <li key={line} className="py-0.5">
              · {line}
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-1">
          {veraModules.map((mod, i) => (
            <motion.li
              key={mod.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.04 * i,
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                type="button"
                onClick={() => onOpen(mod.id)}
                className="group flex w-full gap-4 border-b border-[var(--vos-border-subtle)] py-4 text-left transition-colors last:border-b-0 hover:bg-[var(--vos-bg-elevated)]/40"
              >
                <span
                  className="mt-1.5 h-10 w-[3px] shrink-0 self-stretch rounded-full opacity-80 transition-opacity group-hover:opacity-100"
                  style={{ background: mod.accent }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      className="font-[family-name:var(--font-instrument)] text-xl transition-colors group-hover:text-[var(--vos-amber)]"
                      style={{ color: mod.accent }}
                    >
                      {mod.title}
                    </span>
                    <span
                      className={`font-mono text-[10px] ${statusTone[mod.status]}`}
                    >
                      {veraStatusLabel[mod.status]}
                    </span>
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-[var(--vos-copper)]">
                    {mod.eyebrow}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-[var(--vos-text-muted)]">
                    {mod.summary}
                  </span>
                </span>
                <span className="mt-1 shrink-0 text-[var(--vos-text-dim)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--vos-amber)]">
                  →
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
}

function DetailView({
  module,
  onBack,
}: {
  module: VeraModule;
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
          <span aria-hidden>←</span> Patch Vera
        </button>
        <div>
          <p className={`font-mono text-[10px] ${statusTone[module.status]}`}>
            {veraStatusLabel[module.status]} · {module.eyebrow}
          </p>
          <h2
            className="mt-1 font-[family-name:var(--font-instrument)] text-3xl leading-none"
            style={{ color: module.accent }}
          >
            {module.title}
          </h2>
        </div>
      </header>

      <div className="vos-scroll flex-1 overflow-y-auto px-5 py-5">
        <p className="max-w-prose text-sm leading-relaxed text-[var(--vos-text)]/90">
          {module.body}
        </p>

        {module.metrics && module.metrics.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[var(--vos-border)] py-4 sm:grid-cols-4">
            {module.metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[10px] text-[var(--vos-text-dim)]">
                  {m.label}
                </dt>
                <dd
                  className="mt-1 font-[family-name:var(--font-instrument)] text-xl"
                  style={{ color: module.accent }}
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
          {module.highlights.map((h, i) => (
            <li
              key={h}
              className="flex gap-3 border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
            >
              <span
                className="font-mono text-[10px] tabular-nums"
                style={{ color: module.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-[var(--vos-text-muted)]">{h}</span>
            </li>
          ))}
        </ul>

        {module.moments && module.moments.length > 0 && (
          <section className="mt-8">
            <h3
              className="font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: module.accent }}
            >
              Timeline
            </h3>
            <ul className="mt-4 space-y-0">
              {module.moments.map((m) => (
                <li
                  key={m.id}
                  className="border-b border-[var(--vos-border-subtle)] py-4 last:border-b-0"
                >
                  <p className="font-mono text-[10px] text-[var(--vos-copper)]">
                    {m.date}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--vos-text)]">
                    {m.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--vos-text-muted)]">
                    {m.caption}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {module.films && module.films.length > 0 && (
          <section className="mt-8">
            <h3
              className="font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: module.accent }}
            >
              Filmothèque
            </h3>
            <ul className="mt-4 space-y-0">
              {module.films.map((f) => (
                <li
                  key={f.id}
                  className="flex flex-col gap-1 border-b border-[var(--vos-border-subtle)] py-3 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <p className="text-sm text-[var(--vos-text)]">{f.title}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-[var(--vos-text-dim)]">
                      {f.venue} · {f.city}
                      {f.note ? ` — ${f.note}` : ""}
                    </p>
                  </div>
                  <div className="shrink-0 font-mono text-[10px] text-[var(--vos-copper)]">
                    {f.date} · {f.format}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {module.outings && module.outings.length > 0 && (
          <section className="mt-8">
            <h3
              className="font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: module.accent }}
            >
              Sorties terrain
            </h3>
            <ul className="mt-4 space-y-0">
              {module.outings.map((o) => (
                <li
                  key={o.id}
                  className="border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm text-[var(--vos-text)]">{o.place}</p>
                    <p className="font-mono text-[10px] text-[var(--vos-copper)]">
                      {o.date}
                    </p>
                  </div>
                  <p
                    className="mt-1 font-mono text-[11px]"
                    style={{ color: module.accent }}
                  >
                    {o.species}
                  </p>
                  <p className="mt-1 text-sm text-[var(--vos-text-muted)]">
                    {o.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {module.gallery && module.gallery.length > 0 && (
          <section className="mt-8">
            <h3
              className="mb-4 font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: module.accent }}
            >
              Galerie
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {module.gallery.map((photo) => (
                <PhotoBlock
                  key={photo.id}
                  photo={photo}
                  accent={module.accent}
                />
              ))}
            </div>
          </section>
        )}

        <pre className="mt-8 overflow-x-auto rounded border border-[var(--vos-border)] bg-[#0c0d12] p-3 font-mono text-[11px] leading-relaxed text-[var(--vos-success)]/90">
          {module.logLines.join("\n")}
        </pre>
      </div>
    </>
  );
}
