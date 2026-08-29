"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useScrollViewport } from "@/components/scroll-viewport-context";

export function AppScrollArea({ children }: { children: React.ReactNode }) {
  const viewportRef = useScrollViewport();
  const pathname = usePathname();

  // Next's built-in "scroll new route to top" targets document.documentElement,
  // which is a no-op once this viewport is the app's real scroll box.
  useLayoutEffect(() => {
    viewportRef.current?.scrollTo({ top: 0, left: 0 });
  }, [pathname, viewportRef]);

  return (
    <ScrollArea
      className="flex-1"
      viewportProps={{
        ref: viewportRef,
        id: "app-scroll-viewport",
        className: "app-scroll-viewport",
      }}
    >
      {children}
    </ScrollArea>
  );
}
