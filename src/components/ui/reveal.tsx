"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/hydration";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger index — each step adds 60ms. */
  delay?: number;
  as?: "div" | "li" | "article";
};

/**
 * Scroll-in wrapper. Honours prefers-reduced-motion by rendering statically,
 * so nothing ever animates in for users who have opted out.
 *
 * The preference only becomes readable after hydration, so the animated branch
 * is what the server sends and what the first client render must agree on —
 * `data-reveal` lets the stylesheet neutralise motion's `opacity: 0` entry
 * styles for those users in the meantime, so nothing sits invisible.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotionSafe();
  const Tag = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      data-reveal
      className={cn(className)}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.65,
        delay: delay * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Tag>
  );
}
