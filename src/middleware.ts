import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";
import { getToken } from "next-auth/jwt";

export async function mainMiddleware(req: NextRequest) {
  const adminPaths = ["/adminDashboard"];
  const pathname = req.nextUrl.pathname;

  // Check if the current path requires admin access
  if (adminPaths.includes(pathname)) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // If no token or the role is not admin, redirect to the home page or login
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export default withAuth(mainMiddleware, ["/adminDashboard", "/dashboard"]);
