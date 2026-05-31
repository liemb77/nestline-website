import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URLS = [
  "https://liemblouin.app.n8n.cloud/webhook/nestline-landing-page",
  "https://liemblouin.app.n8n.cloud/webhook-test/nestline-landing-page",
];

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    console.error("[submit-lead] Failed to parse request body");
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // ── SERVER LOG 1 ────────────────────────────────────────────────────────────
  console.log("[submit-lead] Body received from frontend:", JSON.stringify(body, null, 2));

  for (const url of WEBHOOK_URLS) {
    // ── SERVER LOG 2 ──────────────────────────────────────────────────────────
    console.log(`[submit-lead] Trying webhook URL: ${url}`);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(8000),
      });

      const resText = await res.text();

      // ── SERVER LOG 3 ────────────────────────────────────────────────────────
      console.log(`[submit-lead] n8n response status: ${res.status}`);
      console.log(`[submit-lead] n8n response body: ${resText}`);

      if (res.ok) {
        console.log("[submit-lead] Success — webhook accepted the request");
        return NextResponse.json({ ok: true });
      }

      console.warn(`[submit-lead] Webhook returned non-OK status ${res.status}, trying next URL`);
    } catch (err) {
      console.error(`[submit-lead] Fetch to ${url} threw an error:`, err);
    }
  }

  console.error("[submit-lead] All webhook URLs failed");
  return NextResponse.json({ ok: false, error: "All webhook URLs failed" }, { status: 502 });
}
