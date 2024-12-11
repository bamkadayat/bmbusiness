import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["USER", "ADMIN"], { errorMap: () => ({ message: "Role must be 'USER' or 'ADMIN'" }) }),
});

export async function POST(request: Request) {
  try {
    // Read the request body once
    const body = await request.json();

    // Parse and validate the body using zod
    const { name, email, password, role } = registerSchema.parse(body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        emailVerified: false,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    if ((error as { code?: string }).code === "P2002") {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors.map((err) => err.message).join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: `Internal Server Error: ${JSON.stringify(error)}` },
      { status: 500 }
    );
  }
}
