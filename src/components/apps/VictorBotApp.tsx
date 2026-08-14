"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { suggestedQuestions } from "@/content/knowledge";
import { BotMarkdown } from "@/components/apps/BotMarkdown";

type Msg = { role: "user" | "assistant"; content: string };

type Props = {
  compact?: boolean;
};

export function VictorBotApp({ compact = false }: Props) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Salut. Je connais l'année de Victor — mais je ne spoile pas tout d'un coup. Pose une vraie question.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    const nextMessages: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? `Erreur ${res.status}`);
      }

      if (!res.body) throw new Error("Pas de flux de réponse");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistant = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistant += decoder.decode(value, { stream: true });
        const snapshot = assistant;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: snapshot };
          return copy;
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      setError(msg);
      setMessages((prev) => [
        ...prev.filter(
          (m, i) => !(i === prev.length - 1 && m.role === "assistant" && !m.content),
        ),
        { role: "assistant", content: `Oups — ${msg}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  return (
    <div
      className={`flex h-full flex-col bg-[var(--vos-bg-content)] ${compact ? "min-h-0" : "min-h-[400px]"}`}
    >
      {!compact && (
        <div className="border-b border-[var(--vos-border)] px-4 py-3">
          <p className="text-[10px] tracking-wide text-[var(--vos-teal)] uppercase">
            Confidentiel
          </p>
          <h2 className="font-[family-name:var(--font-instrument)] text-xl text-[var(--vos-text)]">
            Interroge l&apos;année
          </h2>
        </div>
      )}

      <div className="vos-scroll flex-1 space-y-3 overflow-auto p-4 text-sm">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
              m.role === "user"
                ? "ml-auto bg-[color-mix(in_srgb,var(--vos-teal)_22%,transparent)] text-[var(--vos-text)]"
                : "bg-[var(--vos-panel)] text-[var(--vos-text)]"
            }`}
          >
            {m.role === "assistant" && (
              <p className="mb-1 text-[10px] tracking-wide text-[var(--vos-teal)] uppercase">
                Victor-Bot
              </p>
            )}
            {m.role === "assistant" ? (
              <BotMarkdown text={m.content} />
            ) : (
              <p className="whitespace-pre-wrap">{m.content}</p>
            )}
          </div>
        ))}
        {loading && (
          <p className="text-xs text-[var(--vos-dim)]">
            Réfléchit<span className="vos-cursor-blink">…</span>
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {error && <p className="px-4 text-[11px] text-[var(--vos-danger)]">{error}</p>}

      <div className="flex flex-wrap gap-1.5 border-t border-[var(--vos-border)] px-3 py-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            type="button"
            disabled={loading}
            onClick={() => void send(q)}
            className="rounded-full border border-[var(--vos-border)] bg-[var(--vos-panel)] px-2.5 py-1 text-[10px] text-[var(--vos-muted)] hover:border-[var(--vos-teal)] hover:text-[var(--vos-teal)] disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className="flex gap-2 border-t border-[var(--vos-border)] bg-[var(--vos-elevated)]/80 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Une question sur Victor…"
          disabled={loading}
          className="min-w-0 flex-1 rounded-full border border-[var(--vos-border)] bg-[var(--vos-bg)] px-4 py-2.5 text-sm text-[var(--vos-text)] outline-none placeholder:text-[var(--vos-dim)] focus:border-[var(--vos-teal)]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-full bg-gradient-to-br from-[var(--vos-teal)] to-[var(--vos-sky)] px-4 py-2 text-xs font-medium text-white disabled:opacity-40"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
