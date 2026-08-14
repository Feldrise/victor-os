"use client";

import type { AppId } from "@/content/types";
import { CareerApp } from "@/components/apps/CareerApp";
import { PatchVeraApp } from "@/components/apps/PatchVeraApp";
import { NetworkMapApp } from "@/components/apps/NetworkMapApp";
import { MetricsApp } from "@/components/apps/MetricsApp";
import { LabApp } from "@/components/apps/LabApp";
import { GalleryApp } from "@/components/apps/GalleryApp";
import { SimulatedBrowser } from "@/components/apps/SimulatedBrowser";
import { useDesktop } from "@/components/os/DesktopContext";

export function AppContent({ id }: { id: AppId }) {
  switch (id) {
    case "career":
      return <CareerApp />;
    case "vera":
      return <PatchVeraApp />;
    case "travel":
      return <NetworkMapApp />;
    case "metrics":
      return <MetricsApp />;
    case "lab":
      return <LabApp />;
    case "gallery":
      return <GalleryApp />;
    case "browser":
      return <BrowserAppContent />;
    default:
      return null;
  }
}

function BrowserAppContent() {
  const { browserTarget } = useDesktop();
  if (!browserTarget) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-sm text-[var(--vos-text-dim)]">
        Aucun site ouvert. Lance un site depuis Pro.
      </div>
    );
  }
  return (
    <SimulatedBrowser
      activityId={browserTarget.activityId}
      title={browserTarget.title}
      url={browserTarget.url}
      accent={browserTarget.accent}
      embedAllowed={browserTarget.embedAllowed}
    />
  );
}
