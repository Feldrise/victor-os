"use client";

import { useEffect, useState } from "react";
import { veraPatch } from "@/content/vera";

export function PatchVeraApp() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="relative overflow-hidden border-b border-[var(--vos-border)] bg-[var(--vos-panel)] px-5 py-5">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(232,160,74,0.35), transparent 45%), radial-gradient(circle at 10% 90%, rgba(107,191,138,0.25), transparent 40%)",
          }}
        />
        <p className="relative font-mono text-[10px] tracking-widest text-[var(--vos-dim)] uppercase">
          system update utility
        </p>
        <h2 className="relative mt-1 font-[family-name:var(--font-instrument)] text-3xl text-[var(--vos-text)]">
          {veraPatch.codename}
        </h2>
        <p className="relative mt-1 font-mono text-xs text-[var(--vos-amber)]">
          v{veraPatch.version} · applied {veraPatch.appliedAt}
        </p>
        <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--vos-bg)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--vos-copper)] to-[var(--vos-amber)] transition-[width] duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="relative mt-2 font-mono text-[10px] text-[var(--vos-muted)]">
          {progress < 100 ? `Applying patch… ${progress}%` : "Patch applied successfully ✓"}
        </p>
      </div>

      <div className="space-y-4 p-4">
        <p className="text-sm leading-relaxed text-[var(--vos-text)]/90">{veraPatch.summary}</p>

        {veraPatch.sections.map((section) => (
          <section
            key={section.id}
            className="rounded-lg border border-[var(--vos-border)] bg-[var(--vos-bg)]/40 p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="font-[family-name:var(--font-instrument)] text-lg text-[var(--vos-amber)]">
                {section.title}
              </h3>
              <span className="rounded border border-[var(--vos-success)]/40 bg-[rgba(107,191,138,0.1)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--vos-success)]">
                {section.status}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--vos-muted)]">{section.body}</p>
            <pre className="mt-3 overflow-x-auto rounded border border-[var(--vos-border)] bg-[#0c0d12] p-3 font-mono text-[11px] leading-relaxed text-[var(--vos-success)]/90">
              {section.logLines.join("\n")}
            </pre>
          </section>
        ))}
      </div>
    </div>
  );
}
