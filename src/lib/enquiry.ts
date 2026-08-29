import type { EnquiryInput } from "./schemas";

export type EnquiryResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * The single client-side entry point for submitting an enquiry.
 *
 * Both the contact form and the quote drawer call this, so when the real
 * delivery mechanism is configured (email, CRM, or database) nothing in the
 * UI layer needs to change — only `src/app/api/quote/route.ts`.
 */
export async function submitEnquiry(data: EnquiryInput): Promise<EnquiryResult> {
  try {
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const body = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!res.ok || !body?.ok) {
      return {
        ok: false,
        error:
          body?.error ??
          "We couldn't send that just now. Please email us directly and we'll pick it up.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "Network error — please check your connection, or email us directly.",
    };
  }
}
