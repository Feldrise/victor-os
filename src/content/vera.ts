export type VeraSection = {
  id: string;
  title: string;
  status: string;
  body: string;
  logLines: string[];
};

export const veraPatch = {
  version: "2.026.08",
  codename: "Patch Vera",
  appliedAt: "2025–2026",
  summary:
    "Mise à jour majeure de l'équilibre personnel. Mode Couple activé. Nouvelles dépendances nature, mycologie et cinéma haute résolution.",
  sections: [
    {
      id: "status",
      title: "Statut relationnel",
      status: "APPLIED",
      body: "Arrivée de Vera, basée dans le Tessin (Suisse). Patch appliqué avec succès — latence Suisse ↔ France gérée via déplacements récurrents.",
      logLines: [
        "[ok] dependency vera@tessin resolved",
        "[ok] mode=couple enabled",
        "[warn] weekend sync requires train/flight buffer",
      ],
    },
    {
      id: "nature",
      title: "Immersion nature & mycologie",
      status: "RUNNING",
      body: "Vera, bientôt mycologue et guide nature (créatrice de Balade EcoLogique), a introduit une forte dimension écologique. Balades en forêt, biodiversité, cueillette de champignons — et une app de terrain en cours de build.",
      logLines: [
        "[ok] module balade-ecologique linked",
        "[ok] forest.walk() frequency ↑",
        "[info] mycelium curiosity daemon started",
      ],
    },
    {
      id: "cinema",
      title: "Cinéma en haute résolution",
      status: "ACTIVE",
      body: "Exploitation intensive du Cinépass Duo. Beaucoup de films visionnés ensemble, avec une chasse particulière aux projections argentiques 70mm dans des salles spécialisées européennes.",
      logLines: [
        "[ok] cinepass.duo authenticated",
        "[ok] format=70mm preferred",
        "[info] european specialty theaters indexed",
      ],
    },
  ] satisfies VeraSection[],
};
