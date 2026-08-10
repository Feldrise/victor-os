import { cookies } from "next/headers";
import { Desktop } from "@/components/os/Desktop";
import type { ThemeMode } from "@/content/types";

function resolveTheme(value: string | undefined): ThemeMode {
  return value === "light" || value === "dark" ? value : "dark";
}

export default async function Home() {
  const cookieStore = await cookies();
  const initialTheme = resolveTheme(cookieStore.get("victoros-theme")?.value);

  return <Desktop initialTheme={initialTheme} />;
}
