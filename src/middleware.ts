import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isLogin = false;

  if (!isLogin) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/adminDashboard/:path*", "/dashboard"],
};
