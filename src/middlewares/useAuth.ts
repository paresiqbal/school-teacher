import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const onlyAdmin = ["/adminDashboard"];

export default function withAuth(
  middleware: NextMiddleware,
  reqAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (reqAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        const url = new URL("/login", req.nextUrl);
        url.searchParams.set("callbackUrl", encodeURI(req.url));

        return NextResponse.redirect(url);
      }

      if (token.role === "admin" && onlyAdmin.includes(pathname)) {
        return NextResponse.redirect(new URL("/adminDashboard", req.url));
      }
    }

    return middleware(req, next);
  };
}
