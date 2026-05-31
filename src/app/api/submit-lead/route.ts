import { NextRequest, NextResponse } from "next/server";

// Try production webhook first, fall back to test webhook if needed
const WEBHOOK_URLS = [
  "https://liemblouin.app.n8n.cloud/webhook/nestline-landing-page",
  "https://liemblouin.app.n8n.cloud/webhook-test/nestline-landing-page",
];

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Try each URL in order — first one that responds OK wins
  for (const url of WEBHOOK_URLS) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        // 8-second timeout so we don't hang the user
        signal: AbortSignal.timeout(8000),
      });

      if (res.ok) {
        return NextResponse.json({ ok: true });
      }
    } catch {
      // This URL failed — try the next one
    }
  }

  return NextResponse.json({ ok: false, error: "All webhook URLs failed" }, { status: 502 });
}
