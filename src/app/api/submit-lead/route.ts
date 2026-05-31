import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = "https://liemblouin.app.n8n.cloud/webhook/nestline-landing-page";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    console.error("[submit-lead] Failed to parse request body");
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  console.log("[submit-lead] Body received from frontend:", JSON.stringify(body, null, 2));
  console.log(`[submit-lead] Sending to: ${WEBHOOK_URL}`);

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });

    const resText = await res.text();
    console.log(`[submit-lead] n8n response status: ${res.status}`);
    console.log(`[submit-lead] n8n response body: ${resText}`);

    if (res.ok) {
      console.log("[submit-lead] Success — webhook accepted the request");
      return NextResponse.json({ ok: true });
    }

    console.warn(`[submit-lead] Webhook returned non-OK status ${res.status}`);
    return NextResponse.json({ ok: false, error: `Webhook status ${res.status}` }, { status: 502 });
  } catch (err) {
    console.error("[submit-lead] Fetch threw an error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
