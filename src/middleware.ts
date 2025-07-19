import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { PROTECTED_ROUTES } from "./lib/constants";

export async function middleware(request: NextRequest) {
  // --- Task 1: Authentication and Authorizatiaon ---
  const session = await auth();
  const callbackUrl = request.url;
  const pathname = request.nextUrl.pathname;

  const isLoggedIn = !!session?.user;
  const isProtected = PROTECTED_ROUTES.some((route) => route === pathname);

  if (isProtected && !isLoggedIn) {
    const redirectUrl = new URL("/signin", request.url);
    redirectUrl.searchParams.set("callbackUrl", callbackUrl);

    return NextResponse.redirect(redirectUrl);
  }

  // --- Task 2: Guest Cart Cookie ---
  const response = NextResponse.next();

  const sessionCartId = request.cookies.get("sessionCartId");

  if (sessionCartId) return response;

  // if session not exist create one
  response.cookies.set("sessionCartId", crypto.randomUUID());
  return response;
}

// Run this middleware on all paths except for static files and API routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
