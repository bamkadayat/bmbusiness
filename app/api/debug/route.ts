import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    console.log("Environment Variables in Production:");
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    console.log("NODE_ENV:", process.env.NODE_ENV);
  try {
    const result = await prisma.$queryRaw`SELECT 1;`;
    return NextResponse.json({ message: "Database connection successful", result });
  } catch (error) {
    console.error("Prisma initialization error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
