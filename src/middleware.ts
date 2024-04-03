import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export async function mainMiddleware(req: NextRequest) {
  const res = NextResponse.next();

  return res;
}

export default withAuth(mainMiddleware, [
  "/adminDashboard",
  "/teacherDashboard",
]);
