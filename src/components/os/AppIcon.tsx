"use client";

import type { AppId } from "@/content/types";

const ICON_SRC: Record<AppId, string> = {
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
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={ICON_SRC[id]}
      alt=""
      draggable={false}
      className={`${SIZE_CLASS[size]} ${rounded} object-cover shadow-md ${className}`}
    />
  );
}

export function botIconSrc() {
  return "/media/icons/icon-bot.png";
}
