import { auth } from "@/lib/firebase/client";
import {
  checkIfIsFirebaseError,
  getErrorMessage,
} from "@/lib/utils/interfaceChecker";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export const useSignin = () => {
  const [isLoading, setIsProcessing] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      if (!email || !password) return;
      setIsProcessing(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response;
    } catch (error: any) {
      // eslint-disable-line @typescript-eslint/no-explicit-any
      console.log("[sign-in-error]", error);
      const fbError = checkIfIsFirebaseError(error);
      if (!fbError) return "Can not login";
      const msg = getErrorMessage("signIn", fbError);
      return msg;
    } finally {
      setIsProcessing(false);
    }
  };

  return { isLoading, signIn };
};
