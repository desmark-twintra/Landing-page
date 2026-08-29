"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-xl border border-outline/15 bg-card px-4 py-3 text-left text-[15px] text-ink transition-colors duration-150 hover:border-outline/25 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 data-[popup-open]:border-accent data-[popup-open]:ring-4 data-[popup-open]:ring-accent/10 disabled:cursor-not-allowed disabled:opacity-55",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="shrink-0 text-ink-muted">
        <ChevronDown className="size-4" aria-hidden />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectValue({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("truncate data-[placeholder]:text-ink-muted/60", className)}
      {...props}
    />
  );
}

export function SelectContent({
  className,
  children,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Popup> &
  Pick<React.ComponentProps<typeof SelectPrimitive.Positioner>, "sideOffset">) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        className="z-[120] outline-none"
        sideOffset={sideOffset}
        alignItemWithTrigger={false}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "w-[var(--anchor-width)] max-h-[min(24rem,var(--available-height))] overflow-y-auto rounded-xl border border-outline/15 bg-card p-1 text-ink shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] outline-none",
            className,
          )}
          {...props}
        >
          {children}
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none data-[highlighted]:bg-accent/10 data-[highlighted]:text-heading data-[selected]:bg-accent/15 data-[selected]:font-medium data-[selected]:text-heading",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="shrink-0 text-accent">
        <Check className="size-4" aria-hidden />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
