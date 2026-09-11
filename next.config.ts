import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Serve modern formats — the vision/mission artwork is heavy source PNG. */
    formats: ["image/avif", "image/webp"],
  },
  /* No need to advertise the framework on every response. */
  poweredByHeader: false,
};

export default nextConfig;
