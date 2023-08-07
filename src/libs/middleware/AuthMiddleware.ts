import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export const AuthMiddleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("user", JSON.stringify(session.user));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};
