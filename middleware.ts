import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

/**
 * Build a strict CSP using a per-request nonce.
 *
 * The static CSP in vercel.json relies on `'unsafe-inline'` for scripts
 * because Next.js needs to inline a tiny boot script and the streaming
 * RSC payload. With a nonce we can drop `'unsafe-inline'` for `script-src`
 * — the only inline scripts emitted by Next.js carry our nonce, and the
 * `strict-dynamic` directive lets them load further chunks without
 * whitelisting every hashed asset URL.
 *
 * `style-src` keeps `'unsafe-inline'` for now because Next/Tailwind ship
 * critical CSS as inline `<style>` tags without a nonce hook (would need
 * Next.js to plumb it). This is a documented compromise for App Router.
 */
function buildCsp(nonce: string): string {
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline' https:`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://*.r2.cloudflarestorage.com",
    "font-src 'self' data:",
    "connect-src 'self' https://*.public.blob.vercel-storage.com https://*.r2.cloudflarestorage.com https://api.resend.com https://plausible.io https://vitals.vercel-insights.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ];
  return directives.join("; ");
}

function generateNonce(): string {
  // 16 random bytes → base64 — strong enough for CSP nonces per spec.
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

export default function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const csp = buildCsp(nonce);

  // Forward the nonce to the rendered page via request headers so that
  // server components can read it (e.g. via headers().get("x-nonce")).
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  // Run next-intl with the augmented request, then layer our headers on
  // top of its response so locale rewrites and CSP both ship.
  const intlResponse = intlMiddleware(
    new Request(request.url, {
      headers: requestHeaders,
      method: request.method,
    }) as NextRequest,
  );

  const response = intlResponse ?? NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("content-security-policy", csp);
  response.headers.set("x-nonce", nonce);
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
