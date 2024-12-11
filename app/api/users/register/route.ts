import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { registerSchema, RegisterInput } from "@/types/users/userType";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password }: RegisterInput = registerSchema.parse(body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
        emailVerified: false,
        verificationCode,
      },
    });
    await sendEmail(email, verificationCode);
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
        {
          error: error.errors.map((err: z.ZodIssue) => err.message).join(", "),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: `Internal Server Error: ${JSON.stringify(error)}` },
      { status: 500 }
    );
  }
}

async function sendEmail(to: string, verificationCode: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: "Email Verification - Your App",
    text: `Your verification code is: ${verificationCode}. Please use this code to verify your email address.`,
    html: `<p>Your verification code is: <strong>${verificationCode}</strong>. Please use this code to verify your email address.</p>`,
  };

  await transporter.sendMail(mailOptions);
}
