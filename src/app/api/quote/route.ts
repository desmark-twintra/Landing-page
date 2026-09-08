import { NextResponse } from "next/server";
import { send } from "@emailjs/nodejs";
import { enquirySchema } from "@/lib/schemas";
import { contact } from "@/content/company";

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

  const templateParams = {
    to_email: contact.email,
    from_name: enquiry.name,
    from_email: enquiry.email,
    company: enquiry.company || "—",
    phone: enquiry.phone || "—",
    buyer_type: enquiry.buyerType,
    product: enquiry.product || "General enquiry",
    quantity: enquiry.quantity ? `${enquiry.quantity} kg` : "—",
    message: enquiry.message,
  };

  const emailjsOptions = {
    publicKey: process.env.EMAILJS_PUBLIC_KEY!,
    privateKey: process.env.EMAILJS_PRIVATE_KEY!,
  };

  try {
    await send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      templateParams,
      emailjsOptions,
    );
  } catch (err) {
    console.error("[enquiry email failed]", err);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't send that just now. Please email us directly.",
      },
      { status: 502 },
    );
  }

  // Confirmation email back to the buyer — best-effort, since a failure here
  // shouldn't block the "enquiry received" success state (we already have it).
  if (process.env.EMAILJS_AUTOREPLY_TEMPLATE_ID) {
    void send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_AUTOREPLY_TEMPLATE_ID,
      templateParams,
      emailjsOptions,
    ).catch((err) => console.error("[auto-reply email failed]", err));
  }

  return NextResponse.json({ ok: true });
}
