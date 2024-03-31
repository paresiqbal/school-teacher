import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/useAuth";

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();

  return res;
}

export default withAuth(mainMiddleware, [
  "/adminDashboard",
  "teacherDashboard",
]);
