import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = "https://liemblouin.app.n8n.cloud/webhook/nestline-landing-page";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ ...(body as object), type: "waitlist" }),
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok) return NextResponse.json({ ok: true });

    return NextResponse.json({ ok: false, error: `Webhook status ${res.status}` }, { status: 502 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
