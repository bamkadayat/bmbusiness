import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  // Define paths that logged-in users should not access
  const restrictedPaths = ["/login", "/register"];

  // If a user is logged in and trying to access a restricted path, redirect to /overview
  if (token && restrictedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/overview", req.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Specify which routes should invoke this middleware
export const config = {
  matcher: ["/login", "/register", "/overview"], // Only apply middleware to login and register pages
};
