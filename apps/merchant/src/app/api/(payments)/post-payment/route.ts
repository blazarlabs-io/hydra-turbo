import { initAdmin } from "@/lib/firebase/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { message: "Method Not Allowed" },
        { status: 400 },
      );
    }
    if (!req.body) return;
    const data = await req.json();

    const app = await initAdmin();
    const paymentTransactionRef = app
      .firestore()
      .collection("payment-transactions");

    const newData = await paymentTransactionRef.add({
      ...data,
      createdAt: new Date().toISOString(),
      provessed: false,
    });
    const newDoc = await newData.get();

    return NextResponse.json(
      { id: newDoc.id, ...newDoc.data() },
      { status: 200 },
    );
  } catch (error: any) {
    console.log("ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
