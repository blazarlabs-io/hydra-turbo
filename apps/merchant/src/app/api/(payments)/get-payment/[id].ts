import type { NextApiRequest, NextApiResponse } from "next";
import { initAdmin } from "@/lib/firebase/admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const { id } = req.query; // Get `id` from URL params
    console.log({ id });

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const app = await initAdmin();

    const paymentTransactionRef = app
      .firestore()
      .collection("payment-transactions");

    const doc = await paymentTransactionRef.doc(id).get();

    if (!doc.exists) return res.status(404).send({ message: "Not found" });

    return res.status(200).json(doc.data());
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}
