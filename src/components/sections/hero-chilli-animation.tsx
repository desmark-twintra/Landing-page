"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotionSafe } from "@/lib/hydration";
import { HOLD_END, IMPACT, MOVE_END, useHeroIntro } from "./hero-intro-context";

/**
 * The hero's imagery: a cut-out chilli pile that drops in, lands with an
 * impact, throws a burst of spice dust, then settles into a slow idle float
 * under a pulsing heat glow.
 *
 * Ported from the `Desmark Chilli Animation` design canvas. Only the
 * choreography came across — the canvas ships a browser-side Babel transform
 * and a scene/export system that have no place in a production bundle, and its
 * painted headline, CTA buttons and trust badges duplicate the real, working
 * ones this hero already renders.
 *
 * Two adaptations were required. The canvas was authored on a cream ground, so
 * its `mix-blend-multiply` glow would turn to mud here; the warm light is
 * additive instead, as the static composition before it was. And the canvas
 * hard-codes 1920x1080 world coordinates, while this slot is fluid — every
 * distance below is expressed in design units and scaled by `unit`, so nothing
 * is pinned to a pixel size.
 */

/** The pile artwork's aspect ratio, and the design width its offsets assume. */
const PILE_ASPECT = 1400 / 933;
const DESIGN_W = 1120;

/** Period of the idle float and glow pulse. */
const IDLE_PERIOD = 10.6;

const clamp = (v: number, min: number, max: number) =>
  v < min ? min : v > max ? max : v;

/* Curves copied from the canvas runtime so the timing matches the original. */
const easeOutCubic = (t: number) => --t * t * t + 1;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

type Stop = { t: number; v: number; ease?: (t: number) => number };

/** Piecewise keyframe interpolator — the canvas's `key()`. */
function key(T: number, stops: Stop[]) {
  if (T <= stops[0].t) return stops[0].v;
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (T <= b.t) {
      const p = clamp((T - a.t) / (b.t - a.t), 0, 1);
      return a.v + (b.v - a.v) * (b.ease || easeInOutCubic)(p);
    }
  }
  return stops[stops.length - 1].v;
}

/* Seeded RNG: the particle fields must be identical on every render, so the
   server's markup and the client's first paint agree. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

type BurstParticle = {
  ang: number;
  dist: number;
  size: number;
  speed: number;
  delay: number;
  golden: boolean;
  rise: number;
  wob: number;
};

function buildBurst(n: number): BurstParticle[] {
  const r = rng(11);
  const a: BurstParticle[] = [];
  for (let i = 0; i < n; i++)
    a.push({
      ang: -Math.PI / 2 + (r() - 0.5) * Math.PI * 1.35, // biased upward/outward
      dist: 220 + r() * 620,
      size: 5 + r() * 18,
      speed: 0.55 + r() * 0.6,
      delay: r() * 0.32,
      golden: r() > 0.76,
      rise: 40 + r() * 150,
      wob: r() * 6.283,
    });
  return a;
}

type Mote = {
  ox: number;
  oy: number;
  size: number;
  amp: number;
  spd: number;
  ph: number;
  gold: boolean;
};

function buildMotes(n: number): Mote[] {
  const r = rng(29);
  const a: Mote[] = [];
  for (let i = 0; i < n; i++)
    a.push({
      ox: (r() - 0.5) * 900,
      oy: (r() - 0.4) * 560,
      size: 3 + r() * 9,
      amp: 40 + r() * 120,
      spd: 0.4 + r() * 0.5,
      ph: r() * 6.283,
      gold: r() > 0.6,
    });
  return a;
}

/* Warmed toward the hero's own palette — the canvas reds were picked against
   cream and read muddy on this dark panel. */
const REDS = ["#e8743b", "#d94f2a", "#f08a52", "#c0392b", "#e05f3a"];
const GOLD = "#e8a13c";

const DENSITY = 46;
const BURST_FULL = buildBurst(DENSITY);
const MOTES_FULL = buildMotes(Math.max(8, Math.round(DENSITY * 0.6)));

export function HeroChilliAnimation() {
  const reduced = useReducedMotionSafe();
  /* The clock and the centring offset are shared with the copy column, so both
     halves of the hero move on one timeline. `measureRef` goes on the wrapper
     below — its centre is what gets measured against the viewport. */
  const { T, offset, offsetY, measureRef } = useHeroIntro();

  /** Pile width in px, so design-space offsets can be scaled to the real box. */
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [measureRef]);

  /* One `unit` converts every design-space distance below into real pixels. */
  const unit = width > 0 ? width / DESIGN_W : 0;
  /* Thin the field on small screens: the motes are barely visible there and the
     particle count is what costs the most. */
  const small = width > 0 && width < 380;
  const burst = small
    ? BURST_FULL.slice(0, Math.round(DENSITY * 0.55))
    : BURST_FULL;
  const motes = small
    ? MOTES_FULL.slice(0, Math.round(MOTES_FULL.length * 0.55))
    : MOTES_FULL;

  const eo = easeOutCubic;
  const eio = easeInOutCubic;
  const eob = easeOutBack;

  /* ---- pile choreography (design units; scaled by `unit` at paint) ---- */
  const ty = key(T, [
    { t: 0, v: -880 },
    { t: IMPACT, v: 0, ease: eo },
  ]);

  /* The travel. Unlike every other offset here this is already in real pixels —
     it comes from `getBoundingClientRect`, not the 1120-unit design space — so
     it must NOT be scaled by `unit`. The pile starts shifted left by `offset`
     (centred in the viewport), holds there, then rides back to 0, which is its
     natural grid cell. Resting at zero translation is what guarantees the final
     frame matches the static layout exactly. */
  const tx = key(T, [
    { t: 0, v: -offset },
    { t: HOLD_END, v: -offset },
    { t: MOVE_END, v: 0, ease: eio },
  ]);

  /* The vertical half of the same correction. On desktop this is near zero (the
     grid centres its rows), but when the hero stacks the hidden copy still
     reserves its row and would otherwise leave the pile sitting low on screen
     instead of centred. Same rule as `tx`: real pixels, never scaled by `unit`. */
  const tyCentre = key(T, [
    { t: 0, v: -offsetY },
    { t: HOLD_END, v: -offsetY },
    { t: MOVE_END, v: 0, ease: eio },
  ]);

  const sc = key(T, [
    { t: 0, v: 1.06 },
    { t: IMPACT, v: 1.0, ease: eo },
    { t: HOLD_END, v: 1.0 },
    /* A push-in as it starts to move. The canvas used 1.32, which overflows the
       fold at hero scale — 1.12 keeps the gesture without breaking min-h-svh. */
    { t: HOLD_END + 0.35, v: 1.12, ease: eio },
    { t: MOVE_END, v: 1.0, ease: eio },
  ]);
  // squash & stretch on landing
  const sy = key(T, [
    { t: 0, v: 1.07 },
    { t: IMPACT - 0.05, v: 1.09 },
    { t: IMPACT + 0.04, v: 0.9, ease: eo },
    { t: IMPACT + 0.18, v: 1.04, ease: eo },
    { t: IMPACT + 0.34, v: 1.0, ease: eo },
  ]);
  const sx = 2 - sy; // conserve volume
  const rot = key(T, [
    { t: 0, v: -4 },
    { t: IMPACT + 0.2, v: 0, ease: eob },
  ]);

  // gentle life once landed
  const settled = clamp((T - IMPACT - 0.4) / 0.6, 0, 1);
  const lifeY = Math.sin((2 * Math.PI * T) / IDLE_PERIOD + 1) * 8 * settled;
  const lifeR = Math.sin(T * 0.55) * 0.8 * settled;

  // impact camera shake
  let shx = 0;
  let shy = 0;
  const sl = T - IMPACT;
  if (sl > 0 && sl < 0.5) {
    const amp = (1 - sl / 0.5) * 12;
    shx = Math.sin(sl * 90) * amp;
    shy = Math.cos(sl * 105) * amp * 0.6;
  }

  // heat glow
  const flash =
    clamp((T - IMPACT) / 0.15, 0, 1) *
    (1 - clamp((T - IMPACT - 0.2) / 1.0, 0, 1));
  const glowPulse = 0.5 + 0.5 * Math.sin((2 * Math.PI * T) / IDLE_PERIOD);
  const glowSc = 0.85 + 0.12 * glowPulse * settled + flash * 0.28;
  const glowOp = 0.5 + 0.18 * glowPulse * settled + flash * 0.45;

  const px = (v: number) => v * unit;

  /* Particles are laid out from the pile's centre. `unit` is 0 until the
     ResizeObserver reports, so on the server and the first paint they are
     skipped entirely — nothing to mismatch. */
  const showParticles = unit > 0 && !reduced;

  const burstNodes = !showParticles
    ? null
    : burst.map((p, i) => {
        const local = T - IMPACT - p.delay;
        const dur = 1.0 * p.speed;
        const f = clamp(local / dur, 0, 1);
        const ef = easeOutExpo(f);
        const op =
          local < 0
            ? 0
            : clamp(local / 0.12, 0, 1) *
              (1 - clamp((local - 0.5) / 1.7, 0, 1));
        if (op <= 0.002) return null;
        const x = px(
          Math.cos(p.ang) * p.dist * ef + Math.sin(T * 0.9 + p.wob) * 7 * f,
        );
        const y = px(Math.sin(p.ang) * p.dist * ef - ef * ef * p.rise);
        const sz = px(p.size * (0.6 + 0.4 * f));
        const col = p.golden ? GOLD : REDS[i % REDS.length];
        return (
          <span
            key={`b${i}`}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: sz,
              height: sz,
              transform: `translate3d(${x - sz / 2}px, ${y - sz / 2}px, 0)`,
              background: col,
              opacity: op * 0.9,
              boxShadow: `0 0 ${sz * 0.7}px ${col}66`,
            }}
          />
        );
      });

  const moteNodes = !showParticles
    ? null
    : motes.map((p, i) => {
        const rise = ((T * p.spd + p.ph) % 4) / 4; // 0..1 loop
        const op = Math.sin(rise * Math.PI) * 0.35 * settled;
        if (op <= 0.002) return null;
        const x = px(p.ox + Math.sin(T * 0.5 + p.ph) * 22);
        const y = px(p.oy - rise * p.amp);
        const sz = px(p.size);
        return (
          <span
            key={`m${i}`}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: sz,
              height: sz,
              transform: `translate3d(${x - sz / 2}px, ${y - sz / 2}px, 0)`,
              background: p.gold ? GOLD : "#e05f3a",
              opacity: op,
              filter: "blur(0.4px)",
            }}
          />
        );
      });

  return (
    <div
      /* The pre-paint rule in globals.css holds this invisible until the offset
         has been measured, so the pile's first visible frame is the centred one
         rather than its settled slot. Covers the backlight too, which would
         otherwise show in the wrong place for the same instant. */
      data-hero-pile
      className="relative isolate flex w-full items-center justify-center py-6 lg:justify-end lg:py-10"
    >
      {/* Backlight, so the pods appear lit from within the panel. Clipped by the
          hero's `overflow-hidden`, so it can never widen the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[130%] max-w-none"
        style={{
          /* Travels with the pile, so the light stays behind the subject rather
             than being left behind in the centre of the screen. */
          transform: `translate3d(calc(-50% + ${tx}px), calc(-50% + ${tyCentre}px), 0)`,
          willChange: "transform",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,124,64,0.4) 0%, rgba(214,69,40,0.2) 40%, transparent 70%)",
        }}
      />

      {/* The measured box. It is never transformed — a translated element would
          report a shifted `getBoundingClientRect`, and the measurement that
          drives the travel would feed back on itself. The moving parts all sit
          on the inner layer instead. */}
      <div
        ref={measureRef}
        className="relative w-full max-w-[20rem] sm:max-w-md lg:max-w-lg"
        style={{ aspectRatio: String(PILE_ASPECT) }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate3d(${tx}px, ${tyCentre}px, 0)`,
            willChange: "transform",
          }}
        >
        {/* Heat glow. Additive rather than the canvas's multiply — this panel is
            dark, and multiply would only darken it further. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[120%] rounded-full mix-blend-screen"
          style={{
            transform: `translate3d(calc(-50% + ${px(shx)}px), calc(-50% + ${px(shy)}px), 0) scale(${glowSc})`,
            opacity: glowOp * 0.55,
            background:
              "radial-gradient(circle, rgba(224,95,58,0.55) 0%, rgba(192,57,43,0.28) 34%, transparent 62%)",
            filter: "blur(8px)",
            willChange: "transform, opacity",
          }}
        />

        {/* Contact shadow — grounds the pile so it does not float in a void. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[14%] bottom-[4%] -z-10 h-[10%] rounded-[50%] blur-2xl"
          style={{
            background: "rgba(60,12,4,0.55)",
            opacity: 0.9 * settled,
            transform: `translate3d(${px(shx)}px, ${px(shy)}px, 0) scaleX(${sc})`,
          }}
        />

        {/* The pile itself. */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate3d(${px(shx)}px, ${px(ty + lifeY + shy)}px, 0) rotate(${rot + lifeR}deg) scale(${sc * sx}, ${sc * sy})`,
            willChange: "transform",
          }}
        >
          <Image
            src="/products/chilli-pile.webp"
            alt="A pile of sun-dried whole red chillies"
            fill
            priority
            sizes="(min-width: 1024px) 36vw, (min-width: 640px) 50vw, 85vw"
            className="object-contain [filter:drop-shadow(0_22px_26px_rgba(120,20,10,0.35))]"
          />
        </div>

          {/* Dust. Above the pile so the burst reads as thrown toward the
              viewer. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {moteNodes}
            {burstNodes}
          </div>
        </div>
      </div>
    </div>
  );
}
