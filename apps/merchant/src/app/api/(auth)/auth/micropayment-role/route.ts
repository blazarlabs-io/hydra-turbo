import { NextResponse } from "next/server";
import { adminAuth, initAdmin } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  try {
    await initAdmin();
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ undefined }, { status: 401 });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    const decodedData = await adminAuth.verifyIdToken(token || "");

    const currentUser = await adminAuth.getUser(decodedData.uid);
    const customClaims = currentUser.customClaims ?? {};
    const newCustomClaims = {
      ...customClaims,
      isMicropayment: true,
    };
    await adminAuth.setCustomUserClaims(decodedData.uid, newCustomClaims);

    return NextResponse.json({ customClaims: { ...newCustomClaims } }); // You can verify it here
  } catch (error) {
    console.error(error);
    return NextResponse.json({ undefined }, { status: 401 });
  }
}
