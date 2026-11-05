import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("iccb_auth_token")?.value;

    // For evaluation convenience, if user hasn't signed in yet, we can either redirect to /sign-in
    // or let it pass if demo token is provided. If no token, redirect to /sign-in.
    if (!token) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
