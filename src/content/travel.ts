export type TravelKind = "leisure" | "work" | "music" | "family";

export type TravelPhoto = {
  id: string;
  /** Path under public/, or empty → CSS placeholder */
  src: string;
  caption: string;
  placeholder?: boolean;
};

export type JournalEntry = {
  id: string;
  /** ISO date for sorting */
  date: string;
  title: string;
  body: string;
  photos?: TravelPhoto[];
};

export type TravelTrip = {
  id: string;
  name: string;
  region: string;
  summary: string;
  body: string;
  /** Display label */
  timing: string;
  /** ISO start for timeline sort; recurrent trips use a sentinel far future */
  startDate: string;
  endDate?: string;
  lat: number;
  lng: number;
  accent: string;
  kind: TravelKind;
  highlights: string[];
  journal: JournalEntry[];
  cover?: TravelPhoto;
  /** When true, sorted after dated trips in the timeline */
  recurrent?: boolean;
};

function ph(
  tripId: string,
  photoId: string,
  caption: string,
): TravelPhoto {
  return {
    id: photoId,
    src: `/media/travel/${tripId}/${photoId}.jpg`,
    caption,
    placeholder: true,
  };
}

export const travelTrips: TravelTrip[] = [
  {
    id: "tessin",
    name: "Tessin",
    region: "Suisse",
    summary:
      "Visites dans la famille de Vera — Carnaval, fête nationale, et base relationnelle côté Alpes sud.",
    body: "Le Tessin revient comme un point d’ancrage : famille de Vera, rituels locaux, et la sensation de basculer d’un calendrier pro français vers un rythme alpin. Février pour le Carnaval, août pour le 1er août — deux passages qui structurent l’année autant que les sprints Katalyx.",
    timing: "Février & Août 2026",
    startDate: "2026-02-10",
    endDate: "2026-08-03",
    lat: 46.0037,
    lng: 8.9511,
    accent: "#e8a04a",
    kind: "family",
    highlights: [
      "Carnaval tessinois en février",
      "Fête nationale suisse (1er août)",
      "Base familiale côté Vera",
    ],
    cover: ph("tessin", "cover", "Lago Maggiore — rive sud, fin d’après-midi"),
    journal: [
      {
        id: "tessin-carnaval",
        date: "2026-02-14",
        title: "Carnaval sous les masques",
        body: "Défilé dans les rues de Locarno, confettis partout, et cette impression que le village entier a basculé en mode fête. Première vraie immersion côté famille élargie — conversations en italien, en allemand, et en français mélangés sans effort.",
        photos: [
          ph("tessin", "carnaval-1", "Chars et confettis — Locarno"),
          ph("tessin", "carnaval-2", "Masques sur la piazza"),
        ],
      },
      {
        id: "tessin-lago",
        date: "2026-02-16",
        title: "Matinée sur le lac",
        body: "Balade le long du Maggiore avant le train du retour. Brume basse, cyprès, et Vera qui pointe les sommets encore enneigés. Notes pour plus tard : revenir en été quand la lumière change.",
        photos: [ph("tessin", "lago-1", "Quai calme, brume du matin")],
      },
      {
        id: "tessin-aout",
        date: "2026-08-01",
        title: "1er août — feux et fondue",
        body: "Feux d’artifice sur le lac, drapeaux partout, et une table trop longue pour le nombre de chaises. La fête nationale suisse vue de l’intérieur : moins de spectacle TV, plus de voisinage.",
        photos: [
          ph("tessin", "aout-1", "Drapeaux le long de la route"),
          ph("tessin", "aout-2", "Feux d’artifice depuis la terrasse"),
        ],
      },
    ],
  },
  {
    id: "cairngorms",
    name: "Cairngorms",
    region: "Écosse",
    summary:
      "Road trip immersif d’une dizaine de jours dans le parc national — navigation, paysages, et saturation de vert et de brume.",
    body: "Dix jours à rouler et marcher dans le plus grand parc national du Royaume-Uni. Pas de checklist touristique : plutôt une immersion lente — météo changeante toutes les vingt minutes, tracks GPS, pubs de village, et cette obsession de photographier la même colline sous trois lumières différentes.",
    timing: "Mai 2026",
    startDate: "2026-05-08",
    endDate: "2026-05-18",
    lat: 57.12,
    lng: -3.68,
    accent: "#6bbf8a",
    kind: "leisure",
    highlights: [
      "Parc national · ~10 jours",
      "Navigation & tracks hors sentiers balisés",
      "Brume, landes, et pubs de village",
    ],
    cover: ph("cairngorms", "cover", "Landes vers Aviemore — ciel bas"),
    journal: [
      {
        id: "cairn-arrival",
        date: "2026-05-08",
        title: "Arrivée à Aviemore",
        body: "Voiture louée, pluie fine dès la sortie de l’aéroport d’Inverness. Check-in dans un cottage trop chaud, carte OS déployée sur la table. Premier café trop fort. Le plan : ne pas trop planifier.",
        photos: [ph("cairngorms", "arrival-1", "Carte OS et thermos sur le tableau de bord")],
      },
      {
        id: "cairn-ridge",
        date: "2026-05-11",
        title: "Crête dans le vent",
        body: "Montée longue, vent de face, et un moment où le GPS et le sentier ne sont plus d’accord. On suit le relief. En haut : vue blanche, silence, et sandwich mangé trop vite parce que les doigts gelaient.",
        photos: [
          ph("cairngorms", "ridge-1", "Sentier qui disparaît dans la brume"),
          ph("cairngorms", "ridge-2", "Sommet — vent horizontal"),
        ],
      },
      {
        id: "cairn-loch",
        date: "2026-05-14",
        title: "Loch calme, journée rare",
        body: "Soleil réel pendant quatre heures — événement météo. Reflets sur l’eau, un cerf au loin, et zéro photo réussie du cerf. Les photos de l’eau, elles, sont trop nombreuses.",
        photos: [
          ph("cairngorms", "loch-1", "Reflets matinaux"),
          ph("cairngorms", "loch-2", "Pierres au bord de l’eau"),
        ],
      },
      {
        id: "cairn-last",
        date: "2026-05-17",
        title: "Dernière soirée pub",
        body: "Whisky local, conversation avec un couple de randonneurs allemands, et la liste mentale de ce qu’on n’a pas vu. Demain : route vers l’aéroport. Les bottes ne sécheront jamais vraiment.",
        photos: [ph("cairngorms", "pub-1", "Comptoir de village — dernière pinte")],
      },
    ],
  },
  {
    id: "hellfest",
    name: "Clisson",
    region: "Hellfest",
    summary:
      "Pèlerinage musical au Hellfest. Pic de décibels validé sur le monitoring auditif.",
    body: "Clisson en juin : boue ou poussière selon l’année, mais toujours le même rituel — planning de scènes, file pour les bières, et cette fatigue heureuse du dimanche soir. Hellfest reste le marqueur musical de l’année, calibré autant pour le son que pour les retrouvailles.",
    timing: "Juin 2026",
    startDate: "2026-06-19",
    endDate: "2026-06-22",
    lat: 47.0869,
    lng: -1.2817,
    accent: "#d46a6a",
    kind: "music",
    highlights: [
      "Weekend festival · Clisson",
      "Scènes principales + découvertes late-night",
      "Monitoring auditif : pic validé",
    ],
    cover: ph("hellfest", "cover", "Mainstage — golden hour avant le set"),
    journal: [
      {
        id: "hf-jeudi",
        date: "2026-06-19",
        title: "Jeudi — installation",
        body: "Tente montée trop près d’un passage. Bracelet scanné, première bière trop chère, et déjà un t-shirt de groupe qu’on ne connaissait pas. La carte des scènes devient la seule vérité.",
        photos: [ph("hellfest", "camp-1", "Campement — allée centrale")],
      },
      {
        id: "hf-samedi",
        date: "2026-06-21",
        title: "Samedi — le gros set",
        body: "Foule compacte, basses qui résonnent dans la cage thoracique, et ce moment où on arrête de photographier pour juste être là. Oreilles qui sifflent ensuite — prévisible, accepté.",
        photos: [
          ph("hellfest", "main-1", "Foule face mainstage"),
          ph("hellfest", "main-2", "Lumières depuis le fond"),
        ],
      },
      {
        id: "hf-dimanche",
        date: "2026-06-22",
        title: "Dimanche — descente",
        body: "Derniers sets, tente pliée sous une pluie légère, route du retour en silence. Playlist rejouée en voiture pour prolonger. Clisson au rétroviseur.",
        photos: [ph("hellfest", "leave-1", "Parking au petit matin")],
      },
    ],
  },
  {
    id: "cattolica",
    name: "Cattolica / Rimini",
    region: "Italie",
    summary:
      "Exploration de la côte adriatique et concert de Caparezza en direct avec Vera.",
    body: "Côte adriatique en juillet : plages, gelati, et un concert de Caparezza comme prétexte officiel. Entre les baignades et les soirées, le rythme est volontairement lent — contrasté avec les allers-retours pro du Sud de la France.",
    timing: "Juillet 2026",
    startDate: "2026-07-12",
    endDate: "2026-07-20",
    lat: 43.9586,
    lng: 12.7369,
    accent: "#e8956a",
    kind: "leisure",
    highlights: [
      "Côte adriatique · Cattolica / Rimini",
      "Concert Caparezza avec Vera",
      "Rythme estival volontairement lent",
    ],
    cover: ph("cattolica", "cover", "Plage au coucher — parasols encore ouverts"),
    journal: [
      {
        id: "cat-arrivee",
        date: "2026-07-12",
        title: "Arrivée côté mer",
        body: "Appartement à deux rues de la plage. Première baignade avant même de défaire les valises. Vera déjà en mode guide local improvisé — même si c’est aussi sa première fois ici.",
        photos: [ph("cattolica", "beach-1", "Première baignade — eau tiède")],
      },
      {
        id: "cat-caparezza",
        date: "2026-07-15",
        title: "Soirée Caparezza",
        body: "Foule italienne dense, textes qu’on ne comprend qu’à moitié, énergie qu’on comprend entièrement. Vera chante plus fort que moi. Retour à pied le long du lungomare encore vivant à minuit.",
        photos: [
          ph("cattolica", "capa-1", "Entrée de salle — file qui avance"),
          ph("cattolica", "capa-2", "Scène depuis le milieu de fosse"),
        ],
      },
      {
        id: "cat-rimini",
        date: "2026-07-18",
        title: "Journée Rimini",
        body: "Train court vers Rimini, vieux centre, et une gelateria recommandée par un inconnu trop confiant. Il avait raison. Après-midi ombre et espresso — protocole anti-chaleur respecté.",
        photos: [
          ph("cattolica", "rimini-1", "Centre historique"),
          ph("cattolica", "rimini-2", "Gelato stratégique"),
        ],
      },
    ],
  },
  {
    id: "sud",
    name: "Sud de la France",
    region: "Aix / Nice / Antibes",
    summary:
      "Allers-retours professionnels pour coordonner les équipes Katalyx. Corridor opérationnel récurrent.",
    body: "Pas un voyage unique : un corridor. Aix pour le studio, Nice et Antibes selon les rendez-vous clients et les semaines où il faut être physiquement dans la pièce. Ces trajets rythment l’agenda autant que les sprints produit — TGV, A8, et parfois un vol trop tôt.",
    timing: "Déplacements récurrents",
    startDate: "2099-01-01",
    lat: 43.5297,
    lng: 5.4474,
    accent: "#7a9ec4",
    kind: "work",
    recurrent: true,
    highlights: [
      "Hub Katalyx · Aix-en-Provence",
      "Extensions Nice / Antibes selon clients",
      "Corridor TGV / A8 récurrent",
    ],
    cover: ph("sud", "cover", "Cours Mirabeau — fin de journée"),
    journal: [
      {
        id: "sud-aix",
        date: "2026-03-04",
        title: "Semaine studio à Aix",
        body: "Présence au 67 Cours Mirabeau pour caler les priorités Agents IA et LinkedIn B2B. Réunions trop longues, café trop bon, et la sensation utile d’être dans le même fuseau que l’équipe.",
        photos: [ph("sud", "aix-1", "Façade studio — matin")],
      },
      {
        id: "sud-nice",
        date: "2026-04-22",
        title: "Détour Nice",
        body: "Journée client sur la côte. A8 bouchée comme prévu, réunion productive, retour tard. Note : la prochaine fois, train plutôt que voiture — même si le parking était « pratique ».",
        photos: [ph("sud", "nice-1", "Baie des Anges depuis le quai")],
      },
      {
        id: "sud-antibes",
        date: "2026-09-10",
        title: "Antibes — sync produit",
        body: "Atelier Parkour / Katapulse hors des murs d’Aix. Tableau blanc trop petit, idées trop nombreuses. Soirée sur le port pour digérer le backlog.",
        photos: [
          ph("sud", "antibes-1", "Port d’Antibes au crépuscule"),
          ph("sud", "antibes-2", "Notes d’atelier sur table café"),
        ],
      },
    ],
  },
];

/** Dated trips first (chrono), then recurrent. */
export function tripsForTimeline(): TravelTrip[] {
  const dated = travelTrips
    .filter((t) => !t.recurrent)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const recurrent = travelTrips.filter((t) => t.recurrent);
  return [...dated, ...recurrent];
}

export function getTrip(id: string): TravelTrip | undefined {
  return travelTrips.find((t) => t.id === id);
}
