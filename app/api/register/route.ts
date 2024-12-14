// app/api/register/route.ts
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb"; // Ensure prisma is correctly imported

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword: hashedPassword, // Ensure the key is `password` in your schema
        name,
      },
    });

    return NextResponse.json(user, { status: 201 }); // Return the created user
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
