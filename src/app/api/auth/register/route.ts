import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { username, password, role, fullName } = await request.json();

    // Check if username already exists
    const checkUsernameResponse = await fetch(
      "http://localhost:3001/user/check-username",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );

    const checkUsernameData = await checkUsernameResponse.json();

    if (checkUsernameResponse.ok) {
      if (checkUsernameData.exists) {
        return NextResponse.json({
          status: "error",
          message: "Username already exists",
        });
      }
    } else {
      return NextResponse.json({
        status: "error",
        message: "Error checking username existence",
      });
    }

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
          role,
          fullName,
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
