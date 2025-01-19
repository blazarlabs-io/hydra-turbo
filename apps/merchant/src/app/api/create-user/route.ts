import axios from "axios";
import { Timestamp } from "firebase/firestore";
import { initAdmin } from "~/src/lib/firebase/admin";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Only POST requests allowed" }),
      { status: 405 },
    );
  }

  const data = await req.json();

  const { uid, email, isMerchant } = data;

  try {
    const app = await initAdmin();
    const db = app.firestore();
    const collection = isMerchant ? "merchants" : "users";
    const res = db
      .collection(collection)
      .doc(uid)
      .set({
        createdAt: Timestamp.fromDate(new Date()),
        lastUpdated: Timestamp.fromDate(new Date()),
        uid,
        email,
      });

    console.log(res);
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
