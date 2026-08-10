"use client";

import { useEffect, useState } from "react";

export function MenuBar() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <header className="relative z-50 flex h-9 items-center justify-between border-b border-[var(--vos-border)] bg-[rgba(18,20,26,0.92)] px-3 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="font-[family-name:var(--font-instrument)] text-lg leading-none text-[var(--vos-amber)]">
          VictorOS
        </span>
        <span className="hidden font-mono text-[10px] tracking-widest text-[var(--vos-dim)] uppercase sm:inline">
          Release 2026.08
        </span>
      </div>
      <div className="flex items-center gap-4 font-mono text-[11px] text-[var(--vos-muted)]">
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="vos-uptime-pulse inline-block h-1.5 w-1.5 rounded-full bg-[var(--vos-success)]" />
          uptime ok
        </span>
        <span className="tabular-nums">
          {date} · {time}
        </span>
      </div>
    </header>
  );
}
