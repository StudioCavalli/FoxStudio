import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run i18n middleware on every public path EXCEPT:
  // - /api/* (Payload REST/GraphQL)
  // - /admin/* (Payload admin UI)
  // - /_next/*, /_vercel/* (Next/Vercel internals)
  // - any path with a file extension (assets)
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
