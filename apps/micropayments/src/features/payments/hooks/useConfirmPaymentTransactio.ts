import { db } from "@/lib/firebase/client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

type PaymentTransaction = {
  amount: string;
  createdAt: string;
  invoiceRef: string;
  processed: boolean;
  targetRef: string;
  merchantName: string;
};

export const useConfirmPaymentTransactio = (paymentTransactionId: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const confirmHandler = async () => {
    try {
      setIsLoading(true);
      console.log("paymentTransactionId");
      const docRef = doc(db, "payment-transactions", paymentTransactionId);
      const paymentDoc = await getDoc(docRef);
      if (!paymentDoc.exists()) return;
      await updateDoc(docRef, { processed: true });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, confirmHandler };
};
