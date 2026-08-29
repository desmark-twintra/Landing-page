import React from "react";

import { cn } from "@/lib/utils";

/**
 * A ring of children that travel along a circular path.
 *
 * Each child gets a single `animate-orbit` animation whose keyframe rotates the
 * node around the ring and counter-rotates it by the same amount, so artwork and
 * labels stay upright without a second, phase-matched animation.
 *
 * Geometry is expressed as CSS lengths rather than fixed numbers, so one
 * expression — `calc(var(--orbit-d) * 0.36)` — can drive the same ring from a
 * phone to a television.
 *
 * Pure CSS: no client JavaScript, and `prefers-reduced-motion` freezes it from
 * globals.css.
 */

/** A pixel count, or any CSS length (`calc(...)`, `clamp(...)`, `12rem`). */
type Length = number | string;

const toLength = (value: Length) =>
  typeof value === "number" ? `${value}px` : value;

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  /** Travel anti-clockwise instead of clockwise. */
  reverse?: boolean;
  /** Seconds for one full revolution, before `speed` is applied. */
  duration?: number;
  /** Seconds to wait before the ring starts moving. */
  delay?: number;
  /** Orbit radius, measured from the centre of the parent. */
  radius?: Length;
  /** Render the orbit path itself. */
  path?: boolean;
  /** Classes for the path ring — border colour, style, width. */
  pathClassName?: string;
  /** Rotates the whole arrangement, so stacked rings can be offset from each other. */
  startAngle?: number;
  /** Size of each node's box. */
  iconSize?: Length;
  /** Multiplier on `duration` — 2 is twice as fast. */
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 0,
  radius = 160,
  path = true,
  pathClassName,
  startAngle = 0,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  const count = React.Children.count(children);
  const r = toLength(radius);
  const size = toLength(iconSize);

  return (
    <>
      {path && (
        // A div rather than an <svg><circle>: `r` is an SVG geometry attribute
        // and will not take a var(), so an SVG path could not scale with the
        // same variable that positions the nodes.
        <div
          aria-hidden
          style={{
            width: `calc(${r} * 2)`,
            height: `calc(${r} * 2)`,
            marginLeft: `calc(${r} * -1)`,
            marginTop: `calc(${r} * -1)`,
          }}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-panel-ink/15",
            pathClassName,
          )}
        />
      )}

      {React.Children.map(children, (child, index) => {
        const angle = startAngle + (360 / count) * index;

        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": r,
                "--angle": `${angle}deg`,
                "--icon-size": size,
                animationDelay: delay ? `${delay}s` : undefined,
              } as React.CSSProperties
            }
            className={cn(
              // Centred with negative margins rather than a translate utility:
              // the keyframe owns `transform`, so a static transform would be
              // overridden the moment the animation starts.
              "animate-orbit absolute left-1/2 top-1/2 flex size-(--icon-size) items-center justify-center",
              "ml-[calc(var(--icon-size)/-2)] mt-[calc(var(--icon-size)/-2)] [will-change:transform]",
              { "[animation-direction:reverse]": reverse },
              className,
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
