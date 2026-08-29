import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/schemas";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request body." },
      { status: 400 },
    );
  }

  const parsed = enquirySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Some fields need attention.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const { website, ...enquiry } = parsed.data;

  // Honeypot tripped — accept silently so bots get no signal, but send nothing on.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // ───────────────────────────────────────────────────────────────
  // TODO: Wire up delivery here. Everything above is done — this is
  // the only place that needs configuration. Pick one:
  //
  //   • Email    — Resend / Nodemailer to contact.email
  //   • CRM      — HubSpot / Zoho lead create
  //   • Database — Postgres / Supabase insert
  //
  // Read credentials from environment variables (never inline them),
  // e.g. process.env.RESEND_API_KEY, and return { ok: false } with a
  // 502 if delivery fails so the form can surface a retry message.
  // ───────────────────────────────────────────────────────────────
  console.log("[enquiry received]", {
    ...enquiry,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
