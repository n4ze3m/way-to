import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPathProtected, isRedirectProtected } from "./utils/middleware";
import { AuthMiddleware } from "./libs/middleware/AuthMiddleware";
import { RedirectMiddleware } from "./libs/middleware/RedirectMiddleware";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log("path", path);

  // check if the path is protected (e.g. /dashboard/*)
  if (isPathProtected(path)) {
    return AuthMiddleware(request);
  }

  if(isRedirectProtected(path)) {
    return RedirectMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|static|[\\w-]+\\.\\w+).*)",
  ],
};
