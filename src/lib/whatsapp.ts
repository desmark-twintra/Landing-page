import { contact } from "@/content/company";

/**
 * Builds a wa.me deep link with the enquiry already written for the buyer.
 * Passing a product name makes the opening message specific to whatever they
 * were just looking at, so the conversation starts with context rather than
 * "hi".
 */
export function whatsappHref(productName?: string) {
  const message = productName
    ? `Hi Desmark Twintra, I'd like a quote for ${productName}. Could you share pricing, available grades and packing options?`
    : "Hi Desmark Twintra, I'd like to enquire about your chilli products. Could you share pricing and availability?";

  // wa.me wants a bare international number — no plus, no spaces.
  const number = contact.phones[0].href.replace(/\D/g, "");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
