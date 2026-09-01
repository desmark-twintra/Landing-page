"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2, TriangleAlert } from "lucide-react";
import {
  BUYER_TYPES,
  QUANTITY_UNITS,
  enquiryDefaults,
  enquirySchema,
  type EnquiryInput,
} from "@/lib/schemas";
import { submitEnquiry } from "@/lib/enquiry";
import { products, getProduct } from "@/content/products";
import { contact } from "@/content/company";
import { useQuote } from "./quote-provider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border border-outline/15 bg-card px-4 py-3 text-[15px] text-ink placeholder:text-ink-muted/60 transition-colors duration-150 hover:border-outline/25 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10";

const labelBase =
  "mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-heading/70";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-accent">
      <TriangleAlert className="size-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

export function EnquiryForm({
  /** Pre-selects a product when opened from a catalogue card. */
  presetProduct,
  /** Hides the product/quantity block on the general contact form. */
  showProductFields = true,
  compact = false,
  onSuccess,
}: {
  presetProduct?: string;
  showProductFields?: boolean;
  compact?: boolean;
  onSuccess?: () => void;
}) {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const { basket, clearBasket } = useQuote();
  const basketNames = useMemo(
    () => basket.map((slug) => getProduct(slug)?.name).filter((n): n is string => Boolean(n)),
    [basket],
  );

  /**
   * The mobile "quote list" basket is client-only state, layered on top of
   * the existing single-`product` enquiry schema rather than changing it: one
   * basket item preselects that product like `presetProduct` always did; two
   * or more get folded into the default message text instead.
   */
  function basketAwareDefaults(): EnquiryInput {
    if (presetProduct) return { ...enquiryDefaults, product: presetProduct };
    if (basketNames.length === 1) {
      return { ...enquiryDefaults, product: basketNames[0] };
    }
    if (basketNames.length > 1) {
      return {
        ...enquiryDefaults,
        message: `Interested in: ${basketNames.join(", ")}\n\n`,
      };
    }
    return { ...enquiryDefaults, product: "" };
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: basketAwareDefaults(),
  });

  const buyerTypeField = useController({ control, name: "buyerType" });
  const productField = useController({ control, name: "product" });
  const unitField = useController({ control, name: "unit" });

  // Keep the form's defaults in step with the basket while the buyer hasn't
  // started typing — e.g. they add products, then scroll straight to Contact.
  useEffect(() => {
    if (isDirty) return;
    reset(basketAwareDefaults());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basketNames.join("|")]);

  async function onSubmit(values: EnquiryInput) {
    setServerError(null);
    const result = await submitEnquiry(values);

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    setStatus("sent");
    clearBasket();
    reset({ ...enquiryDefaults, product: presetProduct ?? "" });
    onSuccess?.();
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-success/25 bg-success/[0.06] px-6 py-12 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
          <Check className="size-6" aria-hidden />
        </span>
        <h3 className="mt-5 font-display text-2xl text-heading">Enquiry received</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-mid">
          Thank you — we&apos;ve got your details and will come back to you personally.
          For anything urgent, reach us at{" "}
          <a
            href={`mailto:${contact.email}`}
            className="font-medium text-accent underline underline-offset-2"
          >
            {contact.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[13px] font-medium text-heading underline underline-offset-4 hover:text-accent"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {!presetProduct && basketNames.length > 0 && (
        <div className="rounded-xl bg-cream-deep/60 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
            On your quote list
          </p>
          <p className="mt-1 text-[14px] leading-[1.45] text-heading">
            {basketNames.join(" · ")}
          </p>
        </div>
      )}

      <div className={cn("grid gap-5", !compact && "sm:grid-cols-2")}>
        <div>
          <label htmlFor={`${uid}-name`} className={labelBase}>
            Your name <span className="text-accent">*</span>
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            placeholder="Full name"
            className={fieldBase}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            {...register("name")}
          />
          <FieldError id={`${uid}-name-err`} message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor={`${uid}-company`} className={labelBase}>
            Company
          </label>
          <input
            id={`${uid}-company`}
            type="text"
            autoComplete="organization"
            placeholder="Business name"
            className={fieldBase}
            {...register("company")}
          />
        </div>
      </div>

      <div className={cn("grid gap-5", !compact && "sm:grid-cols-2")}>
        <div>
          <label htmlFor={`${uid}-email`} className={labelBase}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldBase}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
            {...register("email")}
          />
          <FieldError id={`${uid}-email-err`} message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className={labelBase}>
            Phone
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            autoComplete="tel"
            placeholder="+91 ..."
            className={fieldBase}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
            {...register("phone")}
          />
          <FieldError id={`${uid}-phone-err`} message={errors.phone?.message} />
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-buyer`} className={labelBase}>
          I am a <span className="text-accent">*</span>
        </label>
        <Select
          value={buyerTypeField.field.value}
          onValueChange={buyerTypeField.field.onChange}
        >
          <SelectTrigger
            id={`${uid}-buyer`}
            onBlur={buyerTypeField.field.onBlur}
            aria-required="true"
            aria-invalid={!!errors.buyerType}
            aria-describedby={errors.buyerType ? `${uid}-buyer-err` : undefined}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BUYER_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError id={`${uid}-buyer-err`} message={errors.buyerType?.message} />
      </div>

      {showProductFields && (
        <div className={cn("grid gap-5", !compact && "sm:grid-cols-2")}>
          <div>
            <label htmlFor={`${uid}-product`} className={labelBase}>
              Product of interest
            </label>
            <Select
              value={productField.field.value}
              onValueChange={productField.field.onChange}
            >
              <SelectTrigger id={`${uid}-product`} onBlur={productField.field.onBlur}>
                <SelectValue placeholder="General enquiry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">General enquiry</SelectItem>
                {products.map((p) => (
                  <SelectItem key={p.slug} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor={`${uid}-quantity`} className={labelBase}>
              Indicative quantity
            </label>
            <div className="flex gap-2">
              <input
                id={`${uid}-quantity`}
                type="text"
                inputMode="numeric"
                placeholder="e.g. 500"
                className={cn(fieldBase, "flex-1")}
                aria-invalid={!!errors.quantity}
                aria-describedby={errors.quantity ? `${uid}-quantity-err` : undefined}
                {...register("quantity")}
              />
              <Select
                value={unitField.field.value}
                onValueChange={unitField.field.onChange}
              >
                <SelectTrigger
                  aria-label="Quantity unit"
                  onBlur={unitField.field.onBlur}
                  aria-invalid={!!errors.unit}
                  aria-describedby={errors.unit ? `${uid}-unit-err` : undefined}
                  className="w-32 shrink-0"
                >
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Unit</SelectItem>
                  {QUANTITY_UNITS.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FieldError id={`${uid}-quantity-err`} message={errors.quantity?.message} />
            <FieldError id={`${uid}-unit-err`} message={errors.unit?.message} />
          </div>
        </div>
      )}

      <div>
        <label htmlFor={`${uid}-message`} className={labelBase}>
          Your requirement <span className="text-accent">*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          rows={compact ? 4 : 5}
          placeholder="Tell us about grade, packing, delivery location and timeline — whatever you already know."
          className={cn(fieldBase, "resize-y")}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${uid}-message-err` : undefined}
          {...register("message")}
        />
        <FieldError id={`${uid}-message-err`} message={errors.message?.message} />
      </div>

      {/* Honeypot — visually and programmatically hidden from real users */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {serverError && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-accent/25 bg-accent/[0.06] px-4 py-3 text-[13px] text-accent"
        >
          <TriangleAlert className="mt-px size-4 shrink-0" aria-hidden />
          {serverError}
        </p>
      )}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight className="size-4" aria-hidden />
            </>
          )}
        </Button>
        <p className="text-[12.5px] leading-relaxed text-ink-muted">
          No obligation. We reply to every enquiry personally.
        </p>
      </div>
    </form>
  );
}
