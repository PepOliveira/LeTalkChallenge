import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const apiUrl = process.env.INTERNAL_API_URL ?? "http://localhost:3000";

  const response = await fetch(`${apiUrl}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
