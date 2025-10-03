import "server-only";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET() {
  try {
    // Fetch ADA price
    const adaResponse = await fetch(
      "https://api.livecoinwatch.com/coins/single",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": env.LIVE_COIN_WATCH_API_KEY,
        },
        body: JSON.stringify({
          currency: "USD",
          code: "ADA",
          meta: true,
        }),
      },
    );

    // Fetch WBTC price
    const wbtcResponse = await fetch(
      "https://api.livecoinwatch.com/coins/single",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": env.LIVE_COIN_WATCH_API_KEY,
        },
        body: JSON.stringify({
          currency: "USD",
          code: "WBTC",
          meta: true,
        }),
      },
    );

    const [adaData, wbtcData] = await Promise.all([
      adaResponse.json(),
      wbtcResponse.json(),
    ]);

    return NextResponse.json({
      ada: adaData.rate,
      wbtc: wbtcData.rate,
    });
  } catch (error) {
    console.error("Error fetching coin prices:", error);
    return NextResponse.json(
      { error: "Failed to fetch coin prices" },
      { status: 500 },
    );
  }
}
