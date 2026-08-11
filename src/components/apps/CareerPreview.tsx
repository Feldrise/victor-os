"use client";

import type { ReactNode } from "react";

type Props = {
  activityId: string;
  title: string;
  accent: string;
  url?: string;
};

export function CareerPreview({ activityId, title, accent, url }: Props) {
  if (activityId === "katalyx") {
    return <KatalyxPreview accent={accent} url={url} />;
  }
  if (activityId === "webisport") {
    return <WebisportPreview accent={accent} url={url} />;
  }
  return <GenericPreview title={title} accent={accent} url={url} />;
}

function PreviewShell({
  children,
  accent,
}: {
  children: ReactNode;
  accent: string;
}) {
  return (
    <div
      className="relative flex h-full min-h-0 flex-col overflow-auto"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 20% 0%, color-mix(in srgb, ${accent} 28%, transparent), transparent 55%),
          linear-gradient(165deg, var(--vos-bg-elevated) 0%, var(--vos-bg) 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {children}
    </div>
  );
}

function KatalyxPreview({ accent, url }: { accent: string; url?: string }) {
  const poles = [
    {
      label: "Agents IA",
      sub: "Audit → pilote → prod · 90 j",
    },
    {
      label: "LinkedIn B2B",
      sub: "2 → 12 RDV / mois / commercial",
    },
    {
      label: "Parkour · Katapulse",
      sub: "Prospection & contenu à l’échelle",
    },
    {
      label: "Développement",
      sub: "Logiciel, mobile, IP 100 % client",
    },
  ];

  return (
    <PreviewShell accent={accent}>
      <header className="relative z-[1] flex items-center justify-between border-b border-[var(--vos-border-subtle)] px-6 py-4">
        <div>
          <span
            className="font-[family-name:var(--font-instrument)] text-xl tracking-tight"
            style={{ color: accent }}
          >
            Katalyx
          </span>
          <p className="mt-0.5 font-mono text-[10px] text-[var(--vos-text-dim)]">
            Édition · 2026 / Volume · 01 · 43.5297° N · 5.4474° E
          </p>
        </div>
        <nav className="hidden gap-5 text-[11px] text-[var(--vos-text-muted)] sm:flex">
          <span>Agents</span>
          <span>LinkedIn</span>
          <span>SaaS</span>
          <span>Dev</span>
        </nav>
      </header>

      <main className="relative z-[1] flex flex-1 flex-col justify-center px-6 py-8 sm:px-10">
        <p
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ color: accent }}
        >
          Studio tech · 67 Cours Mirabeau · Aix-en-Provence
        </p>
        <h1 className="mt-3 max-w-xl font-[family-name:var(--font-instrument)] text-3xl leading-tight text-[var(--vos-text)] sm:text-4xl">
          Vos équipes n’ont plus à faire ce qu’un Agent IA fait mieux qu’elles.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--vos-text-muted)]">
          Agents IA sur mesure, logiciels & apps, moteur LinkedIn B2B, et deux
          SaaS qui industrialisent la pratique : Parkour (prospection) et
          Katapulse (contenu). Méthode AIFlow — de l’audit à la prod en ~90 jours.
        </p>

        <div className="mt-5 flex flex-wrap gap-6 font-mono text-[11px] text-[var(--vos-text-dim)]">
          <span>
            <strong className="text-[var(--vos-text)]">47+</strong> entreprises
          </span>
          <span>
            <strong className="text-[var(--vos-text)]">4,9</strong> / 5 Google
          </span>
          <span>
            <strong className="text-[var(--vos-text)]">3,2×</strong> ROI moyen
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <span
            className="inline-flex items-center px-4 py-2 text-xs font-medium text-[var(--vos-bg)]"
            style={{ background: accent }}
          >
            Diagnostic flash gratuit
          </span>
          {url && (
            <span className="inline-flex items-center border border-[var(--vos-border)] px-4 py-2 text-xs text-[var(--vos-text-muted)]">
              {url.replace(/^https?:\/\//, "")}
            </span>
          )}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {poles.map((p) => (
            <div
              key={p.label}
              className="border border-[var(--vos-border-subtle)] bg-[var(--vos-bg)]/40 px-3 py-3"
            >
              <p className="text-sm text-[var(--vos-text)]">{p.label}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-[var(--vos-text-dim)]">
                {p.sub}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-[1] border-t border-[var(--vos-border-subtle)] px-6 py-3 text-[10px] text-[var(--vos-text-dim)]">
        Aperçu reconstruit — katalyx.fr refuse l’intégration iframe
      </footer>
    </PreviewShell>
  );
}

function WebisportPreview({ accent, url }: { accent: string; url?: string }) {
  const features = [
    { t: "Convocations", d: "Réponses temps réel" },
    { t: "Fil d’actu", d: "Fini WhatsApp" },
    { t: "Paiements", d: "Cotisations & stages" },
    { t: "Partenaires", d: "Nouveaux revenus" },
    { t: "Compétitions", d: "Calendriers auto" },
    { t: "Wikisport", d: "Pédagogie club" },
  ];

  return (
    <PreviewShell accent={accent}>
      <header className="relative z-[1] flex items-center justify-between px-6 py-4">
        <span
          className="font-[family-name:var(--font-instrument)] text-xl font-semibold tracking-tight"
          style={{ color: accent }}
        >
          Webisport
        </span>
        <span
          className="px-3 py-1.5 text-[10px] font-medium text-[var(--vos-bg)]"
          style={{ background: accent }}
        >
          iOS & Android
        </span>
      </header>

      <main className="relative z-[1] flex flex-1 flex-col px-6 pb-8 sm:px-10">
        <div className="mt-2 max-w-lg">
          <p className="text-[10px] tracking-[0.18em] text-[var(--vos-text-dim)] uppercase">
            Solutions digitales · sport amateur
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-instrument)] text-3xl leading-tight text-[var(--vos-text)] sm:text-[2.4rem]">
            Une application à vos couleurs.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--vos-text-muted)]">
            Adhérents, partenaires et supporters sur l’app ; le staff gère depuis
            le site fourni. Groupes, convocations, présences, bénévoles,
            compétitions synchronisées, messagerie sans numéros exposés.
          </p>
        </div>

        <div className="mt-7 grid flex-1 grid-cols-1 gap-4 sm:grid-cols-[1.1fr_1fr]">
          <div
            className="flex flex-col justify-between border border-[var(--vos-border)] bg-[var(--vos-bg)]/50 p-4"
            style={{ boxShadow: `inset 3px 0 0 ${accent}` }}
          >
            <div>
              <p className="text-[10px] text-[var(--vos-text-dim)]">Matchday</p>
              <p className="mt-1 text-sm text-[var(--vos-text)]">
                U15 · Dimanche 10:00
              </p>
              <p className="mt-3 font-mono text-[11px] text-[var(--vos-text-muted)]">
                12 / 14 confirmés · 2 en attente
              </p>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--vos-border)]">
              <div
                className="h-full w-[85%] rounded-full"
                style={{ background: accent }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.t}
                className="border border-[var(--vos-border-subtle)] bg-[var(--vos-bg-elevated)]/60 px-2 py-3"
              >
                <p className="text-xs text-[var(--vos-text)]">{f.t}</p>
                <p className="mt-0.5 text-[10px] text-[var(--vos-text-dim)]">
                  {f.d}
                </p>
              </div>
            ))}
          </div>
        </div>

        {url && (
          <p className="mt-6 text-[10px] text-[var(--vos-text-dim)]">
            {url.replace(/^https?:\/\//, "")}
          </p>
        )}
      </main>

      <footer className="relative z-[1] border-t border-[var(--vos-border-subtle)] px-6 py-3 text-[10px] text-[var(--vos-text-dim)]">
        Aperçu reconstruit — affichage de secours si l’iframe est bloquée
      </footer>
    </PreviewShell>
  );
}

function GenericPreview({
  title,
  accent,
  url,
}: {
  title: string;
  accent: string;
  url?: string;
}) {
  return (
    <PreviewShell accent={accent}>
      <div className="relative z-[1] flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p
          className="font-[family-name:var(--font-instrument)] text-3xl"
          style={{ color: accent }}
        >
          {title}
        </p>
        {url && (
          <p className="mt-3 text-sm text-[var(--vos-text-muted)]">
            {url.replace(/^https?:\/\//, "")}
          </p>
        )}
        <p className="mt-6 max-w-sm text-xs text-[var(--vos-text-dim)]">
          Aperçu indisponible pour ce site dans le navigateur simulé.
        </p>
      </div>
    </PreviewShell>
  );
}
