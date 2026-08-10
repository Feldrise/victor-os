"use client";

import type { AppId } from "@/content/types";
import { CareerApp } from "@/components/apps/CareerApp";
import { PatchVeraApp } from "@/components/apps/PatchVeraApp";
import { NetworkMapApp } from "@/components/apps/NetworkMapApp";
import { MetricsApp } from "@/components/apps/MetricsApp";
import { LabApp } from "@/components/apps/LabApp";

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
    default:
      return null;
  }
}
