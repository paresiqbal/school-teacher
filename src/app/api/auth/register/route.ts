import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { username, password, fullName, role } = await request.json();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create account based on role
    const registerResponse = await fetch(
      "http://localhost:3001/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password: hashedPassword,
          fullName,
          role,
        }),
      }
    );

    if (registerResponse.ok) {
      const data = await registerResponse.json();
      if (data.status === "success") {
        return NextResponse.json({ status: "success" });
      } else {
        return NextResponse.json({
          status: "error",
          message: "Registration failed",
        });
      }
    } else {
      return NextResponse.json({
        status: "error",
        message: "Registration request failed",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: "error", message: "An error occurred" });
  }
}
