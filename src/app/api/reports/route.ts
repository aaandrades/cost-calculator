import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "GET method on /api/reports" });
}
