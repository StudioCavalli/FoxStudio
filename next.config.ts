import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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

export default withPayload(withNextIntl(nextConfig), {
  devBundleServerPackages: false,
});
