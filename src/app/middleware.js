// middleware.js
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function middleware(req) {
  const res = NextResponse.next();

  // Read cookies from the request
  const cookieStore = cookies();

  // Create Supabase client with cookies
  const supabase = createMiddlewareClient({ cookies: () => cookieStore });

  // Get current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  // 1️⃣ No session → trying to access dashboard → redirect to login
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ Has session → trying to access login page → redirect to dashboard
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

// Apply middleware to dashboard and login routes
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
