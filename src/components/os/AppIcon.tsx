"use client";

import { useState } from "react";
import { APP_BY_ID } from "@/content/apps";
import type { AppId } from "@/content/types";

const ICON_SRC: Partial<Record<AppId, string>> = {
  career: "/media/icons/icon-pro.png",
  vera: "/media/icons/icon-vera.png",
  travel: "/media/icons/icon-voyages.png",
  metrics: "/media/icons/icon-passions.png",
  lab: "/media/icons/icon-labo.png",
  browser: "/media/icons/icon-browser.png",
};

type Size = "sm" | "md" | "lg" | "xl";

const SIZE_CLASS: Record<Size, string> = {
  sm: "h-5 w-5",
  md: "h-10 w-10",
  lg: "h-11 w-11",
  xl: "h-12 w-12",
};

const GLYPH_CLASS: Record<Size, string> = {
  sm: "text-[10px]",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
};

type Props = {
  id: AppId;
  size?: Size;
  className?: string;
  rounded?: string;
};

export function AppIcon({
  id,
  size = "md",
  className = "",
  rounded = "rounded-2xl",
}: Props) {
  const src = ICON_SRC[id];
  const [failed, setFailed] = useState(false);
  const meta = APP_BY_ID[id];

  if (!src || failed) {
    return (
      <span
        aria-hidden
        className={`inline-flex ${SIZE_CLASS[size]} ${rounded} items-center justify-center bg-[var(--vos-elevated)] shadow-md ${GLYPH_CLASS[size]} ${className}`}
        style={{ color: meta.accent }}
      >
        {meta.icon}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      draggable={false}
      onError={() => setFailed(true)}
      className={`${SIZE_CLASS[size]} ${rounded} object-cover shadow-md ${className}`}
    />
  );
}

export function botIconSrc() {
  return "/media/icons/icon-bot.png";
}
