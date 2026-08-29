"use client";

import { createContext, useContext, useRef } from "react";

const ScrollViewportContext =
  createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export function useScrollViewport() {
  const ctx = useContext(ScrollViewportContext);
  if (!ctx) {
    throw new Error("useScrollViewport must be used inside <ScrollViewportProvider>");
  }
  return ctx;
}

export function ScrollViewportProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <ScrollViewportContext.Provider value={ref}>
      {children}
    </ScrollViewportContext.Provider>
  );
}
