import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { validateRequiredParam } from "@/lib/validation/http";
import { secureLogError } from "@/lib/logging";
import { toPublicError, CommonErrors } from "@/lib/errors";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Validate address parameter
    const addressResult = validateRequiredParam(searchParams, "address");
    if (!addressResult.ok) {
      return NextResponse.json({ error: addressResult.error }, { status: 400 });
    }

    const address = addressResult.value;

    // Additional validation for address format (basic check)
    if (address.length < 10 || address.length > 100) {
      return NextResponse.json(
        { error: "Invalid address format" },
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
    // Log securely with context
    secureLogError(error, {
      operation: "queryFunds",
      endpoint: "/api/hydra/query-funds",
    });

    // Return sanitized error response
    const publicError = toPublicError(error, CommonErrors.INTERNAL_ERROR);
    return NextResponse.json(
      { error: publicError.message },
      { status: publicError.status },
    );
  }
}
