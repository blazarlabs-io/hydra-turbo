import { initAdmin } from "@/lib/firebase/admin";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  console.log({ req });
  if (req.method !== "GET") {
    return NextResponse.json(
      {
        message: "Method Not Allowed",
      },
      { status: 405 },
    );
  }
  try {
    const { params } = context; // Get `id` from URL params
    const id = (await params).id;
    console.log("id: ", id);

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        {
          message: "Invalid ID",
        },
        { status: 400 },
      );
    }
    const app = await initAdmin();

    const paymentTransactionRef = app
      .firestore()
      .collection("payment-transactions");

    const doc = await paymentTransactionRef.doc(id).get();

    if (!doc.exists)
      return NextResponse.json(
        {
          message: "Not found",
        },
        { status: 404 },
      );

    return NextResponse.json(
      {
        ...doc.data(),
        id: doc.id,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
      },
      { status: 500 },
    );
  }
}
