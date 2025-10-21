import { NextRequest, NextResponse } from "next/server";

const AUTH_SERVER_URL = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;

export default async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token");
  if (accessToken) {
    return NextResponse.next();
  }

  const refreshToken = req.cookies.get("refresh_token");
  if (!refreshToken) return NextResponse.next();
  try {
    const refreshRes = await fetch(`${AUTH_SERVER_URL}/auth/refresh`, {
      method: "GET",
      headers: {
        cookie: req.headers.get("cookie") ?? "",
      },
      credentials: "include",
    });

    const setCookieHeader = refreshRes.headers.get("set-cookie");
    const res = NextResponse.next();

    if (setCookieHeader) res.headers.set("set-cookie", setCookieHeader);

    return res;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
