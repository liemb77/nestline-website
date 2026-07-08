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

// --- Rate limiting ---
// In-memory, scoped to a single serverless instance — resets on cold start
// and isn't shared across concurrent instances, so this is a deterrent
// against casual/single-source spam, not a hard guarantee under a
// distributed attack. The real financial backstop is the spend limit set
// directly in the Anthropic Console (Settings -> Limits) — set that too.
const IP_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 8;
const MAX_REQUESTS_PER_DAY = 300;

const ipHits = new Map<string, number[]>();
let dailyCount = 0;
let dailyResetAt = nextUtcMidnight();

function nextUtcMidnight(): number {
  const d = new Date();
  d.setUTCHours(24, 0, 0, 0);
  return d.getTime();
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (now >= dailyResetAt) {
    dailyCount = 0;
    dailyResetAt = nextUtcMidnight();
  }
  if (dailyCount >= MAX_REQUESTS_PER_DAY) return true;

  const recentHits = (ipHits.get(ip) ?? []).filter((t) => now - t < IP_WINDOW_MS);
  if (recentHits.length >= MAX_REQUESTS_PER_IP) {
    ipHits.set(ip, recentHits);
    return true;
  }

  recentHits.push(now);
  ipHits.set(ip, recentHits);
  dailyCount += 1;
  return false;
}

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  return forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
}

export async function POST(req: NextRequest) {
  if (!process.env.CLAUDE_API_KEY) {
    console.error("[chat] CLAUDE_API_KEY is not set");
    return NextResponse.json({ ok: false, error: "Chat is not configured" }, { status: 503 });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
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
