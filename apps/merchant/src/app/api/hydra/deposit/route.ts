import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${env.HYDRA_API_URL}/deposit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Hydra API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error depositing funds:", error);
    return NextResponse.json(
      { error: "Failed to deposit funds" },
      { status: 500 }
    );
  }
}
