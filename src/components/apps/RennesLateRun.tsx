"use client";

import { motion } from "motion/react";
import { useDesktop } from "@/components/os/DesktopContext";
import type { Passion, RennesMatch } from "@/content/sports";

function shortDate(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${d}.${m}`;
}

function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M12 1.6 14.7 8l6.7.6-5.1 4.5 1.6 6.6L12 16.4 6.1 19.7l1.6-6.6L2.6 8.6 9.3 8z" />
    </svg>
  );
}

function LapCard({
  match,
  accent,
  featured,
  muted,
}: {
  match: RennesMatch;
  accent: string;
  featured?: boolean;
  muted?: boolean;
}) {
  const win = match.result === "W";

  return (
    <article
      className={`relative overflow-hidden border ${
        featured ? "p-4 sm:p-5" : "p-3"
      } ${muted ? "opacity-80" : ""}`}
      style={{
        borderColor: featured ? accent : "var(--vos-border)",
        background: featured
          ? `linear-gradient(135deg, color-mix(in srgb, ${accent} 22%, var(--vos-bg)) 0%, var(--vos-bg) 58%)`
          : "color-mix(in srgb, var(--vos-bg) 70%, transparent)",
        boxShadow: featured ? `inset 4px 0 0 ${accent}` : undefined,
      }}
    >
      <div className="flex items-center justify-between gap-2 font-mono text-[9px] tracking-[0.18em] text-[var(--vos-text-dim)] uppercase">
        <span>
          {match.round}
          {match.label ? ` · ${match.label}` : ""}
        </span>
        <time dateTime={match.date}>{shortDate(match.date)}</time>
      </div>

      <div
        className={`mt-2 flex items-end justify-between gap-3 ${
          featured ? "mt-3" : ""
        }`}
      >
        <div className="min-w-0">
          <p
            className={`leading-none text-[var(--vos-text)] ${
              featured
                ? "font-[family-name:var(--font-instrument)] text-2xl"
                : "font-mono text-xs"
            }`}
          >
            {match.leftCode}
            <span className="mx-1.5 text-[var(--vos-text-dim)]">·</span>
            {match.rightCode}
          </p>
          <p className="mt-1 truncate text-[11px] text-[var(--vos-text-muted)]">
            {match.left} — {match.right}
          </p>
        </div>
        <div className="text-right">
          <p
            className={`leading-none tabular-nums ${
              featured
                ? "font-[family-name:var(--font-instrument)] text-5xl"
                : "font-[family-name:var(--font-instrument)] text-2xl"
            }`}
            style={{ color: win ? accent : "var(--vos-text-muted)" }}
          >
            {match.score}
          </p>
          <p
            className="mt-1 font-mono text-[9px] tracking-wider uppercase"
            style={{ color: win ? accent : "var(--vos-text-dim)" }}
          >
            {win ? "victoire" : "défaite"}
          </p>
        </div>
      </div>
    </article>
  );
}

export function RennesLateRun({
  passion,
  onBack,
}: {
  passion: Passion;
  onBack: () => void;
}) {
  const run = passion.rennes;
  const { openApp } = useDesktop();
  if (!run) return null;

  const [derby, ...rest] = run.matches;
  const last = rest[rest.length - 1];
  const mid = rest.slice(0, -1);
  const aside = run.aside;
  const gold = "#c4a35a";

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-1.5"
        style={{ background: passion.accent }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(-18deg, ${passion.accent} 0 1px, transparent 1px 14px)`,
        }}
        aria-hidden
      />

      <header className="relative z-[2] shrink-0 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-4">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 flex items-center gap-1.5 text-[11px] text-[var(--vos-text-muted)] transition-colors hover:text-[var(--vos-amber)]"
        >
          <span aria-hidden>←</span> Passions
        </button>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--vos-copper)] uppercase">
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
              className="font-[family-name:var(--font-instrument)] text-3xl leading-none"
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

      <div className="vos-scroll relative z-[2] flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--vos-text-dim)] uppercase">
            {run.kicker}
          </p>
          <h3 className="mt-2 max-w-lg font-[family-name:var(--font-instrument)] text-[1.65rem] leading-[1.15] text-[var(--vos-text)]">
            {run.manifestoTitle}
          </h3>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-[var(--vos-text-muted)]">
            {run.manifesto}
          </p>
        </motion.div>

        <section
          className="mt-6 border border-[var(--vos-border)] px-3 py-3"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in srgb, var(--vos-teal) 14%, var(--vos-bg)) 0%, var(--vos-bg) 62%)",
          }}
        >
          <header className="mb-3 flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--vos-text-dim)]">
                {run.prologue.kicker}
              </p>
              <h3 className="mt-0.5 font-[family-name:var(--font-instrument)] text-xl leading-none text-[var(--vos-teal)]">
                {run.prologue.title}
              </h3>
            </div>
            {run.prologue.travelHint && (
              <button
                type="button"
                onClick={() => openApp("travel")}
                className="font-mono text-[10px] text-[var(--vos-text-dim)] transition-colors hover:text-[var(--vos-amber)]"
              >
                {run.prologue.travelHint} →
              </button>
            )}
          </header>
          <p className="mb-3 text-[12px] leading-relaxed text-[var(--vos-text-muted)]">
            {run.prologue.body}
          </p>
          <LapCard
            match={run.prologue.match}
            accent={passion.accent}
            featured
          />
        </section>

        <section
          className="relative mt-5 overflow-hidden border px-4 py-5"
          style={{
            borderColor: gold,
            background: `radial-gradient(ellipse at 12% 20%, color-mix(in srgb, ${gold} 28%, transparent), transparent 52%), linear-gradient(165deg, color-mix(in srgb, ${gold} 10%, var(--vos-bg-elevated)), var(--vos-bg) 70%)`,
          }}
        >
          <Star className="pointer-events-none absolute -top-6 -right-4 h-36 w-36 text-[color-mix(in_srgb,#c4a35a_18%,transparent)]" />
          <p
            className="font-mono text-[10px] tracking-[0.28em] uppercase"
            style={{ color: gold }}
          >
            {run.hope.kicker}
          </p>
          <p
            className="mt-2 font-[family-name:var(--font-instrument)] text-[2.4rem] leading-[0.9] sm:text-5xl"
            style={{ color: gold }}
          >
            C1
          </p>
          <h3 className="mt-2 max-w-md font-[family-name:var(--font-instrument)] text-2xl leading-tight text-[var(--vos-text)]">
            {run.hope.title}
          </h3>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-[var(--vos-text-muted)]">
            {run.hope.body}
          </p>
        </section>

        <section
          className="relative mt-5 overflow-hidden border border-[var(--vos-border)]"
          style={{
            background: `linear-gradient(165deg, color-mix(in srgb, ${passion.accent} 12%, var(--vos-bg-elevated)) 0%, var(--vos-bg) 50%)`,
          }}
        >
          <header className="flex flex-wrap items-end justify-between gap-2 border-b border-[var(--vos-border)] px-4 py-3">
            <div>
              <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--vos-text-dim)]">
                TABLE UNIQUE · COURSE C1
              </p>
              <h3
                className="mt-0.5 font-[family-name:var(--font-instrument)] text-xl leading-none"
                style={{ color: passion.accent }}
              >
                {run.venueName}
              </h3>
              <p className="mt-1.5 text-[12px] text-[var(--vos-text-muted)]">
                {run.venueLine}
              </p>
            </div>
            <p className="text-right font-mono text-[11px] leading-snug">
              <span className="text-[var(--vos-text-dim)] line-through">
                C1
              </span>
              <span className="mt-0.5 block text-[var(--vos-copper)]">
                {run.finish}
              </span>
            </p>
          </header>

          <div className="flex flex-col gap-3 p-3">
            {derby && (
              <LapCard match={derby} accent={passion.accent} featured />
            )}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {mid.map((m) => (
                <LapCard key={m.id} match={m} accent={passion.accent} />
              ))}
            </div>
            {last && (
              <LapCard match={last} accent={passion.accent} muted />
            )}
          </div>
        </section>

        <aside className="mt-5 mb-2 border border-dashed border-[var(--vos-border)] bg-[var(--vos-bg)]/40 px-4 py-4">
          <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--vos-text-dim)] uppercase">
            {aside.kicker} · {shortDate(aside.date)}
          </p>
          <h4 className="mt-1 font-[family-name:var(--font-instrument)] text-lg text-[var(--vos-copper)]">
            {aside.title}
          </h4>
          <p className="mt-1 text-[12px] italic text-[var(--vos-text-muted)]">
            {aside.body}
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <p className="font-mono text-xs tracking-[0.14em] text-[var(--vos-text)]">
              {aside.leftCode}
              <span className="mx-2 text-[var(--vos-text-dim)]">vs</span>
              {aside.rightCode}
            </p>
            <p className="text-right">
              <span className="font-[family-name:var(--font-instrument)] text-3xl leading-none text-[var(--vos-copper)]">
                {aside.score}
              </span>
              <span className="ml-2 font-mono text-[11px] text-[var(--vos-text-dim)]">
                {aside.suffix}
              </span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
