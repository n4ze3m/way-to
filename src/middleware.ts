import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPathProtected } from "./utils/middleware";
import { AuthMiddleware } from "./libs/middleware/AuthMiddleware";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // check if the path is protected (e.g. /dashboard/*)
  if (isPathProtected(path)) {
    return AuthMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|static|[\\w-]+\\.\\w+).*)",
  ],
};
