import { NextResponse, NextRequest } from "next/server";

const user = [
  {
    id: 1,
    username: "pahreza.p",
    fullname: "Pahreza Iqbal Prastowo",
    role: "teacher",
  },
  {
    id: 2,
    username: "dian.p",
    fullname: "Dian Puspita",
    role: "teacher",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detailUser = user.find((item) => item.id === Number(id));
    return NextResponse.json({
      status: 200,
      message: "Success",
      user: detailUser,
    });
  }

  return NextResponse.json({ status: 200, message: "Success", user });
}
