import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { username, password, role, fullName } = await request.json();

    // Check if username already exists in the user service
    const response = await fetch("http://localhost:3001/user/checkUsername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const { exists } = await response.json();
    if (exists) {
      return NextResponse.json({ status: "error" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create account based on role
    if (role === "teacher" || role === "admin") {
      const response = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password: hashedPassword,
          role,
          fullName,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        return NextResponse.json({ status: "success" });
      } else {
        return NextResponse.json({ status: "error" });
      }
    } else {
      // Handle invalid role
      return NextResponse.json({ status: "error" });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: "error" });
  }
}
