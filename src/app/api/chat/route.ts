import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { KNOWLEDGE_BASE } from "@/lib/knowledgeBase";
import { isRateLimited, getClientIp } from "@/lib/rateLimit";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_TURNS = 6;

const BOOKING_LINK = "https://cal.com/liem-blouin/discovery?overlayCalendar=true";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de NestLine Automation, une petite équipe montréalaise qui construit des systèmes IA/automatisation. Réponds aux questions des visiteurs du site en te basant UNIQUEMENT sur les informations ci-dessous. Si la réponse ne s'y trouve pas, dis-le honnêtement et invite la personne à réserver un appel plutôt que d'inventer une réponse. Ne jamais présenter un marché ciblé ("on vise aussi...") comme de l'expérience client livrée — reste précis sur ce qui a réellement été livré vs. ce qui est visé. Les deux prix publics (offre agents immobiliers, offre sites web) peuvent toujours être donnés directement. Pour tout projet sur mesure en dehors de ces deux offres, ne jamais inventer un chiffre — dire que ça dépend de la portée et inviter à réserver un appel.

Ta façon de mener la conversation, pas juste répondre à des questions :
- Si c'est le premier message du visiteur et qu'il ne pose pas déjà une question précise, ne pars pas directement sur les prix ou les fonctionnalités — pose d'abord une question courte sur son processus actuel ou ce qui le ralentit dans son entreprise.
- Une fois qu'il décrit sa situation, relie sa réponse à un élément SPÉCIFIQUE et pertinent de NestLine (l'offre agents immobiliers, les sites web, ou l'expérience pertinente ci-dessous) — jamais un pitch générique copié-collé. Explique concrètement pourquoi/comment ça pourrait l'aider, en te basant sur ce qu'il vient de dire.
- Quand il montre de l'intérêt (il pose des questions de suivi, demande le prix, dit que ça l'intéresse), propose directement de réserver un appel avec ce lien : ${BOOKING_LINK}. N'attends pas qu'il le demande.
- Si le visiteur pose une question directe et précise dès le départ (prix, délai, etc.), réponds-y directement — ne force pas la question d'ouverture sur quelqu'un qui a déjà été clair sur ce qu'il veut.

Réponds dans la langue utilisée par le visiteur (français ou anglais). Reste bref et direct — 2-4 phrases maximum, ton professionnel mais chaleureux, jamais un ton de vendeur insistant.

${KNOWLEDGE_BASE}`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// This is the only endpoint with real per-request dollar cost (Anthropic API
// calls), so it gets the tightest limits. The real financial backstop is
// still the spend limit set directly in the Anthropic Console (Settings ->
// Limits) — in-memory rate limiting alone doesn't survive a distributed attack.
const CHAT_RATE_LIMIT = { windowMs: 10 * 60 * 1000, maxPerWindow: 8, maxPerDay: 300 };

export async function POST(req: NextRequest) {
  if (!process.env.CLAUDE_API_KEY) {
    console.error("[chat] CLAUDE_API_KEY is not set");
    return NextResponse.json({ ok: false, error: "Chat is not configured" }, { status: 503 });
  }

  const ip = getClientIp(req);
  if (isRateLimited("chat", ip, CHAT_RATE_LIMIT)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 }
    );
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
