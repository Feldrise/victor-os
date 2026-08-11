"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export function MenuBar() {
  const [now, setNow] = useState(() => new Date());
  const { theme, toggleTheme } = useTheme();

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
    <header className="vos-menubar-glass absolute inset-x-0 top-0 z-50 flex h-10 items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <span className="font-[family-name:var(--font-instrument)] text-xl leading-none text-[var(--vos-text)] drop-shadow-sm">
          Victor
          <span className="ml-1 text-[var(--vos-rose)]">.</span>
        </span>
        <span className="hidden text-xs text-[var(--vos-dim)] sm:inline">
          Été 2026 · retrouvailles
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs text-[var(--vos-muted)]">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
          className="flex items-center gap-1.5 rounded-full border border-[var(--vos-border)] bg-[var(--vos-panel)]/55 px-2.5 py-1 text-[var(--vos-text)] backdrop-blur-sm transition hover:border-[var(--vos-teal)]/60"
        >
          <span aria-hidden>{theme === "dark" ? "☾" : "☀"}</span>
          <span className="hidden sm:inline">{theme === "dark" ? "Sombre" : "Clair"}</span>
        </button>
        <span className="tabular-nums drop-shadow-sm">
          {date} · {time}
        </span>
      </div>
    </header>
  );
}
