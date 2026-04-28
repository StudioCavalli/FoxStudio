import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ["geist"],
  },
};

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
});
