"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useReducedMotionSafe } from "@/lib/hydration";

/* `useLayoutEffect` has no meaning on the server and React warns when it is
   called there, so fall back to `useEffect` for the render that never paints. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * The hero's one-shot intro clock.
 *
 * The chilli lands centred and alone, holds, then travels into its grid cell
 * while the copy fades up behind it. Both the animation and the copy need the
 * same timeline, so the requestAnimationFrame loop lives here rather than in
 * either of them.
 *
 * Plays once per tab. Navigating back from /products should not replay a
 * four-second intro, so the session flag is set the moment it starts.
 */

/** Seconds into the entry when the pile lands and the dust fires. */
export const IMPACT = 0.55;
/** The centred beauty beat ends; the pile starts moving. */
export const HOLD_END = 1.7;
/** The pile has arrived in its slot. */
export const MOVE_END = 3.0;
/** Copy begins revealing — slightly before arrival, so the page is not dead. */
export const CONTENT = 2.75;
/** Everything settled; only the idle float continues past here. */
export const ENTRY_END = 3.6;

/* Versioned. An earlier build set its flag before the animation had drawn a
   frame, so anyone who loaded that build would never see the intro again;
   bumping the suffix retires those stale flags. */
const STORAGE_KEY = "dt-hero-intro-played-v2";

type HeroIntro = {
  /** Elapsed seconds since the intro started. */
  T: number;
  /** True once the copy should be visible and interactive. */
  revealed: boolean;
  /** Pixels the pile must shift to sit centred in the viewport. On desktop the
      correction is horizontal; when the hero stacks it is mostly vertical,
      because the hidden copy still occupies its grid row. */
  offset: number;
  offsetY: number;
  /** Ref for the element whose centre is measured against the viewport. */
  measureRef: React.RefObject<HTMLDivElement | null>;
};

const HeroIntroContext = createContext<HeroIntro | null>(null);

export function useHeroIntro(): HeroIntro {
  const ctx = useContext(HeroIntroContext);
  if (!ctx) {
    throw new Error("useHeroIntro must be used inside <HeroIntroProvider>");
  }
  return ctx;
}

/**
 * The intro is skipped when it has already run in this tab. Reading storage can
 * throw outright in Safari's private mode, so a failure is treated as "not yet
 * played" — a replayed intro is a far better failure mode than a crash.
 */
function introAlreadyPlayed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroPlayed() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* Storage unavailable — the intro simply replays next time. */
  }
}

export function HeroIntroProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotionSafe();
  const measureRef = useRef<HTMLDivElement>(null);

  /* The server cannot know whether the intro has played, so it renders the
     settled, content-visible frame — the same one a returning visitor gets.
     The intro, if it runs, starts in an effect below. */
  const [T, setT] = useState(ENTRY_END);
  const [offset, setOffset] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  /**
   * Distance from the pile's own centre to the centre of the viewport, on both
   * axes. Both are needed: on desktop the correction is horizontal (the pile
   * sits in the right-hand column), while on a stacked layout it is mostly
   * vertical, because the hidden copy still reserves its grid row and pushes
   * the pile into the lower half of the screen.
   */
  const measure = useCallback(() => {
    const el = measureRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setOffset(rect.left + rect.width / 2 - window.innerWidth / 2);
    setOffsetY(rect.top + rect.height / 2 - window.innerHeight / 2);
  }, []);

  /**
   * Rewind before the browser paints.
   *
   * The server has to emit the settled, content-visible frame — it cannot know
   * whether this visitor has seen the intro, and shipping hidden copy would put
   * the `h1` out of reach of anything that does not run scripts. That leaves a
   * window where the finished hero is in the DOM but the intro is about to
   * start, and a plain `useEffect` runs *after* paint, so the copy flashed on
   * screen for a frame before hiding.
   *
   * `useLayoutEffect` commits synchronously between mutation and paint, so the
   * rewind lands in the same frame the browser first draws. Measuring here too
   * means the pile is already centred on that first frame rather than jumping.
   */
  useIsomorphicLayoutEffect(() => {
    if (reduced || introAlreadyPlayed()) return;
    measure();
    setT(0);
    /* The pile can be shown the moment its offset is known — by this point the
       transform for T=0 is committed, so its first visible frame is the centred
       one. The copy stays hidden until the reveal, which is why the two are
       released by separate attributes rather than one. */
    document.documentElement.removeAttribute("data-hero-pile-hidden");
  }, [reduced, measure]);

  useEffect(() => {
    measure();
    const el = measureRef.current;
    if (!el) return;
    /* The cell's own size and the viewport both matter, so watch both. */
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /**
   * This effect deliberately runs more than once, and must stay safe when it
   * does. `useReducedMotionSafe` reports false for the hydration pass and the
   * real preference on the render straight after, and React's Strict Mode
   * double-invokes effects in development.
   *
   * The safety comes from the flag being written when the intro *finishes*,
   * never when it starts: a re-run simply restarts the clock from zero, which
   * is visually correct. An earlier version marked it played up front and so
   * suppressed the animation it was about to run — nothing ever drew.
   */
  useEffect(() => {
    if (reduced || introAlreadyPlayed()) return;

    let raf = 0;
    /* The clock starts on the first frame rather than here, so the entry plays
       from T=0 without a synchronous rewind during the effect. */
    let start = 0;
    let marked = false;
    const tick = (now: number) => {
      if (start === 0) start = now;
      const elapsed = (now - start) / 1000;
      setT(elapsed);
      /* Mark it seen only once the intro has actually finished, so a visitor
         who navigates away mid-animation still gets it next time. The loop
         itself keeps running: the idle float, the glow pulse and the drifting
         motes are all functions of T, and freezing the clock would freeze them. */
      if (!marked && elapsed >= ENTRY_END) {
        marked = true;
        markIntroPlayed();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const revealed = T >= CONTENT;

  /* Hand control back to React. The pre-paint rule uses `!important` to win the
     first frame, so it has to be released the moment the copy is due, or it
     would pin the copy hidden for good. Dropping the attribute lets the normal
     Tailwind transition play the reveal. */
  useIsomorphicLayoutEffect(() => {
    if (!revealed) return;
    document.documentElement.removeAttribute("data-hero-intro");
  }, [revealed]);

  return (
    <HeroIntroContext.Provider
      value={{ T, revealed, offset, offsetY, measureRef }}
    >
      {children}
    </HeroIntroContext.Provider>
  );
}
