import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  console.log(request);
  return NextResponse.json({ status: 200, message: "Success" });
}
