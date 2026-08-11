export type VeraStatus = "applied" | "running" | "active";

export type VeraPhoto = {
  id: string;
  src: string;
  caption: string;
  placeholder?: boolean;
};

export type VeraMoment = {
  id: string;
  date: string;
  title: string;
  caption: string;
};

export type VeraMetric = {
  label: string;
  value: string;
};

export type VeraFilm = {
  id: string;
  title: string;
  venue: string;
  city: string;
  format: "70mm" | "35mm" | "numérique" | "IMAX";
  date: string;
  note?: string;
};

export type VeraOuting = {
  id: string;
  date: string;
  place: string;
  species: string;
  note: string;
};

export type VeraModule = {
  id: string;
  title: string;
  eyebrow: string;
  status: VeraStatus;
  accent: string;
  summary: string;
  body: string;
  highlights: string[];
  logLines: string[];
  metrics?: VeraMetric[];
  moments?: VeraMoment[];
  gallery?: VeraPhoto[];
  films?: VeraFilm[];
  outings?: VeraOuting[];
};

function ph(moduleId: string, photoId: string, caption: string): VeraPhoto {
  return {
    id: photoId,
    src: `/media/vera/${moduleId}/${photoId}.jpg`,
    caption,
    placeholder: true,
  };
}

export const veraPatch = {
  version: "2.026.08",
  codename: "Patch Vera",
  appliedAt: "2025–2026",
  summary:
    "Mise à jour majeure de l’équilibre personnel. Mode Couple activé. Nouvelles dépendances nature, mycologie et cinéma haute résolution.",
  changelog: [
    "dependency vera@tessin resolved — latence FR↔CH gérée",
    "module balade-ecologique linked — forest.walk() ↑",
    "cinepass.duo authenticated — format=70mm preferred",
    "shared-moments daemon started — sync week-ends",
  ],
};

export const veraModules: VeraModule[] = [
  {
    id: "status",
    title: "Statut relationnel",
    eyebrow: "Core dependency",
    status: "applied",
    accent: "#e89a9a",
    summary:
      "Arrivée de Vera, basée dans le Tessin. Patch appliqué — la latence Suisse ↔ France se gère en trains, vols et week-ends planifiés.",
    body: "Vera n’est pas une feature optionnelle : c’est le runtime. Basée côté Locarno / Maggiore, elle ancre une moitié de la vie dans le Tessin pendant que l’autre tourne entre Rennes, Aix et les sprints Katalyx. Les rituels s’installent : appels du soir, partages de calendrier, et cette habitude de compter les kilomètres en « prochaines fois » plutôt qu’en absences. Le mode couple a basculé sans rollback — avec un buffer voyage obligatoire.",
    highlights: [
      "Base Tessin — famille, lac, rythme alpin sud",
      "Sync week-ends & congés comme pipeline prioritaire",
      "Bilingue FR / IT au quotidien, plus l’allemand qui s’invite",
      "Ancrage émotionnel qui réordonne pro, voyages et lab",
    ],
    logLines: [
      "[ok] dependency vera@tessin resolved",
      "[ok] mode=couple enabled",
      "[warn] weekend sync requires train/flight buffer",
      "[info] timezone CET shared — no DST drift",
    ],
    metrics: [
      { label: "Uptime couple", value: "100%" },
      { label: "Base", value: "Tessin" },
      { label: "Latence moy.", value: "~4h" },
      { label: "Statut", value: "STABLE" },
    ],
    moments: [
      {
        id: "first-tessin",
        date: "2025-11-08",
        title: "Première vraie immersion Tessin",
        caption:
          "Train qui descend vers le lac, premières présentations familiales, et la sensation que le patch est déjà appliqué.",
      },
      {
        id: "calendars",
        date: "2026-01-12",
        title: "Calendriers fusionnés",
        caption:
          "Partage des congés Katalyx / enseignement avec les fenêtres Tessin — le sync devient un sport.",
      },
      {
        id: "carnaval",
        date: "2026-02-14",
        title: "Carnaval Locarno",
        caption:
          "Confettis, masques, et une table trop grande. Preuve que « chez elle » veut aussi dire « chez nous ».",
      },
    ],
    gallery: [
      ph("status", "lac", "Maggiore — fin d’après-midi"),
      ph("status", "table", "Table trop longue, chaises en trop"),
      ph("status", "train", "Gare — sac, thermos, prochain week-end"),
    ],
  },
  {
    id: "nature",
    title: "Nature & mycologie",
    eyebrow: "Balade EcoLogique",
    status: "running",
    accent: "#6bbf8a",
    summary:
      "Vera, bientôt mycologue et guide nature (Balade EcoLogique), a injecté forêt, biodiversité et cueillette dans le quotidien — et une app de terrain côté Labo.",
    body: "Les week-ends ne se terminent plus uniquement en salle obscure : ils commencent souvent sous les hêtres. Vera construit Balade EcoLogique — sorties guidées, pédagogie terrain, regard naturaliste. De mon côté, la curiosité mycologique a muté en brief produit : l’app de saisie champignons du Labo n’est plus un toy project, c’est un compagnon de balade. On croise noms latins, photos floues, et la règle d’or : on ne mange rien qu’on n’identifie pas deux fois.",
    highlights: [
      "Balade EcoLogique — guide nature en construction",
      "Forêts tessinoises & sorties côté France",
      "Cueillettes raisonnables, carnets de terrain",
      "Pont direct avec mycology-app (Labo)",
    ],
    logLines: [
      "[ok] module balade-ecologique linked",
      "[ok] forest.walk() frequency ↑",
      "[info] mycelium curiosity daemon started",
      "[warn] edible=false until dual ID confirmed",
    ],
    metrics: [
      { label: "Balades / an", value: "24+" },
      { label: "Espèces notées", value: "40+" },
      { label: "App terrain", value: "β" },
      { label: "Statut", value: "RUNNING" },
    ],
    moments: [
      {
        id: "first-foray",
        date: "2025-10-18",
        title: "Première foray commune",
        caption:
          "Panier, couteau pliant, et Vera qui corrige gentiment mon « c’est un cèpe » trop optimiste.",
      },
      {
        id: "be-logo",
        date: "2026-03-02",
        title: "Logo Balade EcoLogique",
        caption:
          "Esquisse sur table de cuisine — feuille, spore print, typo trop serrée. Version 0.2 validée.",
      },
      {
        id: "lab-bridge",
        date: "2026-05-20",
        title: "Brief app mycologie",
        caption:
          "Liste de champs terrain dictée entre deux arbres : géoloc, habitat, photo, confiance ID.",
      },
    ],
    outings: [
      {
        id: "o1",
        date: "2025-10-19",
        place: "Bois près de Locarno",
        species: "Amanita muscaria",
        note: "Observation only — photo + notes habitat.",
      },
      {
        id: "o2",
        date: "2025-11-02",
        place: "Forêt de Brocéliande (week-end Bretagne)",
        species: "Boletus edulis",
        note: "Double ID Vera + guide local. Poêlée le soir.",
      },
      {
        id: "o3",
        date: "2026-04-12",
        place: "Sentier Maggia",
        species: "Morchella sp.",
        note: "Printemps précoce — carnet humide, moral haut.",
      },
      {
        id: "o4",
        date: "2026-06-08",
        place: "Parc naturel côté Aix (week-end pro)",
        species: "Cantharellus cibarius",
        note: "Petite trouvaille entre deux syncs Katalyx.",
      },
    ],
    gallery: [
      ph("nature", "panier", "Panier et couteau — départ matinal"),
      ph("nature", "amanite", "Amanite tue-mouches — observation"),
      ph("nature", "carnet", "Carnet de terrain ouvert sous la pluie"),
    ],
  },
  {
    id: "cinema",
    title: "Cinéma haute résolution",
    eyebrow: "Cinépass Duo",
    status: "active",
    accent: "#c4a35a",
    summary:
      "Exploitation intensive du Cinépass Duo. Chasse aux sorties modernes en argentique 70mm dans des salles européennes spécialisées.",
    body: "Le couple a un protocole cinéma : dès qu’une projection 70mm ou une salle culte apparaît dans le rayon train, on bloque. Rennes, Paris, parfois plus loin — le Cinépass Duo tourne à plein régime. On mélange blockbusters en grand format, films d’auteur, et ces séances où le grain de la pellicule justifie le trajet. Vera note les salles ; je note les formats. Ensemble on remplit une filmothèque qui ressemble plus à un carnet de voyage qu’à une liste Netflix.",
    highlights: [
      "Cinépass Duo — rythme quasi hebdomadaire",
      "Priorité projections 70mm / salles spécialisées",
      "Mix blockbusters, auteur, rétros",
      "Filmothèque partagée comme journal",
    ],
    logLines: [
      "[ok] cinepass.duo authenticated",
      "[ok] format=70mm preferred",
      "[info] european specialty theaters indexed",
      "[ok] post-film debate.mode=enabled",
    ],
    metrics: [
      { label: "Films / an", value: "60+" },
      { label: "70mm", value: "12+" },
      { label: "Pass", value: "Duo" },
      { label: "Statut", value: "ACTIVE" },
    ],
    films: [
      {
        id: "f1",
        title: "Dune: Part Three (avant-première)",
        venue: "Grand Rex",
        city: "Paris",
        format: "70mm",
        date: "2026-03-18",
        note: "File d’attente digne d’un festival — worth it.",
      },
      {
        id: "f2",
        title: "Portrait d’une jeune fille en feu (reprise)",
        venue: "Arvor",
        city: "Rennes",
        format: "numérique",
        date: "2025-12-06",
        note: "Débat de sortie plus long que le film.",
      },
      {
        id: "f3",
        title: "Interstellar (reprise IMAX)",
        venue: "Pathé Plan de Campagne",
        city: "Aix",
        format: "IMAX",
        date: "2026-01-24",
        note: "Entre deux sprints Katalyx — reset mental.",
      },
      {
        id: "f4",
        title: "The Brutalist",
        venue: "Le Louxor",
        city: "Paris",
        format: "70mm",
        date: "2025-11-22",
        note: "Vera avait raison sur la salle.",
      },
      {
        id: "f5",
        title: "Anatomy of a Fall",
        venue: "Cinéma Rex",
        city: "Locarno",
        format: "numérique",
        date: "2026-02-15",
        note: "Lendemain de Carnaval — séance douce.",
      },
      {
        id: "f6",
        title: "2001: A Space Odyssey",
        venue: "La Cinémathèque",
        city: "Paris",
        format: "70mm",
        date: "2026-04-02",
        note: "Pèlerinage. Silence dans la salle jusqu’au générique.",
      },
      {
        id: "f7",
        title: "Flow",
        venue: "TNB",
        city: "Rennes",
        format: "numérique",
        date: "2025-10-30",
        note: "Animation + thé après — protocole validé.",
      },
      {
        id: "f8",
        title: "Oppenheimer (reprise 70mm)",
        venue: "UGC Ciné Cité Les Halles",
        city: "Paris",
        format: "70mm",
        date: "2026-05-11",
        note: "Deuxième visionnage, même vertige.",
      },
    ],
    gallery: [
      ph("cinema", "rex", "Façade Grand Rex — soir de 70mm"),
      ph("cinema", "tickets", "Tickets Duo — pile qui grandit"),
      ph("cinema", "debate", "Terrasse post-séance — débat ouvert"),
    ],
  },
  {
    id: "moments",
    title: "Moments partagés",
    eyebrow: "Shared buffer",
    status: "active",
    accent: "#7eb8da",
    summary:
      "Le journal hors modules : week-ends improvisés, petits rituels, et la preuve que le patch tient dans le quotidien autant que dans les grands voyages.",
    body: "Entre Tessin, forêts et salles obscures, il reste le bruit de fond : cafés trop longs, playlists partagées, courses en deux langues, et ces dimanches où personne ne regarde l’horloge. Ce module collecte ce qui ne rentre pas dans une case — la texture du couple au jour le jour. Ce n’est pas du monitoring : c’est la preuve que le système tourne.",
    highlights: [
      "Rituels du quotidien (cafés, playlists, appels)",
      "Week-ends « sans agenda » volontairement",
      "Pont entre voyages, pro et lab sans friction",
      "Archive légère — souvenirs avant stats",
    ],
    logLines: [
      "[ok] shared-moments daemon started",
      "[ok] playlist.sync bidirectional",
      "[info] sunday.mode=soft",
      "[ok] no_metrics_required=true",
    ],
    metrics: [
      { label: "Rituels", value: "∞" },
      { label: "Langues", value: "FR+IT" },
      { label: "Mode", value: "SOFT" },
      { label: "Priorité", value: "P0" },
    ],
    moments: [
      {
        id: "m1",
        date: "2025-12-24",
        title: "Noël entre deux bases",
        caption:
          "Demi-fêtes de chaque côté, valises, et un accord tacite : l’année suivante on invente notre propre protocole.",
      },
      {
        id: "m2",
        date: "2026-03-28",
        title: "Dimanche sans plan",
        caption:
          "Marché, fromage, pluie, film random. Uptime émotionnel maximal.",
      },
      {
        id: "m3",
        date: "2026-06-21",
        title: "Solstice — playlist commune",
        caption:
          "Mix italo-disco + folk breton. Ça ne devrait pas marcher. Ça marche.",
      },
      {
        id: "m4",
        date: "2026-07-19",
        title: "Cattolica — gelato stratégique",
        caption:
          "Après Caparezza, avant le train. Note terrain : toujours un gelato de secours.",
      },
    ],
    gallery: [
      ph("moments", "cafe", "Café trop long — table du fond"),
      ph("moments", "playlist", "Écouteurs partagés, volume trop bas"),
      ph("moments", "rain", "Pluie sur la vitre — dimanche soft"),
    ],
  },
];

export function getVeraModule(id: string): VeraModule | undefined {
  return veraModules.find((m) => m.id === id);
}

export const veraStatusLabel: Record<VeraStatus, string> = {
  applied: "APPLIED",
  running: "RUNNING",
  active: "ACTIVE",
};
