import { z } from "zod";
import { products } from "@/content/products";

const PRODUCT_NAMES = products.map((p) => p.name) as [string, ...string[]];

export const BUYER_TYPES = [
  "Wholesaler / Distributor",
  "Retailer",
  "Food Processor / Manufacturer",
  "Hotel, Restaurant or Caterer",
  "Overseas Importer / Exporter",
  "Other",
] as const;

export const QUANTITY_UNITS = ["kg", "Quintal", "Metric Tonne", "Container"] as const;

/** Optional free-text field that also accepts an empty string from the form. */
const optionalText = z.string().trim().max(160).optional().or(z.literal(""));

/** Digits, spaces and +()- — loose enough for international formats, still validated. */
const PHONE_PATTERN = /^[0-9()+\-\s]{7,20}$/;
const optionalPhone = z
  .string()
  .trim()
  .regex(PHONE_PATTERN, "Enter a valid phone number")
  .optional()
  .or(z.literal(""));

/** A positive number, up to 2 decimal places — matches the field's `inputMode="numeric"`. */
const QUANTITY_PATTERN = /^\d{1,7}(\.\d{1,2})?$/;
const optionalQuantity = z
  .string()
  .trim()
  .regex(QUANTITY_PATTERN, "Enter a number, e.g. 500")
  .optional()
  .or(z.literal(""));

/**
 * Single source of truth for the enquiry payload. Shared by the contact form,
 * the quote drawer, the API route, and whatever backend is wired up later.
 */
export const enquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your name")
      .max(80, "That name looks too long"),
    company: optionalText,
    email: z.email("Enter a valid email address"),
    phone: optionalPhone,
    buyerType: z.enum(BUYER_TYPES, "Select the option that fits you best"),
    product: z.enum(PRODUCT_NAMES).optional().or(z.literal("")),
    quantity: optionalQuantity,
    unit: z.enum(QUANTITY_UNITS).optional().or(z.literal("")),
    message: z
      .string()
      .trim()
      .min(10, "Tell us a little more — at least 10 characters")
      .max(2000, "Please keep this under 2000 characters"),
    /** Honeypot: real users never fill this. */
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .refine((data) => !(data.quantity && !data.unit), {
    message: "Select a unit for the quantity",
    path: ["unit"],
  })
  .refine((data) => !(data.unit && !data.quantity), {
    message: "Enter a quantity",
    path: ["quantity"],
  });

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const enquiryDefaults: EnquiryInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  buyerType: "Wholesaler / Distributor",
  product: "",
  quantity: "",
  unit: "",
  message: "",
  website: "",
};
