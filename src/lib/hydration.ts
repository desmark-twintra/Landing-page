"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

function subscribeNever() {
  return () => {};
}

/**
 * True once hydrated, false on the server and on the first client render.
 * Reads as "false" for the SSR/hydration snapshot and "true" for every
 * snapshot after, without calling setState from an effect.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

/**
 * `useReducedMotion()` reads the media query synchronously, so a visitor with
 * the OS setting on renders a different tree than the server sent — React
 * reports it as a hydration mismatch and refuses to patch the attributes up.
 *
 * The server has no way to know the preference, so it always renders the
 * animated branch. Report "not reduced" for the hydration pass to match, then
 * hand back the real preference on the render immediately after.
 */
export function useReducedMotionSafe(): boolean {
  const reduced = useReducedMotion();
  return useHasMounted() ? reduced === true : false;
}
