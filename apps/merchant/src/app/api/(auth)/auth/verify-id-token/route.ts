import { NextResponse } from "next/server";
import { getAdminAuth, initAdmin } from "@/lib/firebase/admin";
import { parseBearerToken } from "@/lib/validation/http";

export async function POST(request: Request) {
  try {
    // Validate Authorization header and token format
    const parsed = parseBearerToken(request.headers.get("Authorization"));
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { token } = parsed;

    // Initialize Firebase Admin and verify token
    await initAdmin();
    const auth = getAdminAuth();
    const decodedData = await auth.verifyIdToken(token);

    return NextResponse.json({ token, decodedData });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
