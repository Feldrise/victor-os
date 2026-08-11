"use client";

import { useEffect, useRef, useState } from "react";
import { CareerPreview } from "@/components/apps/CareerPreview";

type Props = {
  activityId: string;
  title: string;
  url: string;
  accent: string;
  embedAllowed?: boolean;
};

type EmbedState = "loading" | "embedded" | "fallback";

const EMBED_TIMEOUT_MS = 2800;

export function SimulatedBrowser({
  activityId,
  title,
  url,
  accent,
  embedAllowed = true,
}: Props) {
  const [state, setState] = useState<EmbedState>(
    embedAllowed ? "loading" : "fallback",
  );
  const settled = useRef(false);

  useEffect(() => {
    settled.current = false;
    if (!embedAllowed) {
      setState("fallback");
      return;
    }
    setState("loading");
    const timer = window.setTimeout(() => {
      if (!settled.current) {
        settled.current = true;
        setState("fallback");
      }
    }, EMBED_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [url, embedAllowed]);

  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--vos-bg)]">
      <div className="flex shrink-0 items-center gap-2 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-3 py-2">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded border border-[var(--vos-border)] bg-[var(--vos-bg)] px-3 py-1.5">
          <span className="shrink-0 text-[10px] text-[var(--vos-text-dim)]">
            🔒
          </span>
          <span className="truncate font-mono text-[11px] text-[var(--vos-text-muted)]">
            {host}
          </span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded border border-[var(--vos-border)] px-2.5 py-1.5 text-[10px] text-[var(--vos-text-muted)] transition-colors hover:border-[var(--vos-amber)]/50 hover:text-[var(--vos-amber)]"
        >
          Nouvel onglet ↗
        </a>
      </div>

      <div className="relative min-h-0 flex-1">
        {state === "loading" && (
          <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-3 bg-[var(--vos-bg)]">
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--vos-border)] border-t-transparent"
              style={{ borderTopColor: accent }}
            />
            <p className="font-mono text-[11px] text-[var(--vos-text-dim)]">
              Chargement de {title}…
            </p>
          </div>
        )}

        {state !== "fallback" && embedAllowed && (
          <iframe
            key={url}
            src={url}
            title={title}
            className={`absolute inset-0 h-full w-full border-0 bg-[var(--vos-bg)] ${
              state === "embedded" ? "opacity-100" : "opacity-0"
            }`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={(e) => {
              if (settled.current) return;
              const frame = e.currentTarget;
              window.setTimeout(() => {
                if (settled.current) return;
                try {
                  const href = frame.contentWindow?.location.href ?? "";
                  if (!href || href === "about:blank") {
                    settled.current = true;
                    setState("fallback");
                    return;
                  }
                  settled.current = true;
                  setState("fallback");
                } catch {
                  settled.current = true;
                  setState("embedded");
                }
              }, 350);
            }}
            onError={() => {
              if (settled.current) return;
              settled.current = true;
              setState("fallback");
            }}
          />
        )}

        {state === "fallback" && (
          <div className="absolute inset-0">
            <CareerPreview
              activityId={activityId}
              title={title}
              accent={accent}
              url={url}
            />
          </div>
        )}
      </div>
    </div>
  );
}
