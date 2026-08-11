"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const BEATS = [
  { label: "Préparation du bureau…", delay: 280 },
  { label: "Les dossiers de l'année", delay: 320 },
  { label: "Un peu de chaleur…", delay: 300 },
  { label: "Victor-Bot se réveille", delay: 340 },
];

type Props = {
  onDone: () => void;
};

export function BootSequence({ onDone }: Props) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step >= BEATS.length) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onDone, 450);
      }, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), BEATS[step]?.delay ?? 300);
    return () => clearTimeout(t);
  }, [step, onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--vos-bg)] px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <button
            type="button"
            onClick={() => {
              setDone(true);
              onDone();
            }}
            className="absolute top-5 right-5 text-xs text-[var(--vos-dim)] hover:text-[var(--vos-muted)]"
          >
            Passer
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="mb-2 text-sm tracking-[0.3em] text-[var(--vos-amber)] uppercase">
              Été 2026
            </p>
            <h1 className="font-[family-name:var(--font-instrument)] text-4xl text-[var(--vos-text)] sm:text-5xl">
              Hey, les potes.
            </h1>
            <p className="mt-3 text-[var(--vos-muted)]">
              Un petit tour dans mon année — à votre rythme.
            </p>
          </motion.div>

          <div className="mt-10 w-full max-w-xs space-y-2">
            {BEATS.slice(0, step).map((b) => (
              <motion.p
                key={b.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-[var(--vos-dim)]"
              >
                {b.label}
              </motion.p>
            ))}
            {step >= BEATS.length && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-2 text-center font-[family-name:var(--font-instrument)] text-xl text-[var(--vos-amber)]"
              >
                Bienvenue.
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
