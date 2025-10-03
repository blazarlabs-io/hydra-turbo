import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";

export async function POST(request: NextRequest) {
  try {
    const { query, params } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const data = await client.fetch(query, params || {});
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error executing Sanity query:", error);
    return NextResponse.json(
      { error: "Failed to execute Sanity query" },
      { status: 500 },
    );
  }
}
