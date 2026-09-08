"use client";

import { Check, Plus } from "lucide-react";
import { useQuote } from "./quote-provider";
import { Button } from "@/components/ui/button";

/**
 * The only way into the enquiry list now that product cards carry a single
 * "View Details" action — so it lives on the detail page, next to the direct
 * enquiry CTAs.
 */
export function AddToEnquiryButton({ slug }: { slug: string }) {
  const { toggleEnquiryItem, isInEnquiryList } = useQuote();
  const added = isInEnquiryList(slug);

  return (
    <Button
      type="button"
      variant="glass"
      size="lg"
      onClick={() => toggleEnquiryItem(slug)}
      aria-pressed={added}
    >
      {added ? (
        <>
          <Check className="size-4" aria-hidden />
          On enquiry list
        </>
      ) : (
        <>
          <Plus className="size-4" aria-hidden />
          Add to enquiry
        </>
      )}
    </Button>
  );
}
