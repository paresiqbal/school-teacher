import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

// checking
const adminPage = [
  "/adminDashboard",
  "/student/:path*",
  "/teacher/:path*",
  "/class",
  "/studentRecord",
  "/teacherRecord",
];

const teacherPage = ["/teacherDashboard"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    // url yang perlu di auth
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // jika token tidak ada, redirect ke halaman login
      if (!token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));

        return NextResponse.redirect(url);
      }

      // check admin role and url
      if (token.role !== "admin" && adminPage.includes(pathname)) {
        return NextResponse.redirect(new URL("/teacherDashboard", req.url));
      }

      if (token.role !== "teacher" && teacherPage.includes(pathname)) {
        return NextResponse.redirect(new URL("/adminDashboard", req.url));
      }
    }

    return middleware(req, next);
  };
}
