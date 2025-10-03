import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Address parameter is required" },
        { status: 400 },
      );
    }

    const response = await fetch(
      `${env.HYDRA_API_URL}/query-funds?address=${address}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Hydra API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error querying funds:", error);
    return NextResponse.json(
      { error: "Failed to query funds" },
      { status: 500 },
    );
  }
}
