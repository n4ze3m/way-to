import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/server/db";
import { getUserAllCollections } from "~/server/lib/collection";

export const RedirectMiddleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const cookie = req.cookies.get("wtw:token");
  console.log("cookie", cookie);
  const supabase = createMiddlewareClient({ req, res }, {
    supabaseKey: process.env.SUPABASE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
  const path = req.nextUrl.pathname.replace(/^\/r\//, "");
  const url = req.url.replace(/^\/r\//, "");
  console.log("path", path);
  console.log("req.url", req.url);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  //   prisma

  if (cookie) {
    // this means user connekcted with cookie
    console.log("cookie", new URL("/api/redirect", req.url).toString());
    const response = await fetch(new URL("/api/redirect", req.url).toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: cookie.value,
        path,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (data.CODE === "FOUND") {
      return NextResponse.redirect(new URL(data.redirect));
    } else if (data.CODE === "TOO_MANY") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(data.redirect, req.url));
    }
  } else {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
};
