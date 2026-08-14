import { cookies } from "next/headers";
import { Desktop } from "@/components/os/Desktop";
import {
  NSFW_CONSENT_STORAGE_KEY,
  resolveNsfwConsent,
  resolveWallpaperId,
  WALLPAPER_STORAGE_KEY,
} from "@/content/wallpapers";
import type { ThemeMode } from "@/content/types";

function resolveTheme(value: string | undefined): ThemeMode {
  return value === "light" || value === "dark" ? value : "dark";
}

export default async function Home() {
  const cookieStore = await cookies();
  const initialTheme = resolveTheme(cookieStore.get("victoros-theme")?.value);
  const initialWallpaper = resolveWallpaperId(
    cookieStore.get(WALLPAPER_STORAGE_KEY)?.value,
  );
  const initialNsfwConsent = resolveNsfwConsent(
    cookieStore.get(NSFW_CONSENT_STORAGE_KEY)?.value,
  );

  return (
    <Desktop
      initialTheme={initialTheme}
      initialWallpaper={initialWallpaper}
      initialNsfwConsent={initialNsfwConsent}
    />
  );
}
