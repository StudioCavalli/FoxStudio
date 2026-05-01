import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

/**
 * Static CSP — kept compatible with Next.js App Router.
 *
 * A nonce-based policy with `'strict-dynamic'` was attempted but
 * Next.js does not reliably auto-tag every inline boot script with the
 * request nonce when next-intl's rewrite is in the chain. With
 * `'strict-dynamic'` active the browser ignores `'self'` /
 * `'unsafe-inline'` and the chunk loader is blocked. #74 stays open
 * to track a proper nonce integration.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://*.r2.cloudflarestorage.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.public.blob.vercel-storage.com https://*.r2.cloudflarestorage.com https://api.emailjs.com https://plausible.io https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

export default function middleware(request: NextRequest) {
  // next-intl handles locale redirection (/ → /fr, etc.).
  const response = intlMiddleware(request);
  response.headers.set("content-security-policy", CSP);
  return response;
}

export const config = {
  // Run on every public path EXCEPT:
  // - /api/* (Payload REST/GraphQL)
  // - /admin/* (Payload admin UI)
  // - /_next/*, /_vercel/* (Next/Vercel internals)
  // - any path with a file extension (assets)
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
