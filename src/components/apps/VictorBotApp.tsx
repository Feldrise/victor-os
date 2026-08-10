"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { suggestedQuestions } from "@/content/knowledge";

type Msg = { role: "user" | "assistant"; content: string };

export function VictorBotApp() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Victor-Bot en ligne. Vous avez environ 10 minutes. Posez de vraies questions — je ne spoile pas le changelog gratuitement.",
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
        ...prev.filter((m, i) => !(i === prev.length - 1 && m.role === "assistant" && !m.content)),
        {
          role: "assistant",
          content: `// erreur: ${msg}`,
        },
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
    <div className="flex h-full min-h-[400px] flex-col bg-[#0c0d12]">
      <div className="border-b border-[var(--vos-border)] px-4 py-3">
        <p className="font-mono text-[10px] tracking-widest text-[var(--vos-dim)] uppercase">
          tty · victor-bot
        </p>
        <h2 className="font-[family-name:var(--font-instrument)] text-xl text-[var(--vos-amber)]">
          Interrogatoire
        </h2>
      </div>

      <div className="vos-scroll flex-1 space-y-3 overflow-auto p-4 font-mono text-[13px]">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-[var(--vos-info)]" : "text-[var(--vos-success)]"}>
            <span className="text-[var(--vos-dim)]">
              {m.role === "user" ? "ami@" : "bot@"}victor:~${" "}
            </span>
            <span className="whitespace-pre-wrap text-[var(--vos-text)]">{m.content}</span>
          </div>
        ))}
        {loading && (
          <p className="text-[var(--vos-dim)]">
            bot@victor:~$ <span className="vos-cursor-blink text-[var(--vos-amber)]">█</span>
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {error && (
        <p className="px-4 font-mono text-[11px] text-[var(--vos-danger)]">{error}</p>
      )}

      <div className="flex flex-wrap gap-1.5 border-t border-[var(--vos-border)] px-3 py-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            type="button"
            disabled={loading}
            onClick={() => void send(q)}
            className="rounded border border-[var(--vos-border)] bg-[var(--vos-panel)] px-2 py-1 font-mono text-[10px] text-[var(--vos-muted)] hover:border-[var(--vos-amber)] hover:text-[var(--vos-amber)] disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className="flex gap-2 border-t border-[var(--vos-border)] bg-[var(--vos-elevated)] p-3"
      >
        <span className="hidden self-center font-mono text-xs text-[var(--vos-dim)] sm:inline">
          ›
        </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pose une question sur l'année de Victor…"
          disabled={loading}
          className="min-w-0 flex-1 rounded border border-[var(--vos-border)] bg-[var(--vos-bg)] px-3 py-2 font-mono text-sm text-[var(--vos-text)] outline-none placeholder:text-[var(--vos-dim)] focus:border-[var(--vos-amber)]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded border border-[var(--vos-amber)]/50 bg-[rgba(232,160,74,0.15)] px-3 py-2 font-mono text-xs text-[var(--vos-amber)] hover:bg-[rgba(232,160,74,0.25)] disabled:opacity-40"
        >
          send
        </button>
      </form>
    </div>
  );
}
