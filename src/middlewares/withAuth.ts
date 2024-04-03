import { mainMiddleware } from "@/middleware";
import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  reqAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    const onlyAdmin = ["/adminDashboard"];

    if (reqAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
        return NextResponse.redirect(new URL("/teacherDashboard", req.url));
      }
    }

    return mainMiddleware(req);
  };
}
