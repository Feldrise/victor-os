import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { ThemeMode } from "@/content/types";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-instrument",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "VictorOS 2026.08",
  description:
    "Dashboard interactif — bilan de l'année de Victor, façon système d'exploitation.",
};

function resolveTheme(value: string | undefined): ThemeMode {
  return value === "light" || value === "dark" ? value : "dark";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = resolveTheme(cookieStore.get("victoros-theme")?.value);

  return (
    <html
      lang="fr"
      data-theme={theme}
      className={`${fraunces.variable} ${ibmPlexMono.variable} ${ibmPlexSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
