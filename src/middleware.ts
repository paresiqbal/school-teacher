import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {}

export const config = {
  matcher: ["/adminDashboard/:path*", "/dashboard"],
};
