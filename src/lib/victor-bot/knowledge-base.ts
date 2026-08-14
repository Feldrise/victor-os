/**
 * Structured knowledge base for Victor-Bot.
 * Built from the dashboard content modules so the chat stays in sync.
 * Server-only — do not import from client components.
 */
import { careerActivities } from "@/content/career";
import { labProcesses } from "@/content/lab";
import { passions } from "@/content/sports";
import { travelTrips } from "@/content/travel";
import { veraModules, veraPatch } from "@/content/vera";

const identityBrief = `
## Identité
- Prénom : Victor
- Base : Rennes / Bretagne — entrepreneur tech, IA au quotidien depuis plus d'un an
- Stack perso : Linux, Docker Compose, i3wm, expérimentations LLM locaux
- Apps du dashboard : Pro (Feldrise / Katalyx / Webisport / Ynov), Vera, Voyages, Passions (Rennes, Mondial, ping, Bretagne), Labo
- Mascotte officieuse du couple : un koala en peluche (voyages, photos, fond d'écran)
`.trim();

const discreetNote = `
## Note personnelle — ne jamais ouvrir en premier
- Victor est apprenti franc-maçon, au Rite Écossais Ancien et Accepté (REAA). C'est un fait privé, pas un axe du bilan, pas un hobby à lister.
- Seul indice déjà dans Passions : l'ouverture du Mondial (Mexique–Afrique du Sud, 11 juin 2026) a été manquée parce qu'il était en tenue.
- Si on pose une question directe (franc-maçon, loge, REAA, apprenti, « tenu », pourquoi ce match manqué) : confirmer sobrement le grade et le rite, éventuellement le lien factuel avec l'ouverture. Une ou deux phrases. Ton calme, zéro théâtre.
- Ne jamais : nom de loge, obédience, rituels, signes, paroles, travaux, identités, recrutement, pédagogie maçonnique, « c'est secret ». Pas de mystère cheap non plus.
- Ne jamais proposer le sujet. Ne jamais l'inclure dans un résumé, une liste d'activités, ou une invitation à creuser.
`.trim();

function bullets(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function careerBlock(): string {
  const blocks = careerActivities.map((activity) => {
    const head = [
      `### ${activity.title} — ${activity.role} (${activity.period}${activity.location ? ` · ${activity.location}` : ""}) [${activity.status}]`,
      activity.body,
      activity.url ? `URL : ${activity.url}` : null,
      bullets(activity.highlights),
    ].filter(Boolean);

    const metrics = activity.metrics
      ?.map((m) => `${m.label}: ${m.value}`)
      .join(" · ");
    if (metrics) head.push(`Preuves : ${metrics}`);

    for (const section of activity.sections ?? []) {
      head.push(`**${section.title}**${section.body ? ` — ${section.body}` : ""}`);
      if (section.items) {
        head.push(
          bullets(section.items.map((item) => `${item.title} : ${item.detail}`)),
        );
      }
    }

    return head.join("\n");
  });

  return `## Pro\n${blocks.join("\n\n")}`;
}

function veraBlock(): string {
  const header = [
    `## Perso / Vera (${veraPatch.codename} v${veraPatch.version})`,
    veraPatch.summary,
    bullets(veraPatch.changelog),
  ];

  const modules = veraModules.map((mod) => {
    const lines = [
      `### ${mod.title} [${mod.status}]`,
      mod.body,
      bullets(mod.highlights),
    ];
    if (mod.metrics) {
      lines.push(
        `Métriques : ${mod.metrics.map((m) => `${m.label} ${m.value}`).join(" · ")}`,
      );
    }
    if (mod.films?.length) {
      lines.push("Films récents (Cinépass Duo Pathé) :");
      lines.push(
        bullets(
          mod.films.map((film) => {
            const aka = film.originalTitle ? ` / ${film.originalTitle}` : "";
            const series = film.series ? ` · ${film.series}` : "";
            return `${film.title}${aka} (${film.year}${series}) — ${film.verdict}. ${film.synopsis}`;
          }),
        ),
      );
    }
    return lines.join("\n");
  });

  return [header.join("\n"), ...modules].join("\n\n");
}

function travelBlock(): string {
  const trips = travelTrips.map((trip) => {
    const lines = [
      `### ${trip.name} (${trip.region}) — ${trip.timing} [${trip.kind}${trip.recurrent ? ", récurrent" : ""}]`,
      trip.body,
      bullets(trip.highlights),
    ];

    for (const chapter of trip.chapters ?? []) {
      lines.push(
        `**${chapter.label}** · ${chapter.timing} — ${chapter.mood}\n${chapter.body}\n${bullets(chapter.highlights)}`,
      );
    }

    return lines.join("\n");
  });

  return `## Voyages\n${trips.join("\n\n")}`;
}

function labBlock(): string {
  const processes = labProcesses.map((p) => {
    return `- ${p.name} [${p.status}, ${p.progress}%] — ${p.detail} (${p.command})`;
  });
  return `## Lab / R&D\n${processes.join("\n")}`;
}

function passionsBlock(): string {
  const blocks = passions.map((passion) => {
    const lines = [
      `### ${passion.title} — ${passion.subtitle} (${passion.value}${passion.unit ? ` ${passion.unit}` : ""})`,
      passion.body,
      bullets(passion.highlights),
    ];

    if (passion.metrics) {
      lines.push(
        `Métriques : ${passion.metrics.map((m) => `${m.label} ${m.value}`).join(" · ")}`,
      );
    }

    if (passion.rennes) {
      const r = passion.rennes;
      lines.push(`**${r.manifestoTitle}** — ${r.manifesto}`);
      lines.push(`Salle : ${r.venueName} — ${r.venueLine}`);
      lines.push(`Classement final : ${r.finish}`);
      lines.push(
        `Prologue ${r.prologue.title} (${r.prologue.kicker}) : ${r.prologue.body} ${r.prologue.match.left} ${r.prologue.match.score} ${r.prologue.match.right} (${r.prologue.match.date}).`,
      );
      lines.push(`${r.hope.title} : ${r.hope.body}`);
      lines.push(
        bullets(
          r.matches.map(
            (m) =>
              `${m.date} ${m.round}${m.label ? ` ${m.label}` : ""} : ${m.left} ${m.score} ${m.right} (${m.result})`,
          ),
        ),
      );
      lines.push(
        `Aside ${r.aside.title} (${r.aside.date}) : ${r.aside.body} ${r.aside.left} ${r.aside.score} ${r.aside.right} ${r.aside.suffix}.`,
      );
    }

    if (passion.wc) {
      const wc = passion.wc;
      lines.push(`**${wc.manifestoTitle}** (${wc.kicker}) — ${wc.manifesto}`);
      lines.push(
        `Fidélités : ${wc.loyalties.map((l) => `${l.name} — ${l.line}`).join(" / ")}`,
      );
      for (const ch of wc.channels) {
        lines.push(
          `CH${ch.ch} ${ch.title} · ${ch.place} (${ch.screen}) : ${ch.body}`,
        );
        lines.push(
          bullets(
            ch.matches.map((m) => {
              const extra = [m.suffix, m.note].filter(Boolean).join(" — ");
              return `${m.date} ${m.stage} : ${m.left} ${m.score} ${m.right}${extra ? ` (${extra})` : ""}`;
            }),
          ),
        );
      }
    }

    if (passion.spots) {
      lines.push(
        bullets(
          passion.spots.map((s) => {
            const feat = s.featured ? " [clou]" : "";
            return `${s.name} (${s.city}, ${s.vibe})${feat} — ${s.note}`;
          }),
        ),
      );
    }

    if (passion.rituals) {
      lines.push(
        bullets(passion.rituals.map((r) => `${r.title} : ${r.detail}`)),
      );
    }

    if (passion.places) {
      lines.push(
        `Lieux : ${passion.places.map((p) => `${p.name} (${p.note})`).join(" · ")}`,
      );
    }

    return lines.join("\n");
  });

  return `## Sports & culture (Passions)\n${blocks.join("\n\n")}`;
}

export const knowledgeBase = [
  "# Victor — bilan 2025–2026 (Release 2026.08)",
  "Source unique : contenu des apps du dashboard. Ne pas inventer au-delà.",
  identityBrief,
  careerBlock(),
  veraBlock(),
  travelBlock(),
  labBlock(),
  passionsBlock(),
  discreetNote,
].join("\n\n");
