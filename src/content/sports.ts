export type MetricSeries = {
  label: string;
  values: number[];
};

export type MetricCard = {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  unit?: string;
  trend: "up" | "down" | "stable";
  series: number[];
  note: string;
};

export const sportsMetrics: MetricCard[] = [
  {
    id: "rennes",
    title: "Stade Rennais",
    subtitle: "Module Football & Data",
    value: "∞",
    unit: "ferveur",
    trend: "up",
    series: [42, 48, 45, 55, 52, 61, 58, 67, 72, 70, 78, 84],
    note: "Suivi assidu des métriques tactiques et des probabilités de qualifications européennes. Le dashboard mental ne se coupe jamais.",
  },
  {
    id: "wc2026",
    title: "Coupe du Monde 2026",
    subtitle: "Sous-module Vera-induced",
    value: "MAX",
    unit: "visionnage",
    trend: "up",
    series: [10, 12, 15, 20, 35, 55, 70, 85, 92, 95, 98, 100],
    note: "Événement massivement visionné grâce — ou à cause — de Vera. Pic de charge audiovisuelle planifié.",
  },
  {
    id: "pingpong",
    title: "Ping-Pong",
    subtitle: "Service de loisir",
    value: "ON",
    unit: "uptime",
    trend: "stable",
    series: [60, 58, 62, 55, 64, 66, 63, 70, 68, 72, 75, 74],
    note: "Maintien de l'activité pongiste, chasse aux spots régionaux. Expérience passée en compétition de club toujours dans le buffer.",
  },
];

export const bretagneGauge = {
  label: "Variable Bretagne",
  value: 87,
  max: 100,
  description:
    "Fervent défenseur de la culture bretonne. Cette jauge s'incrémente à chaque rappel des racines celtiques — surtout depuis le sud de la France ou la Suisse.",
};
