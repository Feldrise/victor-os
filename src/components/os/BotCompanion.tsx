"use client";

import { AnimatePresence, motion } from "motion/react";
import { useDesktop } from "./DesktopContext";
import { VictorBotApp } from "@/components/apps/VictorBotApp";
import { botIconSrc } from "./AppIcon";

export function BotCompanion() {
  const { botOpen, toggleBot, setBotOpen, isMobile } = useDesktop();

  return (
    <div
      className={`pointer-events-none fixed z-[60] ${
        isMobile ? "inset-x-3 bottom-3" : "right-5 bottom-5"
      }`}
    >
      <AnimatePresence>
        {botOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className={`vos-window-shadow pointer-events-auto mb-3 overflow-hidden rounded-2xl border border-[var(--vos-teal)]/40 bg-[var(--vos-window)] backdrop-blur-md ${
              isMobile ? "h-[min(70dvh,520px)] w-full" : "h-[520px] w-[380px]"
            }`}
          >
            <div className="flex items-center justify-between border-b border-[var(--vos-border-subtle)] bg-[var(--vos-elevated)] px-4 py-2.5">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={botIconSrc()}
                  alt=""
                  className="h-9 w-9 rounded-xl object-cover shadow"
                  draggable={false}
                />
                <div>
                  <p className="text-[10px] tracking-wide text-[var(--vos-teal)] uppercase">
                    Toujours là
                  </p>
                  <p className="font-[family-name:var(--font-instrument)] text-lg text-[var(--vos-text)]">
                    Victor-Bot
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setBotOpen(false)}
                className="rounded-full px-2.5 py-1 text-xs text-[var(--vos-muted)] hover:bg-[var(--vos-panel)] hover:text-[var(--vos-text)]"
              >
                Fermer
              </button>
            </div>
            <div className="h-[calc(100%-52px)] bg-[var(--vos-bg-content)]">
              <VictorBotApp compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`pointer-events-auto flex ${isMobile ? "justify-end" : ""}`}>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={toggleBot}
          aria-label={botOpen ? "Fermer Victor-Bot" : "Ouvrir Victor-Bot"}
          className="group relative flex items-center gap-3 rounded-full border border-white/20 bg-gradient-to-br from-[var(--vos-teal)] to-[var(--vos-sky)] px-4 py-3 text-white shadow-lg"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={botIconSrc()}
            alt=""
            className="h-9 w-9 rounded-full object-cover ring-2 ring-white/30"
            draggable={false}
          />
          <span className="pr-1 text-left">
            <span className="block text-[10px] tracking-wide uppercase opacity-80">
              Demande-moi
            </span>
            <span className="block font-[family-name:var(--font-instrument)] text-base leading-tight">
              Victor-Bot
            </span>
          </span>
          <span className="vos-uptime-pulse absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--vos-bg)] bg-[var(--vos-success)]" />
        </motion.button>
      </div>
    </div>
  );
}
