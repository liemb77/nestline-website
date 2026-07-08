import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { KNOWLEDGE_BASE } from "@/lib/knowledgeBase";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_TURNS = 6;

const BOOKING_LINK = "https://cal.com/liem-blouin/discovery?overlayCalendar=true";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de NestLine Automation, une agence de consultation en IA basée à Montréal, Québec. Réponds aux questions des visiteurs du site en te basant UNIQUEMENT sur les informations ci-dessous. Si la réponse ne s'y trouve pas, dis-le honnêtement et invite la personne à réserver un appel plutôt que d'inventer une réponse. Ne jamais présenter un marché ciblé ("on vise aussi...") comme de l'expérience client livrée — reste précis sur ce qui a réellement été livré vs. ce qui est visé. Quand tu suggères de réserver un appel, donne toujours ce lien directement : ${BOOKING_LINK}. Réponds dans la langue utilisée par le visiteur (français ou anglais). Reste bref et direct — 2-4 phrases maximum, ton professionnel mais chaleureux.

${KNOWLEDGE_BASE}`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  if (!process.env.CLAUDE_API_KEY) {
    console.error("[chat] CLAUDE_API_KEY is not set");
    return NextResponse.json({ ok: false, error: "Chat is not configured" }, { status: 503 });
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
  if (!message) {
    return NextResponse.json({ ok: false, error: "Message is required" }, { status: 400 });
  }

  const rawHistory = Array.isArray(body.history) ? body.history : [];
  const history: ChatMessage[] = rawHistory
    .filter(
      (m): m is ChatMessage =>
        typeof m === "object" &&
        m !== null &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .slice(-MAX_HISTORY_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  try {
    const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: [...history, { role: "user", content: message }],
    });

    const reply = response.content.find((b) => b.type === "text")?.text ?? "";

    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    console.error("[chat] Anthropic API call failed:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 502 });
  }
}
