export type TravelPin = {
  id: string;
  name: string;
  region: string;
  context: string;
  timing: string;
  // Approximate positions on stylized Europe SVG (viewBox 0 0 800 600)
  x: number;
  y: number;
  accent: string;
};

export const travelPins: TravelPin[] = [
  {
    id: "tessin",
    name: "Tessin",
    region: "Suisse",
    context:
      "Visites dans la famille de Vera, Carnaval, et célébrations de la fête nationale suisse. Base relationnelle côté Alpes sud.",
    timing: "Février & Août 2026",
    x: 420,
    y: 310,
    accent: "#e8a04a",
  },
  {
    id: "cairngorms",
    name: "Cairngorms",
    region: "Écosse",
    context:
      "Road trip immersif d'une dizaine de jours dans le parc national écossais — navigation, paysages, et saturation de vert et de brume.",
    timing: "Mai 2026",
    x: 250,
    y: 140,
    accent: "#6bbf8a",
  },
  {
    id: "cattolica",
    name: "Cattolica / Rimini",
    region: "Italie",
    context:
      "Exploration de la côte adriatique et concert de Caparezza en direct avec Vera.",
    timing: "Juillet 2026",
    x: 455,
    y: 355,
    accent: "#e8956a",
  },
  {
    id: "sud",
    name: "Sud de la France",
    region: "Aix / Nice / Antibes",
    context:
      "Allers-retours professionnels pour coordonner les équipes Katalyx. Corridor opérationnel récurrent.",
    timing: "Déplacements récurrents",
    x: 355,
    y: 360,
    accent: "#7a9ec4",
  },
  {
    id: "hellfest",
    name: "Clisson",
    region: "Hellfest",
    context:
      "Pèlerinage musical au Hellfest. Pic de décibels validé sur le monitoring auditif.",
    timing: "Juin 2026",
    x: 300,
    y: 295,
    accent: "#d46a6a",
  },
];
