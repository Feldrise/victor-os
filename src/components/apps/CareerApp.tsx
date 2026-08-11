"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  careerActivities,
  type CareerActivity,
  type CareerStatus,
} from "@/content/career";
import { useDesktop } from "@/components/os/DesktopContext";

type View = { kind: "list" } | { kind: "detail"; id: string };

const statusLabel: Record<CareerStatus, string> = {
  active: "En cours",
  ended: "Clos",
  ongoing: "Continu",
};

const statusTone: Record<CareerStatus, string> = {
  active: "text-[var(--vos-success)]",
  ended: "text-[var(--vos-deprecated)]",
  ongoing: "text-[var(--vos-info)]",
};

export function CareerApp() {
  const [view, setView] = useState<View>({ kind: "list" });
  const { openBrowser } = useDesktop();

  const selected =
    view.kind === "detail"
      ? careerActivities.find((a) => a.id === view.id)
      : undefined;

  return (
    <div className="vos-scroll relative flex h-full min-h-0 flex-col overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {view.kind === "list" && (
          <motion.div
            key="list"
            className="flex h-full min-h-0 flex-col"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ListView onOpen={(id) => setView({ kind: "detail", id })} />
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
              activity={selected}
              onBack={() => setView({ kind: "list" })}
              onOpenSite={() => {
                if (!selected.url) return;
                openBrowser({
                  activityId: selected.id,
                  title: selected.title,
                  url: selected.url,
                  accent: selected.accent,
                  embedAllowed: selected.embedAllowed,
                });
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ListView({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <>
      <header className="shrink-0 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-5">
        <p className="text-[10px] tracking-[0.2em] text-[var(--vos-rose)] uppercase">
          Côté boulot
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-text)]">
          Activités
        </h2>
        <p className="mt-1 max-w-md text-xs leading-relaxed text-[var(--vos-text-muted)]">
          Quatre fils — ce qui s’est fermé, ce qui tourne, ce qui se transmet.
        </p>
      </header>

      <div className="vos-scroll flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        <ul className="flex flex-col gap-1">
          {careerActivities.map((activity, i) => (
            <motion.li
              key={activity.id}
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
                onClick={() => onOpen(activity.id)}
                className="group flex w-full gap-4 border-b border-[var(--vos-border-subtle)] py-4 text-left transition-colors last:border-b-0 hover:bg-[var(--vos-bg-elevated)]/40"
              >
                <span
                  className="mt-1.5 h-10 w-[3px] shrink-0 self-stretch rounded-full opacity-80 transition-opacity group-hover:opacity-100"
                  style={{ background: activity.accent }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      className="font-[family-name:var(--font-instrument)] text-xl transition-colors group-hover:text-[var(--vos-amber)]"
                      style={{ color: activity.accent }}
                    >
                      {activity.title}
                    </span>
                    <span
                      className={`font-mono text-[10px] ${statusTone[activity.status]}`}
                    >
                      {statusLabel[activity.status]}
                    </span>
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-[var(--vos-copper)]">
                    {activity.role}
                    {activity.location ? ` · ${activity.location}` : ""}
                    {" · "}
                    {activity.period}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-[var(--vos-text-muted)]">
                    {activity.summary}
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
  activity,
  onBack,
  onOpenSite,
}: {
  activity: CareerActivity;
  onBack: () => void;
  onOpenSite: () => void;
}) {
  return (
    <>
      <header className="shrink-0 border-b border-[var(--vos-border)] bg-[var(--vos-bg-panel)] px-5 py-4">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 flex items-center gap-1.5 text-[11px] text-[var(--vos-text-muted)] transition-colors hover:text-[var(--vos-amber)]"
        >
          <span aria-hidden>←</span> Activités
        </button>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p
              className={`font-mono text-[10px] ${statusTone[activity.status]}`}
            >
              {statusLabel[activity.status]}
            </p>
            <h2
              className="mt-1 font-[family-name:var(--font-instrument)] text-3xl leading-none"
              style={{ color: activity.accent }}
            >
              {activity.title}
            </h2>
            <p className="mt-2 font-mono text-xs text-[var(--vos-copper)]">
              {activity.role}
              {activity.location ? ` · ${activity.location}` : ""}
              {" · "}
              {activity.period}
            </p>
          </div>
          {activity.url && (
            <button
              type="button"
              onClick={onOpenSite}
              className="shrink-0 border px-4 py-2 text-xs transition-colors"
              style={{
                borderColor: `color-mix(in srgb, ${activity.accent} 45%, transparent)`,
                color: activity.accent,
              }}
            >
              Ouvrir le site →
            </button>
          )}
        </div>
      </header>

      <div className="vos-scroll flex-1 overflow-y-auto px-5 py-5">
        <p className="max-w-prose text-sm leading-relaxed text-[var(--vos-text)]/90">
          {activity.body}
        </p>

        {activity.metrics && activity.metrics.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[var(--vos-border)] py-4 sm:grid-cols-4">
            {activity.metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[10px] text-[var(--vos-text-dim)]">
                  {m.label}
                </dt>
                <dd
                  className="mt-1 font-[family-name:var(--font-instrument)] text-xl"
                  style={{ color: activity.accent }}
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
          {activity.highlights.map((h, i) => (
            <li
              key={h}
              className="flex gap-3 border-b border-[var(--vos-border-subtle)] py-3 last:border-b-0"
            >
              <span
                className="font-mono text-[10px] tabular-nums"
                style={{ color: activity.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-[var(--vos-text-muted)]">{h}</span>
            </li>
          ))}
        </ul>

        {activity.sections?.map((section) => (
          <section key={section.title} className="mt-8">
            <h3
              className="font-[family-name:var(--font-instrument)] text-xl"
              style={{ color: activity.accent }}
            >
              {section.title}
            </h3>
            {section.body && (
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-[var(--vos-text-muted)]">
                {section.body}
              </p>
            )}
            {section.items && (
              <ul className="mt-4 space-y-4">
                {section.items.map((item) => (
                  <li key={item.title} className="relative pl-4">
                    <span
                      className="absolute top-1.5 left-0 h-2 w-2 rounded-full"
                      style={{ background: activity.accent }}
                      aria-hidden
                    />
                    <p className="text-sm font-medium text-[var(--vos-text)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--vos-text-muted)]">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {activity.url && (
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[var(--vos-border)] pt-6 pb-2">
            <button
              type="button"
              onClick={onOpenSite}
              className="px-5 py-2.5 text-sm text-[var(--vos-bg)] transition-opacity hover:opacity-90"
              style={{ background: activity.accent }}
            >
              Ouvrir dans le navigateur
            </button>
            <a
              href={activity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--vos-text-dim)] underline-offset-2 hover:text-[var(--vos-text-muted)] hover:underline"
            >
              {activity.url.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
      </div>
    </>
  );
}
