"use client";

import { careerEntries, type ChangelogTag } from "@/content/career";

const tagStyles: Record<ChangelogTag, string> = {
  DEPRECATED: "text-[var(--vos-deprecated)] border-[var(--vos-deprecated)]/40 bg-[rgba(139,115,85,0.12)]",
  "NEW DEPLOYMENT": "text-[var(--vos-success)] border-[var(--vos-success)]/40 bg-[rgba(107,191,138,0.12)]",
  BACKGROUND: "text-[var(--vos-info)] border-[var(--vos-info)]/40 bg-[rgba(122,158,196,0.12)]",
  ARCHITECTURE: "text-[var(--vos-amber)] border-[var(--vos-amber)]/40 bg-[rgba(232,160,74,0.12)]",
};

export function CareerApp() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-[var(--vos-border)] bg-[var(--vos-panel)] px-5 py-4">
        <p className="font-mono text-[10px] tracking-widest text-[var(--vos-dim)] uppercase">
          git log — release notes
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-text)]">
          Career changelog
        </h2>
        <p className="mt-1 font-mono text-xs text-[var(--vos-muted)]">
          Transition entrepreneuriale · uptime pro 2025→2026
        </p>
      </div>
      <div className="flex-1 space-y-0 p-4">
        {careerEntries.map((entry, i) => (
          <article
            key={entry.id}
            className="relative border-l-2 border-[var(--vos-border)] pl-5 pb-8 last:pb-2"
          >
            <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[var(--vos-amber)]" />
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={`rounded border px-1.5 py-0.5 font-mono text-[10px] tracking-wide ${tagStyles[entry.tag]}`}
              >
                [{entry.tag}]
              </span>
              <span className="font-mono text-[10px] text-[var(--vos-dim)]">
                {entry.version} · {entry.date}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-instrument)] text-xl text-[var(--vos-amber)]">
              {entry.title}
            </h3>
            <p className="mt-0.5 font-mono text-xs text-[var(--vos-copper)]">{entry.subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--vos-text)]/90">{entry.body}</p>
            {entry.bullets && (
              <ul className="mt-3 space-y-1.5 border border-[var(--vos-border)] bg-[var(--vos-bg)]/50 p-3 font-mono text-xs text-[var(--vos-muted)]">
                {entry.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-[var(--vos-amber)]">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {i < careerEntries.length - 1 && (
              <div className="mt-4 font-mono text-[10px] text-[var(--vos-dim)]">───</div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
