"use client";

import { useCallback, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { APP_BY_ID } from "@/content/apps";
import type { AppId, ResizeEdge } from "@/content/types";
import { computeResize, useDesktop } from "./DesktopContext";

type Props = {
  id: AppId;
  children: ReactNode;
};

const EDGES: ResizeEdge[] = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

export function WindowFrame({ id, children }: Props) {
  const {
    windows,
    activeId,
    closeApp,
    minimizeApp,
    focusApp,
    toggleMaximize,
    moveWindow,
    resizeWindow,
  } = useDesktop();

  const win = windows.find((w) => w.id === id);
  const meta = APP_BY_ID[id];
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const resizeStart = useRef<{
    edge: ResizeEdge;
    x: number;
    y: number;
    width: number;
    height: number;
    pointerX: number;
    pointerY: number;
  } | null>(null);
  const [resizing, setResizing] = useState(false);

  const onPointerDownTitle = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!win || win.maximized) return;
      if ((e.target as HTMLElement).closest("button")) return;
      focusApp(id);
      setDragging(true);
      dragOffset.current = {
        x: e.clientX - win.x,
        y: e.clientY - win.y,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focusApp, id, win],
  );

  const onPointerMoveTitle = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!dragging || !win || win.maximized) return;
      const nextX = Math.max(0, e.clientX - dragOffset.current.x);
      const nextY = Math.max(36, e.clientY - dragOffset.current.y);
      moveWindow(id, nextX, nextY);
    },
    [dragging, id, moveWindow, win],
  );

  const onPointerUpTitle = useCallback(() => {
    setDragging(false);
  }, []);

  const onResizeDown = useCallback(
    (edge: ResizeEdge) => (e: PointerEvent<HTMLDivElement>) => {
      if (!win || win.maximized) return;
      e.stopPropagation();
      e.preventDefault();
      focusApp(id);
      resizeStart.current = {
        edge,
        x: win.x,
        y: win.y,
        width: win.width,
        height: win.height,
        pointerX: e.clientX,
        pointerY: e.clientY,
      };
      setResizing(true);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focusApp, id, win],
  );

  const onResizeMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!resizing || !resizeStart.current) return;
      const s = resizeStart.current;
      const dx = e.clientX - s.pointerX;
      const dy = e.clientY - s.pointerY;
      const next = computeResize(s.edge, s, dx, dy);
      resizeWindow(id, next);
    },
    [id, resizeWindow, resizing],
  );

  const onResizeUp = useCallback(() => {
    setResizing(false);
    resizeStart.current = null;
  }, []);

  if (!win || !win.open || win.minimized) return null;

  const style = win.maximized
    ? {
        left: 0,
        top: 36,
        width: "100%" as const,
        height: "calc(100% - 36px - 96px)",
        zIndex: win.zIndex,
      }
    : {
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      };

  const isActive = activeId === id;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 8 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={`vos-window-shadow absolute flex flex-col overflow-hidden rounded-2xl border bg-[var(--vos-window)] backdrop-blur-xl ${
        isActive ? "border-[var(--vos-rose)]/45" : "border-[var(--vos-border)]"
      }`}
      style={style}
      onMouseDown={() => focusApp(id)}
    >
      <div
        className="flex h-11 shrink-0 cursor-grab items-center gap-2 border-b border-[var(--vos-border-subtle)] bg-[var(--vos-elevated)]/80 px-3 active:cursor-grabbing"
        onPointerDown={onPointerDownTitle}
        onPointerMove={onPointerMoveTitle}
        onPointerUp={onPointerUpTitle}
        onDoubleClick={() => toggleMaximize(id)}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => closeApp(id)}
            className="h-3 w-3 rounded-full bg-[var(--vos-danger)]/85 hover:bg-[var(--vos-danger)]"
          />
          <button
            type="button"
            aria-label="Réduire"
            onClick={() => minimizeApp(id)}
            className="h-3 w-3 rounded-full bg-[var(--vos-amber)]/75 hover:bg-[var(--vos-amber)]"
          />
          <button
            type="button"
            aria-label="Agrandir"
            onClick={() => toggleMaximize(id)}
            className="h-3 w-3 rounded-full bg-[var(--vos-success)]/75 hover:bg-[var(--vos-success)]"
          />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <span className="text-sm text-[var(--vos-rose)]">{meta.icon}</span>
          <span className="truncate text-sm text-[var(--vos-muted)]">{meta.name}</span>
        </div>
        <span className="w-14" />
      </div>
      <div className="vos-scroll min-h-0 flex-1 overflow-auto">{children}</div>

      {!win.maximized &&
        EDGES.map((edge) => (
          <div
            key={edge}
            className={`vos-resize-handle vos-resize-${edge}`}
            onPointerDown={onResizeDown(edge)}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
          />
        ))}
    </motion.div>
  );
}
