"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LINES = [
  "VictorOS BIOS v2026.08",
  "POST ................ OK",
  "Mounting /career .... OK",
  "Mounting /vera ...... OK",
  "Mounting /travel .... OK",
  "Mounting /metrics ... OK",
  "Mounting /lab ....... OK",
  "Starting victor-bot . OK",
  "",
  "welcome, friends.",
];

type Props = {
  onDone: () => void;
};

export function BootSequence({ onDone }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (visibleCount >= LINES.length) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onDone, 400);
      }, 600);
      return () => clearTimeout(t);
    }
    const delay = visibleCount === LINES.length - 1 ? 400 : 220;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [visibleCount, onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-[#0a0b0f] px-6 py-10 font-mono text-sm text-[var(--vos-amber)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            type="button"
            onClick={() => {
              setDone(true);
              onDone();
            }}
            className="absolute top-4 right-4 text-[10px] tracking-widest text-[var(--vos-dim)] uppercase hover:text-[var(--vos-muted)]"
          >
            skip
          </button>
          <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center gap-1">
            {LINES.slice(0, visibleCount).map((line, i) => (
              <motion.p
                key={`${line}-${i}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className={
                  line === "welcome, friends."
                    ? "mt-4 font-[family-name:var(--font-instrument)] text-2xl text-[var(--vos-text)]"
                    : "text-[var(--vos-muted)]"
                }
              >
                {line || "\u00A0"}
                {i === visibleCount - 1 && visibleCount < LINES.length && (
                  <span className="vos-cursor-blink ml-1 text-[var(--vos-amber)]">█</span>
                )}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
