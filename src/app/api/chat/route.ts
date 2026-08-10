import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/victor-bot/system-prompt";
import { rateLimit } from "@/lib/victor-bot/rate-limit";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "ANTHROPIC_API_KEY manquante. Ajoute-la dans .env.local (voir README).",
      },
      { status: 503 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anonymous";

  const limit = rateLimit(ip);
  if (!limit.ok) {
    return Response.json(
      {
        error: `Rate limit atteint. Réessaie dans ${Math.ceil(limit.retryAfterMs / 1000)}s.`,
      },
      { status: 429 },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON invalide" }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "messages requis" }, { status: 400 });
  }

  const sanitized = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-20)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, 4000),
    }));

  if (sanitized.length === 0 || sanitized[sanitized.length - 1]?.role !== "user") {
    return Response.json({ error: "Dernier message doit être user" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-5",
    max_tokens: 600,
    system: buildSystemPrompt(),
    messages: sanitized,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "stream error";
        controller.enqueue(encoder.encode(`\n[erreur] ${message}`));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-RateLimit-Remaining": String(limit.remaining),
    },
  });
}
