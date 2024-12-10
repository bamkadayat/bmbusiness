import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test database connection
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
