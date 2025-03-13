import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "~/src/lib/firebase/client";

type PaymentTransaction = {
  amount: string;
  createdAt: string;
  invoiceRef: string;
  processed: boolean;
  targetRef: string;
};

export const usePaymentTransaction = (paymentTransactionId: string) => {
  const [paymentTransaction, setPaymentTransaction] =
    useState<PaymentTransaction | null>(null);

  useEffect(() => {
    if (!paymentTransactionId) {
      setPaymentTransaction(null);
      return;
    }

    const docRef = doc(db, "payment-transactions", paymentTransactionId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (!docSnap.exists()) return;
      setPaymentTransaction(docSnap.data() as PaymentTransaction);
    });

    return () => unsubscribe();
  }, [paymentTransactionId]);

  return { paymentTransaction };
};
