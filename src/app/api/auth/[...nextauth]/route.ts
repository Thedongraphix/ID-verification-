import { NextResponse } from "next/server";

// This file is needed to make Next.js Auth work with the Clerk middleware
// It doesn't need to contain any actual logic - Clerk handles this through its middleware
export async function GET() {
  return NextResponse.json(
    { success: true, message: "Auth endpoint for Clerk" },
    { status: 200 }
  );
}

export async function POST() {
  return NextResponse.json(
    { success: true, message: "Auth endpoint for Clerk" },
    { status: 200 }
  );
} 