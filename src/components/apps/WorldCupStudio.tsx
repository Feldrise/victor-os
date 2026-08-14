"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useDesktop } from "@/components/os/DesktopContext";
import type {
  Passion,
  WcChannel,
  WcMatch,
  WcMatchTone,
} from "@/content/sports";

function shortDate(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${d}.${m}`;
}

const toneRing: Partial<Record<WcMatchTone, string>> = {
  ghost: "opacity-55 grayscale",
  snippet: "border-dashed",
  pride: "shadow-[inset_3px_0_0_#e01e37]",
  underdog: "shadow-[inset_3px_0_0_#e8b86a]",
  night: "shadow-[inset_3px_0_0_#6a8fad]",
  finale: "shadow-[inset_3px_0_0_#c4a35a]",
};

function ScoreBug({
  match,
  accent,
  size = "md",
}: {
  match: WcMatch;
  accent: string;
  size?: "sm" | "md" | "lg";
}) {
  const big = size === "lg";
  const sm = size === "sm";

  return (
    <article
      className={`relative overflow-hidden border border-[var(--vos-border)] bg-[var(--vos-bg)]/55 ${
        match.tone ? (toneRing[match.tone] ?? "") : ""
      }`}
    >
      <div
        className={`flex items-center justify-between gap-2 font-mono tracking-wider text-[var(--vos-text-dim)] uppercase ${
          sm ? "px-2 pt-1.5 text-[8px]" : "px-2.5 pt-2 text-[9px]"
        }`}
      >
        <span>{match.stage}</span>
        <time dateTime={match.date}>{shortDate(match.date)}</time>
      </div>

      <div
        className={`flex items-end justify-between gap-2 ${
          sm ? "px-2 pb-2 pt-1" : "px-2.5 pb-2.5 pt-1"
        }`}
      >
        <div className="min-w-0">
          <p
            className={`leading-none text-[var(--vos-text)] ${
              big
                ? "font-[family-name:var(--font-instrument)] text-xl"
                : sm
                  ? "font-mono text-[11px]"
                  : "font-mono text-xs"
            }`}
          >
            {match.leftCode}
            <span className="mx-1.5 text-[var(--vos-text-dim)]">·</span>
            {match.rightCode}
          </p>
          {!sm && (
            <p className="mt-1 truncate text-[10px] text-[var(--vos-text-muted)]">
              {match.left} — {match.right}
            </p>
          )}
        </div>
        <p
          className={`shrink-0 leading-none tabular-nums ${
            big
              ? "font-[family-name:var(--font-instrument)] text-4xl"
              : sm
                ? "font-[family-name:var(--font-instrument)] text-lg"
                : "font-[family-name:var(--font-instrument)] text-2xl"
          }`}
          style={{ color: match.tone === "ghost" ? "var(--vos-text-dim)" : accent }}
        >
          {match.score}
        </p>
      </div>

      {(match.suffix || match.note) && (
        <p
          className={`border-t border-[var(--vos-border-subtle)] text-[var(--vos-text-muted)] ${
            sm ? "px-2 py-1 text-[10px]" : "px-2.5 py-1.5 text-[11px]"
          } ${match.note ? "italic" : "font-mono not-italic"}`}
        >
          {match.suffix && (
            <span className="mr-1.5 font-mono not-italic text-[var(--vos-copper)]">
              {match.suffix}
            </span>
          )}
          {match.note}
        </p>
      )}
    </article>
  );
}

function ChannelBezel({
  channel,
  children,
  className = "",
}: {
  channel: WcChannel;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden border border-[var(--vos-border)] ${className}`}
      style={{
        background: `linear-gradient(165deg, color-mix(in srgb, ${channel.accent} 16%, var(--vos-bg-elevated)) 0%, var(--vos-bg) 42%)`,
        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${channel.accent} 22%, transparent)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: channel.accent, opacity: 0.55 }}
        aria-hidden
      />
      {children}
    </section>
  );
}

function ChannelHead({
  channel,
  extra,
}: {
  channel: WcChannel;
  extra?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-2 px-3 pt-3 pb-2">
      <div>
        <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--vos-text-dim)]">
          CH-{channel.ch} · {channel.screen}
        </p>
        <h3
          className="mt-0.5 font-[family-name:var(--font-instrument)] text-xl leading-none"
          style={{ color: channel.accent }}
        >
          {channel.title}
        </h3>
        <p className="mt-1 font-mono text-[10px] text-[var(--vos-text-muted)]">
          {channel.place}
        </p>
      </div>
      {extra}
    </header>
  );
}

export function WorldCupStudio({
  passion,
  onBack,
}: {
  passion: Passion;
  onBack: () => void;
}) {
  const studio = passion.wc;
  const { openApp } = useDesktop();

  if (!studio) return null;

  const byId = Object.fromEntries(
    studio.channels.map((c) => [c.id, c]),
  ) as Record<string, WcChannel>;

  const missed = byId.missed;
  const now = byId.now;
  const hellfest = byId.hellfest;
  const home = byId.home;
  const fox = byId.fox;
  const delirium = byId.delirium;
  const roazhon = byId.roazhon;
  const finale = byId.finale;
  const nightMatch = roazhon?.matches.find((m) => m.tone === "night");
  const clubMatches = roazhon?.matches.filter((m) => m.tone !== "night") ?? [];
  const finalMatch = finale?.matches.find((m) => m.tone === "finale");
  const thirdPlace = finale?.matches.find((m) => m.id === "fra-eng");

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.55) 3px)",
        }}
        aria-hidden
      />

      <header className="relative z-[3] shrink-0 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-4">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 flex items-center gap-1.5 text-[11px] text-[var(--vos-text-muted)] transition-colors hover:text-[var(--vos-amber)]"
        >
          <span aria-hidden>←</span> Passions
        </button>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-[var(--vos-copper)] uppercase">
              <span
                className="vos-uptime-pulse inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: passion.accent }}
                aria-hidden
              />
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

      <div className="vos-scroll relative z-[3] flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        <div className="grid gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--vos-text-dim)] uppercase">
              {studio.kicker}
            </p>
            <h3 className="mt-2 max-w-lg font-[family-name:var(--font-instrument)] text-[1.65rem] leading-[1.15] text-[var(--vos-text)]">
              {studio.manifestoTitle}
            </h3>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-[var(--vos-text-muted)]">
              {studio.manifesto}
            </p>
          </motion.div>

          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {studio.loyalties.map((l, i) => (
              <motion.li
                key={l.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.08 * i,
                  duration: 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border border-[var(--vos-border)] bg-[var(--vos-bg)]/40 px-3 py-2.5"
              >
                <p
                  className="font-mono text-[10px] tracking-wider"
                  style={{ color: passion.accent }}
                >
                  {l.code}
                </p>
                <p className="font-[family-name:var(--font-instrument)] text-base leading-none text-[var(--vos-text)]">
                  {l.name}
                </p>
                <p className="mt-1.5 text-[11px] leading-snug text-[var(--vos-text-muted)]">
                  {l.line}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        <p className="mt-7 mb-3 font-mono text-[10px] tracking-[0.2em] text-[var(--vos-text-dim)] uppercase">
          Mur d’écrans
        </p>

        {missed && (
          <ChannelBezel channel={missed}>
            <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-stretch">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--vos-text-dim)]">
                  CH-{missed.ch} · {missed.screen}
                </p>
                <h3
                  className="mt-0.5 font-[family-name:var(--font-instrument)] text-xl leading-none"
                  style={{ color: missed.accent }}
                >
                  {missed.title}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--vos-text-muted)]">
                  {missed.body}
                </p>
              </div>
              <div className="relative sm:w-[16.5rem]">
                <div
                  className="pointer-events-none absolute inset-0 z-[1] opacity-45 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                  aria-hidden
                />
                {missed.matches.map((m) => (
                  <ScoreBug key={m.id} match={m} accent={missed.accent} />
                ))}
              </div>
            </div>
          </ChannelBezel>
        )}

        {now && (
          <ChannelBezel channel={now} className="mt-3">
            <ChannelHead channel={now} />
            <p className="px-3 pb-3 text-[12px] leading-relaxed text-[var(--vos-text-muted)]">
              {now.body}
            </p>
            <div className="flex flex-col gap-2 px-3 pb-3">
              {now.matches[0] && (
                <ScoreBug
                  match={now.matches[0]}
                  accent={now.accent}
                  size="md"
                />
              )}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {now.matches.slice(1).map((m) => (
                  <ScoreBug
                    key={m.id}
                    match={m}
                    accent={now.accent}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          </ChannelBezel>
        )}

        {hellfest && (
          <ChannelBezel channel={hellfest} className="mt-3">
            <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-stretch">
              <div className="sm:w-[42%]">
                <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--vos-text-dim)]">
                  CH-{hellfest.ch} · {hellfest.screen}
                </p>
                <h3
                  className="mt-0.5 font-[family-name:var(--font-instrument)] text-2xl leading-none"
                  style={{ color: hellfest.accent }}
                >
                  {hellfest.title}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--vos-text-muted)]">
                  {hellfest.body}
                </p>
              </div>
              <div className="flex-1">
                {hellfest.matches.map((m) => (
                  <ScoreBug
                    key={m.id}
                    match={m}
                    accent={hellfest.accent}
                    size="lg"
                  />
                ))}
              </div>
            </div>
          </ChannelBezel>
        )}

        {home && (
          <ChannelBezel channel={home} className="mt-3">
            <ChannelHead channel={home} />
            <p className="px-3 pb-3 text-[12px] leading-relaxed text-[var(--vos-text-muted)]">
              {home.body}
            </p>
            <div className="grid grid-cols-2 gap-2 px-3 pb-3 sm:grid-cols-3">
              {home.matches.map((m) => (
                <ScoreBug
                  key={m.id}
                  match={m}
                  accent={
                    m.tone === "pride"
                      ? "#e01e37"
                      : m.tone === "underdog"
                        ? "#e8b86a"
                        : home.accent
                  }
                  size="sm"
                />
              ))}
            </div>
          </ChannelBezel>
        )}

        {fox && (
          <ChannelBezel channel={fox} className="mt-3">
            <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-stretch">
              <div className="sm:w-[42%]">
                <p className="font-mono text-[9px] tracking-[0.22em] text-[var(--vos-text-dim)]">
                  CH-{fox.ch} · {fox.screen}
                </p>
                <h3
                  className="mt-0.5 font-[family-name:var(--font-instrument)] text-2xl leading-none"
                  style={{ color: fox.accent }}
                >
                  {fox.title}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-[var(--vos-text-muted)]">
                  {fox.body}
                </p>
              </div>
              <div className="flex-1">
                {fox.matches.map((m) => (
                  <ScoreBug
                    key={m.id}
                    match={m}
                    accent={fox.accent}
                    size="lg"
                  />
                ))}
              </div>
            </div>
          </ChannelBezel>
        )}

        {delirium && (
          <ChannelBezel channel={delirium} className="mt-3">
            <ChannelHead channel={delirium} />
            <p className="px-3 pb-3 text-[12px] leading-relaxed text-[var(--vos-text-muted)]">
              {delirium.body}
            </p>
            <div className="grid grid-cols-1 gap-2 px-3 pb-3 sm:grid-cols-2">
              {delirium.matches.map((m) => (
                <ScoreBug
                  key={m.id}
                  match={m}
                  accent={delirium.accent}
                  size="md"
                />
              ))}
            </div>
          </ChannelBezel>
        )}

        {roazhon && (
          <ChannelBezel channel={roazhon} className="mt-3">
            <ChannelHead
              channel={roazhon}
              extra={
                roazhon.travelHint ? (
                  <button
                    type="button"
                    onClick={() => openApp("travel")}
                    className="font-mono text-[10px] text-[var(--vos-text-dim)] transition-colors hover:text-[var(--vos-amber)]"
                  >
                    {roazhon.travelHint} →
                  </button>
                ) : null
              }
            />
            <p className="px-3 pb-3 text-[12px] leading-relaxed text-[var(--vos-text-muted)]">
              {roazhon.body}
            </p>
            <div className="grid grid-cols-2 gap-2 px-3 pb-3 sm:grid-cols-3">
              {clubMatches.map((m) => (
                <ScoreBug
                  key={m.id}
                  match={m}
                  accent={roazhon.accent}
                  size="sm"
                />
              ))}
            </div>
            {nightMatch && (
              <div className="mx-3 mb-3 border border-[var(--vos-border)] bg-[color-mix(in_srgb,var(--vos-bg)_55%,#1a3048)] p-3">
                <p className="font-mono text-[9px] tracking-[0.2em] text-[#6a8fad] uppercase">
                  03:00 · encore allumé
                </p>
                <div className="mt-2">
                  <ScoreBug
                    match={nightMatch}
                    accent="#8ab4d4"
                    size="lg"
                  />
                </div>
              </div>
            )}
          </ChannelBezel>
        )}

        {finale && finalMatch && (
          <ChannelBezel channel={finale} className="mt-3 mb-2">
            <div className="px-3 pt-4 pb-2 text-center">
              <p className="font-mono text-[9px] tracking-[0.28em] text-[var(--vos-text-dim)]">
                CH-{finale.ch} · {finale.screen}
              </p>
              <h3
                className="mt-2 font-[family-name:var(--font-instrument)] text-3xl leading-none sm:text-4xl"
                style={{ color: finale.accent }}
              >
                {finale.title}
              </h3>
              <p className="mx-auto mt-3 max-w-md text-[12px] leading-relaxed text-[var(--vos-text-muted)]">
                {finale.body}
              </p>
            </div>

            {thirdPlace && (
              <div className="mx-3 mb-2">
                <ScoreBug
                  match={thirdPlace}
                  accent={passion.accent}
                  size="md"
                />
              </div>
            )}

            <div className="mx-3 mb-4 border border-[var(--vos-border)] bg-[var(--vos-bg)]/70 px-3 py-5 text-center">
              <p className="font-mono text-[10px] tracking-[0.24em] text-[var(--vos-copper)] uppercase">
                {finalMatch.stage}
              </p>
              <p className="mt-3 font-mono text-xs tracking-[0.18em] text-[var(--vos-text)]">
                {finalMatch.leftCode}
                <span className="mx-2 text-[var(--vos-text-dim)]">vs</span>
                {finalMatch.rightCode}
              </p>
              <p
                className="mt-2 font-[family-name:var(--font-instrument)] text-6xl leading-none sm:text-7xl"
                style={{ color: finale.accent }}
              >
                {finalMatch.score}
              </p>
              {finalMatch.suffix && (
                <p className="mt-2 font-mono text-[11px] text-[var(--vos-copper)]">
                  {finalMatch.suffix}
                </p>
              )}
              <p className="mt-3 text-sm italic text-[var(--vos-text-muted)]">
                {finalMatch.note}
              </p>
            </div>
          </ChannelBezel>
        )}
      </div>
    </div>
  );
}
