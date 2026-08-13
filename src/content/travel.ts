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

/** Optional chapter for trips with a multi-leg / multi-stay narrative */
export type TravelChapter = {
  id: string;
  label: string;
  /** Short atmospheric line under the label */
  mood: string;
  timing: string;
  startDate: string;
  endDate: string;
  body: string;
  highlights: string[];
  cover?: TravelPhoto;
  /** Extra photos without forcing a dated journal beat */
  gallery?: TravelPhoto[];
  journal: JournalEntry[];
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
  /** Flat journal (default). Ignored when `chapters` is set. */
  journal: JournalEntry[];
  /** Multi-part structure — séjours, étapes, etc. */
  chapters?: TravelChapter[];
  /** UI label for chapters, e.g. "Séjour" or "Étape" */
  chapterUnit?: string;
  /**
   * linear (default): numbered chapters in reading order
   * constellation: thematic fragments, no implied chronology
   */
  chapterLayout?: "linear" | "constellation";
  cover?: TravelPhoto;
  /** When true, sorted after dated trips in the timeline */
  recurrent?: boolean;
  /** When false, trip stays on the map/timeline only (no detail view) */
  hasDetail?: boolean;
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

function pic(
  tripId: string,
  file: string,
  caption: string,
): TravelPhoto {
  const id = file.replace(/\.[^.]+$/, "");
  return {
    id,
    src: `/media/travel/${tripId}/${file}`,
    caption,
  };
}

export const travelTrips: TravelTrip[] = [
  {
    id: "tessin",
    name: "Tessin",
    region: "Curio · Suisse",
    summary:
      "Deux séjours chez la famille de Vera à Curio — carnaval d’hiver, puis une quinzaine d’été trop chaude, ponctuée du 1er août à Lugano.",
    body: "Curio n’est pas une destination : c’est une adresse. Le village de Vera, coincé dans les collines tessinoises, absorbe le rythme français dès qu’on pose les sacs — conversations qui basculent en italien, table trop longue, et cette sensation de basculer hors du calendrier pro. En 2026, on y est revenus deux fois : une semaine de carnaval sous la neige, puis une quinzaine d’été où la chaleur a tout ralenti. Même maison, même canapé, deux climats.",
    timing: "Fév. & été 2026",
    startDate: "2026-02-14",
    endDate: "2026-08-11",
    lat: 46.0024,
    lng: 8.8318,
    accent: "#e8a04a",
    kind: "family",
    highlights: [
      "Base familiale · Curio",
      "Carnaval · 14–21 février",
      "Été & 1er août · 28 juil.–11 août",
    ],
    cover: pic(
      "tessin",
      "cover.png",
      "Lac de montagne — reflet net, été tessinois",
    ),
    journal: [],
    chapterUnit: "Séjour",
    chapters: [
      {
        id: "tessin-carnaval",
        label: "Carnaval",
        mood: "Neige, costumes, et une nuit qui ne finit pas à Bellinzone",
        timing: "14–21 février 2026",
        startDate: "2026-02-14",
        endDate: "2026-02-21",
        body: "Février à Curio, c’est le Tessin en mode hush : bancs sous la neige, village presque silencieux le matin, et soudain le carnaval qui réveille la place. Pas un défilé de carte postale — une fête de village, costumes bricolés, menottes en plastique, rires trop forts dans une salle au bois sombre. On a aussi basculé une nuit entière côté Bellinzone : moins de confettis, plus de décibels, retour au petit jour avec les bottes encore mouillées.",
        highlights: [
          "Semaine chez la famille · Curio",
          "Carnaval de Curio — fête de village",
          "Nuit blanche à Bellinzone",
          "Ambiance calme hors des soirs de fête",
        ],
        cover: pic(
          "tessin",
          "curio-neige.png",
          "Jardin sous la neige — Curio, silence de février",
        ),
        journal: [
          {
            id: "tessin-feb-neige",
            date: "2026-02-15",
            title: "Curio sous la poudre",
            body: "Le jardin derrière la maison a disparu sous une couche nette. Banc blanc, haie chargée, ciel bas — le genre de calme qu’on n’obtient jamais dans un planning français. On sort juste pour regarder. Vera connaît chaque angle ; moi, je redécouvre le village comme si c’était la première fois, sauf que la table du salon est déjà la nôtre.",
          },
          {
            id: "tessin-feb-carnaval",
            date: "2026-02-17",
            title: "Carnaval de Curio",
            body: "Costumes, menottes de pacotille, et une selfie de table où personne ne joue la pose sérieuse. Le carnaval de Curio n’essaie pas d’impressionner : il rassemble. On boit, on pointe la caméra, on se moque des tenues — prisonnier rayé, chemise trop colorée, et le père de Vera qui rit plus fort que tout le monde. C’est exactement le genre de soirée qu’on ne programme pas : elle arrive parce qu’on est là.",
            photos: [
              pic(
                "tessin",
                "carnaval-selfie.png",
                "Selfie de carnaval — menottes, rires, bois sombre",
              ),
            ],
          },
          {
            id: "tessin-feb-bellinzona",
            date: "2026-02-19",
            title: "Bellinzone jusqu’au bout",
            body: "Descente vers Bellinzone pour une nuit qui refuse de se terminer. La ville des châteaux bascule en mode fête ; on suit le courant, on perd la notion de l’heure, on récupère le calme de Curio au petit matin comme un contraste volontaire. Carnaval tessinois : autant le village intime que la ville qui tient jusqu’à l’aube.",
          },
        ],
      },
      {
        id: "tessin-ete",
        label: "Été",
        mood: "Canicule, lacs bleus, koala voyageur, et feux d’artifice à Lugano",
        timing: "28 juillet – 11 août 2026",
        startDate: "2026-07-28",
        endDate: "2026-08-11",
        body: "Retour à Curio pour une quinzaine où le thermomètre a décidé de tout diriger. Trop chaud pour les grandes ambitions — alors on a ralenti : pique-niques en altitude dès que la pente offre un peu d’air, pauses salon ventilateur, et le 1er août traité comme il se doit, avec le feu d’artifice de Lugano en point d’orgue. Même adresse qu’en février, autre planète climatique.",
        highlights: [
          "Quinze jours · chaleur tessinoise",
          "Randonnées / pique-niques en hauteur",
          "1er août — feu d’artifice de Lugano",
          "Temps long avec la famille",
        ],
        cover: pic(
          "tessin",
          "lac-alpin.png",
          "Lac alpin — eau sombre, crêtes en cercle",
        ),
        journal: [
          {
            id: "tessin-aug-salon",
            date: "2026-07-29",
            title: "Le salon comme quartier général",
            body: "Canapé, plaid, carnets, verres d’eau — et la chaleur qui pousse tout le monde vers l’intérieur aux heures critiques. Le père de Vera, Vera, le même mobilier de toujours : on dirait une pause entre deux sorties, sauf que la pause dure. C’est aussi ça, Curio en été : accepter que le rythme familial prime sur le programme.",
            photos: [
              pic(
                "tessin",
                "salon-famille.png",
                "Salon de Curio — lumière d’après-midi",
              ),
            ],
          },
          {
            id: "tessin-aug-lugano",
            date: "2026-08-01",
            title: "1er août à Lugano",
            body: "Fête nationale suisse vue depuis Lugano : foule le long du lac, attente du noir, puis le feu d’artifice qui occupe tout le ciel. Vera tient le koala comme une mascotte officieuse ; la lune est déjà là, et on rentre tard vers Curio avec les oreilles encore pleines des détonations. Moins un spectacle TV qu’une soirée qu’on a vraiment vécue ensemble.",
            photos: [
              pic(
                "tessin",
                "lugano-soir.png",
                "Lugano, soirée du 1er août — Vera & le koala",
              ),
            ],
          },
          {
            id: "tessin-aug-lac",
            date: "2026-08-02",
            title: "Monter pour respirer",
            body: "Dès que le village devient four, on gagne de l’altitude. Lac fermé par les crêtes, eau d’un bleu trop propre pour être réel, herbe encore verte malgré la canicule en bas. Peu de monde, beaucoup de silence — le genre de pause qui justifie d’avoir traversé la frontière avec des sacs trop lourds.",
          },
          {
            id: "tessin-aug-picnic",
            date: "2026-08-04",
            title: "Pique-nique & koala",
            body: "Couvertures fluorescentes sur la pente, chips en format familial, gourdes, sacs à dos — et le koala en peluche qui a décidé de faire partie de l’équipage. On mange trop, on reste trop longtemps, on photographie trop. La chaleur d’en bas est oubliée le temps d’un goûter improvisé entre les sapins.",
            photos: [
              pic(
                "tessin",
                "pique-nique.png",
                "Pique-nique en altitude — koala inclus",
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ecosse",
    name: "Écosse",
    region: "Montrose · North Sea",
    summary:
      "Dix jours basés à Montrose — pubs, billard, full breakfasts, raids sur Édimbourg / Aberdeen, et la voiture dès que le paysage appelle. Vera arrive le 12.",
    body: "Pas un itinerary. Une constellation autour d’une base imparfaite : Montrose, ville correcte sans être mémorable, d’où l’on rayonne. Certains jours, on ne va nulle part et c’est très bien — Guinness, billard, petit-déjeuner trop gras. D’autres, on prend la voiture ou le train vers Édimbourg, Aberdeen, une falaise, une forêt. Vera nous rejoint le 12 mars : le séjour a deux fuseaux, même ciel gris.",
    timing: "7–17 mars 2026",
    startDate: "2026-03-07",
    endDate: "2026-03-17",
    lat: 56.7089,
    lng: -2.4678,
    accent: "#6bbf8a",
    kind: "leisure",
    highlights: [
      "Hub · Montrose (imparfait & utile)",
      "Vera · arrivée le 12 mars",
      "Satellites · Édimbourg, Aberdeen, routes",
      "Rituels · bière, billard, fried breakfast",
    ],
    cover: pic(
      "ecosse",
      "cover.png",
      "Falaise écossaise — arche, mer, ciel bas",
    ),
    journal: [],
    chapterUnit: "Fragment",
    chapterLayout: "constellation",
    chapters: [
      {
        id: "sco-horizons",
        label: "Horizons",
        mood: "Dès que la voiture démarre, Montrose disparaît",
        timing: "Raids paysage",
        startDate: "2026-03-12",
        endDate: "2026-03-16",
        body: "Le vrai argument de l’Écosse n’était pas la base : c’étaient les sorties. Falaise percée par la mer, plage sous un ciel trop clair pour la saison, forêt de pins avec un arbre déraciné comme sculpture. On s’éloigne, on photographie trop, on rentre les bottes sales. Montrose redevient un parking avec lit — et c’est exactement son rôle.",
        highlights: [
          "Côte · arches & vent",
          "Plage · dune et horizon long",
          "Forêt · mousse, racines, lumière filtrée",
        ],
        cover: pic(
          "ecosse",
          "falaise.png",
          "Trio sur la falaise — arche dans la roche",
        ),
        gallery: [
          pic(
            "ecosse",
            "plage.png",
            "Promenade côtière — Vera & mer grise",
          ),
          pic(
            "ecosse",
            "foret.png",
            "Pins et arbre déraciné — sortie forêt",
          ),
        ],
        journal: [],
      },
      {
        id: "sco-montrose",
        label: "Montrose",
        mood: "Le hub qui ne prétend rien — et c’est tant mieux",
        timing: "Base · 7–17 mars",
        startDate: "2026-03-07",
        endDate: "2026-03-17",
        body: "Montrose n’est pas Édimbourg. Ce n’est même pas « charmant au sens brochure ». Ville côtière correcte, rues utilitaires, pubs qui font le job. On y dormait, on y mangeait trop le matin, on y revenait le soir. L’absence de wow permanent forçait les vraies sorties — et protégeait les journées où l’objectif était juste une pinte et une partie de billard.",
        highlights: [
          "Base logistique · pas une destination-trophy",
          "Rythme : rayonner ou ne rien faire",
          "Mer du Nord à deux pas",
        ],
        journal: [],
      },
      {
        id: "sco-rituels",
        label: "Rituels",
        mood: "Guinness, queue de billard, petit-déj criminel",
        timing: "Constante du séjour",
        startDate: "2026-03-07",
        endDate: "2026-03-17",
        body: "Entre deux raids, le protocole local : bières noires à la mousse trop parfaite, Vera au billard en mode concentration, et ces petit-déjeuners britanniques qui devraient être interdits mais qu’on recommande le lendemain. Ce n’est pas le « filler » du voyage — c’est la texture. Les paysages impressionnent ; les pubs, eux, collent au séjour.",
        highlights: [
          "Guinness · formation complète",
          "Billard · Vera qui vise",
          "Full breakfast · trop gras, trop bon",
        ],
        cover: pic(
          "ecosse",
          "guinness.png",
          "Trois pintes — soirée pub",
        ),
        gallery: [
          pic(
            "ecosse",
            "billard.png",
            "Vera au billard — pub lighting",
          ),
        ],
        journal: [],
      },
      {
        id: "sco-villes",
        label: "Satellites",
        mood: "Édimbourg et Aberdeen comme échappées urbaines",
        timing: "Jours hors hub",
        startDate: "2026-03-08",
        endDate: "2026-03-15",
        body: "Quand Montrose ne suffisait plus, on basculait ville. Édimbourg pour la densité — rues, relief, impression d’avoir changé de pays en une traite. Aberdeen pour une autre côte, plus granit, plus vent dans les angles. Pas des checklists exhaustives : des respirations urbaines, puis retour au hub avant que la nuit ne rende le trajet trop long.",
        highlights: [
          "Édimbourg · dose de capitale",
          "Aberdeen · granit & vent",
          "Aller-retour depuis Montrose",
        ],
        journal: [],
      },
      {
        id: "sco-vera",
        label: "Fuseau Vera",
        mood: "Avant le 12 / après le 12 — même carte, autre équipe",
        timing: "Jonction · 12 mars",
        startDate: "2026-03-12",
        endDate: "2026-03-17",
        body: "Le séjour a une couture nette : du 7 au 11, formation réduite ; à partir du 12, Vera est là. Les photos de falaise, de plage, de forêt et de pub portent sa présence — casque rose, lunettes, sourire dans le froid. Ce n’est pas que le voyage « commence » à son arrivée ; c’est qu’il change de grain. Les rituels s’élargissent, les selfies aussi.",
        highlights: [
          "7–11 mars · avant",
          "12 mars · jonction",
          "12–17 · constellation complète",
        ],
        journal: [],
      },
    ],
  },
  {
    id: "hellfest",
    name: "Clisson",
    region: "Hellfest",
    summary:
      "Pèlerinage musical au Hellfest — weekend Clisson, décibels validés, pas de journal photo cette année.",
    body: "Clisson en juin : boue ou poussière selon l’année, mais toujours le même rituel — planning de scènes, file pour les bières, et cette fatigue heureuse du dimanche soir. Hellfest reste le marqueur musical de l’année.",
    timing: "Juin 2026",
    startDate: "2026-06-19",
    endDate: "2026-06-22",
    lat: 47.0869,
    lng: -1.2817,
    accent: "#d46a6a",
    kind: "music",
    hasDetail: false,
    highlights: [
      "Weekend festival · Clisson",
      "Scènes principales + découvertes late-night",
      "Monitoring auditif : pic validé",
    ],
    journal: [],
  },
  {
    id: "paris",
    name: "Paris",
    region: "France",
    summary:
      "Sept jours capitale avec Vera — nénuphars, Roazhon’s Call, Fontainebleau, Lumières, Dior, 14 juillet, et Nolan en 70 mm.",
    body: "Une semaine à Paris sans checklist touristique stricte : un Airbnb pile au-dessus d’un bar rennais, des sorties qui basculent du jardin aquatique à la forêt, du spectacle immersif au défilé national, et une séance 70 mm pour refermer le séjour. Vera découvre la capitale à son rythme — nénuphars d’abord, drapeaux ensuite. Moi, je suis content de lui faire voir le 14 juillet de l’intérieur.",
    timing: "9–16 juillet 2026",
    startDate: "2026-07-09",
    endDate: "2026-07-16",
    lat: 48.8566,
    lng: 2.3522,
    accent: "#6a8fad",
    kind: "leisure",
    highlights: [
      "7 jours · 9–16 juillet",
      "Base · Airbnb au-dessus de Roazhon’s Call",
      "Fontainebleau · avant les flammes",
      "14 juillet + Odyssey en 70 mm",
    ],
    cover: pic(
      "paris",
      "cover.png",
      "Odyssey en 70 mm — ticket en main, koala en guest",
    ),
    journal: [],
    chapterUnit: "Scène",
    chapters: [
      {
        id: "paris-nenuphars",
        label: "Nénuphars",
        mood: "À peine arrivés, déjà penchés sur l’eau",
        timing: "9 juillet 2026",
        startDate: "2026-07-09",
        endDate: "2026-07-09",
        body: "Valises à peine posées, Vera a déjà un plan qui n’était pas sur le mien : les nénuphars. Casquette, sac à dos, nez au-dessus du bassin — elle inventorie les feuilles comme une naturaliste en mission. Paris peut attendre ; le jardin aquatique, non. Première leçon de la semaine : on suit le regard de Vera.",
        highlights: [
          "Arrivée · priorité botanique",
          "Bassin dense · nénuphars & ombre de casquette",
          "Ton du séjour : curiosité avant checklist",
        ],
        cover: pic(
          "paris",
          "nenuphars.png",
          "Vera au-dessus des nénuphars — première sortie",
        ),
        journal: [],
      },
      {
        id: "paris-roazhon",
        label: "Roazhon’s Call",
        mood: "L’Airbnb au-dessus du QG rennais — jackpot Coupe du Monde",
        timing: "Base de semaine",
        startDate: "2026-07-09",
        endDate: "2026-07-16",
        body: "Coup de chance immobilier : l’appart donne pile au-dessus de Roazhon’s Call, bar supporters du Stade Rennais. Descente en trente secondes, bières en chopes, écran allumé, Bretagne accrochée aux stores rouges. Suivre la Coupe du Monde depuis Paris… dans un bar rennais : absurdement parfait. On trinque, on crie, on rentre en montant un étage.",
        highlights: [
          "Airbnb · verticalité stratégique",
          "Roazhon’s Call · QG CdM",
          "Variable Bretagne : +1 même à Paris",
        ],
        cover: pic(
          "paris",
          "roazhon.png",
          "Trinque au Roazhon’s Call — Morillons",
        ),
        journal: [],
      },
      {
        id: "paris-fontainebleau",
        label: "Fontainebleau",
        mood: "Forêt encore debout — on ne savait pas pour la suite",
        timing: "Mi-semaine",
        startDate: "2026-07-11",
        endDate: "2026-07-11",
        body: "Sortie Sud : forêt de Fontainebleau, pins, rochers, sac en guise d’oreiller. Selfie allongés, peluches sur le torse, ciel découpé par les branches. On a eu de la chance — y aller tant qu’elle était encore là, avant les incendies. La photo est douce ; le souvenir, lui, porte maintenant une note amère. On est contents de l’avoir vue intacte.",
        highlights: [
          "Journée forêt · pins & grès",
          "Pause rocher · mode couple + peluches",
          "Après-coup : avant qu’elle ne brûle",
        ],
        cover: pic(
          "paris",
          "fontainebleau.png",
          "Fontainebleau — selfie sous les pins",
        ),
        journal: [],
      },
      {
        id: "paris-atelier",
        label: "Atelier des Lumières",
        mood: "Le Petit Prince en immersif — miroirs à l’infini",
        timing: "Soirée culturelle",
        startDate: "2026-07-12",
        endDate: "2026-07-12",
        body: "Atelier des Lumières, programme Petit Prince : on entre dans une boîte de reflets où le sol et les murs avalent la silhouette. Vera cadre le selfie, koala coincé entre nous, robes et lumières qui se répètent jusqu’à l’infini. Moins une expo qu’on « regarde » qu’un endroit où on se laisse absorber — parfait pour une suisse qui découvre Paris autrement que par les postes Instagram classiques.",
        highlights: [
          "Petit Prince · immersif",
          "Salle miroir · selfie infini",
          "Culture hors musée classique",
        ],
        cover: pic(
          "paris",
          "atelier-lumieres.png",
          "Atelier des Lumières — reflets & Petit Prince",
        ),
        journal: [],
      },
      {
        id: "paris-dior",
        label: "Dior · Champs-Élysées",
        mood: "Incursion couture — blanc, vitrines, sourire un peu trop large",
        timing: "Après-midi avenue",
        startDate: "2026-07-13",
        endDate: "2026-07-13",
        body: "Descente sur l’avenue pour la boutique Dior. On ne rachète pas Paris ; on visite. Mannequins blancs, niches rétroéclairées, sac à dos un peu trop randonneur pour le code vestimentaire du lieu — et pourtant on sourit comme s’il fallait documenter l’intrusion. Vera en mode calme ; moi en mode « on est vraiment là ». Trophy shot validé, portefeuille intact.",
        highlights: [
          "Boutique Dior · Champs-Élysées",
          "Vitrines blanches · lumière couture",
          "Visite, pas shopping spree",
        ],
        cover: pic(
          "paris",
          "dior.png",
          "Chez Dior — avenue des Champs-Élysées",
        ),
        journal: [],
      },
      {
        id: "paris-14juillet",
        label: "14 juillet",
        mood: "Défilé + feu d’artifice — briefing républicain pour une Tessinoise",
        timing: "14 juillet 2026",
        startDate: "2026-07-14",
        endDate: "2026-07-14",
        body: "Le jour J. Barrières, drapeaux, VBL qui défilent, soleil de juillet sur les Champs. Je suis clairement trop content de faire découvrir ça à Vera — la Suisse a son 1er août ; la France a ses blindés et son ciel qui explose le soir. On reste jusqu’au feu d’artifice. Mission « export de rituels nationaux » : succès, avec un sourire de guide improvisé difficile à cacher.",
        highlights: [
          "Défilé · Champs-Élysées",
          "Feu d’artifice · soirée",
          "Vera · première immersion 14 juillet",
        ],
        cover: pic(
          "paris",
          "14-juillet.png",
          "Défilé du 14 juillet — VBL derrière les barrières",
        ),
        journal: [],
      },
      {
        id: "paris-odyssee",
        label: "Odyssey · 70 mm",
        mood: "Nolan grand format — le crédit final de la semaine",
        timing: "15 juillet 2026",
        startDate: "2026-07-15",
        endDate: "2026-07-15",
        body: "Dernier gros coup culturel : Odyssey, le Nolan du moment, projeté en 70 mm. Ticket noir en avant-plan, balcons du Rex derrière, koala entre nous comme un troisième billet. On a la salle, le format, le rituel cinéma du couple — Vera note probablement la salle ; moi, le grain de l’image. Paris se termine sur un générique, pas sur une valise.",
        highlights: [
          "Christopher Nolan · Odyssey",
          "Projection 70 mm",
          "Clôture haute de la semaine",
        ],
        cover: pic(
          "paris",
          "odyssee-70mm.png",
          "Avant séance — ticket 70 mm & koala",
        ),
        journal: [],
      },
    ],
  },
  {
    id: "cattolica",
    name: "Adriatique",
    region: "Bologne · Cattolica · Rimini",
    summary:
      "Court passage italien : hôtel creepy à Bologne, Caparezza à Cattolica, plage déserte à Rimini, et un retour en train digne d’un bug tracker.",
    body: "Ce n’était pas un grand road trip — plutôt une boucle courte entre aéroport, mer et quai de gare. Le prétexte officiel : Caparezza à Cattolica. Le vrai souvenir : une série de micro-aventures de transport italien, un café trop parfait, une plage magnifique et étrangement vide, puis Vera endormie dans un wagon en retard pendant qu’on rejoint la Suisse.",
    timing: "17–23 juillet 2026",
    startDate: "2026-07-17",
    endDate: "2026-07-23",
    lat: 43.9586,
    lng: 12.7369,
    accent: "#e8956a",
    kind: "leisure",
    highlights: [
      "Escales · Bologne → Cattolica → Rimini",
      "Concert Caparezza",
      "Plage Adriatique + Viva Riccione",
      "Retour train · retards en cascade",
    ],
    cover: pic(
      "cattolica",
      "cover.png",
      "Selfie de plage — koala en mode lunettes de coquillages",
    ),
    journal: [],
    chapterUnit: "Étape",
    chapters: [
      {
        id: "it-bologne",
        label: "Bologne",
        mood: "Hôtel à double face, puis le bus fantôme",
        timing: "17–18 juillet 2026",
        startDate: "2026-07-17",
        endDate: "2026-07-18",
        body: "Arrivée côté aéroport de Bologne. L’hôtel choisi pour la proximité avait une façade digne d’un film d’horreur low-budget — néons douteux, extérieur qui promet le pire. Dedans : propre, confortable, presque injustement bien. On a dormi. Le lendemain, les mésaventures transport ont officiellement démarré : le bus prévu n’est simplement jamais venu. Pas en retard. Absent. Bienvenue en Italie.",
        highlights: [
          "Nuit aéroport · creepy dehors, nickel dedans",
          "Bus fantôme — épisode 1 du saga transport",
          "Improvisation pour rejoindre la côte",
        ],
        journal: [
          {
            id: "it-bologne-hotel",
            date: "2026-07-17",
            title: "Check-in paradoxal",
            body: "Dehors, on hésite. Dedans, on pose les sacs et on se demande si on a frappé à la bonne porte. Première règle du voyage court : ne jamais juger un hôtel d’aéroport sur la photo Google Maps prise de nuit. On a dormi correctement — ce qui allait devenir un luxe mental dès le lendemain.",
          },
          {
            id: "it-bologne-bus",
            date: "2026-07-18",
            title: "Le bus qui n’existait pas",
            body: "Arrêt. Horaire. Attente. Encore. Puis l’évidence : rien ne viendra. Ni annonce claire, ni plan B élégant — juste le début d’une relation compliquée avec les transports italiens. On a fini par bouger autrement, avec ce mélange d’agacement et de rire nerveux qui devient vite le ton du séjour.",
          },
        ],
      },
      {
        id: "it-cattolica",
        label: "Cattolica",
        mood: "Mer, Caparezza, et le meilleur café de la timeline",
        timing: "Concert · juillet 2026",
        startDate: "2026-07-18",
        endDate: "2026-07-20",
        body: "Cattolica, c’était le vrai début côté mer : première vue sur l’Adriatique, file d’attente au sol avec sacs et peluche, puis Caparezza sous un ciel trop bleu pour un concert. Chouette, sincèrement. Et au milieu de tout ça — un café tellement bon qu’il a court-circuité le classement mental des cafés de l’année. Vera en casquette, koala de service, fosse qui chauffe : mission concert validée.",
        highlights: [
          "Première vue sur la mer",
          "Caparezza — attente + fosse",
          "Meilleur café de ma vie (claim officiel)",
        ],
        cover: pic(
          "cattolica",
          "capa-fosse.png",
          "Sous la structure de scène — koala en guest star",
        ),
        journal: [
          {
            id: "it-capa-attente",
            date: "2026-07-19",
            title: "File d’attente, vue du ciel",
            body: "Assise en tailleur sur les dalles, Vera sourit vers l’objectif pendant que les sacs colonisent le sol. Autour : baskets, jambes, sacs à dos. L’avant-concert a son propre tempo — trop long pour être confortable, trop court pour qu’on s’ennuie vraiment. On est exactement où on voulait être.",
            photos: [
              pic(
                "cattolica",
                "capa-attente.png",
                "Vera au sol — attente Caparezza, Cattolica",
              ),
            ],
          },
          {
            id: "it-capa-concert",
            date: "2026-07-19",
            title: "Caparezza sous le soleil",
            body: "Selfie bas vers la scène : structure noire, ciel net, foule déjà là. Les textes passent à moitié ; l’énergie, elle, passe à 100 %. On photographie moins dès que ça démarre vraiment. Et quelque part dans la journée, ce café — celui qu’on cite encore, celui qui a ruiné tous les espressos suivants par comparaison.",
          },
        ],
      },
      {
        id: "it-rimini",
        label: "Rimini / Riccione",
        mood: "Plage parfaite, ville trop calme, cocktails hors de prix",
        timing: "Deux jours · juillet 2026",
        startDate: "2026-07-20",
        endDate: "2026-07-22",
        body: "Deux jours sur le segment Rimini–Riccione. La plage : super. Le problème : il n’y avait presque personne. On s’attendait à une côte estivale saturée ; on a eu le décor sans la foule. Le soir, quarante minutes de marche pour trouver un bar un peu vivant — puis cinquante euros pour quatre cocktails, histoire de valider le prix de la désillusion. Malgré tout : selfies de plage, koala en coquillages, et le panneau Viva Riccione qui fait le job photo.",
        highlights: [
          "Plage top · fréquentation plancher",
          "40 min à pied pour un bar animé",
          "50 € · quatre cocktails",
          "Viva Riccione — trophy shot",
        ],
        cover: pic(
          "cattolica",
          "viva-riccione.png",
          "Viva Riccione — selfie de nuit",
        ),
        journal: [
          {
            id: "it-plage",
            date: "2026-07-21",
            title: "Adriatique, mode désert",
            body: "Sable clair, soleil vertical, koala avec des coquillages en guise de lunettes. La plage est belle — objectivement. Ce qui manque, c’est le bruit humain qu’on avait imaginé. On se baigne quand même, on en profite quand même, et on note mentalement : « super la mer, bizarre le vide ».",
            photos: [
              pic(
                "cattolica",
                "plage-koala.png",
                "Plage — duo + koala accessoirisé",
              ),
            ],
          },
          {
            id: "it-soir-vide",
            date: "2026-07-21",
            title: "Quarante minutes pour un bar",
            body: "Le soir, Rimini joue la carte chantier et rues trop calmes. Grue rouge, panneau de travaux, Credit Agricole allumé comme un phare absurde. Vera sourit quand même — on avance. Au bout de la marche : enfin un endroit un peu animé. L’addition des quatre cocktails a fait l’effet d’un DLC payant sur une map half-empty.",
            photos: [
              pic(
                "cattolica",
                "rimini-grue.png",
                "Rimini by night — grue, travaux, bonne humeur quand même",
              ),
            ],
          },
          {
            id: "it-riccione",
            date: "2026-07-22",
            title: "Viva Riccione",
            body: "Le panneau rose et rouge fait exactement ce qu’on lui demande : poser un souvenir net. Koala sous le menton, chemise claire, ciel noir. Peu importe que la ville ait été plus timide que prévu — cette photo, elle, est pleine.",
          },
        ],
      },
      {
        id: "it-retour",
        label: "Retour Suisse",
        mood: "Deux changements, retards empilés, Vera hors service",
        timing: "Train · juillet 2026",
        startDate: "2026-07-22",
        endDate: "2026-07-23",
        body: "Le retour vers la Suisse a refermé la boucle transport commencée à Bologne. Train italien : deux changements, chaque correspondance avec son retard de vingt minutes comme une feature documentée, et quarante-cinq minutes sur le dernier train pris — le boss final. Vera a tranché la stratégie optimale : dormir, écouteurs en place, koala sur les genoux, bouche entrouverte face à la fenêtre noire. Mission accomplie, avec latence.",
        highlights: [
          "2 changements",
          "+20 min · presque systématique",
          "+45 min · dernier train",
          "Vera : sleep mode activé",
        ],
        cover: pic(
          "cattolica",
          "train-vera.png",
          "Wagon de nuit — Vera et le koala hors ligne",
        ),
        journal: [
          {
            id: "it-train",
            date: "2026-07-22",
            title: "Bug tracker sur rails",
            body: "On accumule les retards comme des tickets ouverts. Vingt minutes ici, vingt minutes là, puis le dernier tronçon qui s’autorise quarante-cinq minutes sans demander la permission. Dehors : nuit totale. Dedans : Vera a déjà quitté la conversation. Le koala tient la permanence. Direction Suisse — et la suite de l’été côté Curio.",
          },
        ],
      },
    ],
  },
  {
    id: "sud",
    name: "Sud de la France",
    region: "Aix / Nice / Antibes",
    summary:
      "Corridor pro récurrent — Katalyx & Webisport. Aix pour les studios, Nice / Antibes selon les syncs et les clients.",
    body: "Pas un voyage unique : un corridor opérationnel entre Aix-en-Provence, Nice et Antibes. Katalyx (studio tech) et Webisport (produit sport amateur) rythment les allers-retours autant que les sprints — TGV, A8, et parfois un vol trop tôt.",
    timing: "Déplacements récurrents",
    startDate: "2099-01-01",
    lat: 43.5297,
    lng: 5.4474,
    accent: "#7a9ec4",
    kind: "work",
    recurrent: true,
    hasDetail: false,
    highlights: [
      "Katalyx · Aix-en-Provence",
      "Webisport · syncs produit / terrain",
      "Extensions Nice / Antibes",
      "Corridor TGV / A8 récurrent",
    ],
    journal: [],
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
