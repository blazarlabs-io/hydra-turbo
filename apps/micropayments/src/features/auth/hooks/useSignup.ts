import { auth } from "@/lib/firebase/client";
import {
  checkIfIsFirebaseError,
  getErrorMessage,
} from "@/lib/utils/interfaceChecker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
// import { setMicropaymentRoleService } from "../services/authServices";

export const useSignup = () => {
  const [isLoading, setIsProcessing] = useState(false);

  const signUp = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const idToken = await response.user.getIdToken();
      // console.log({ idToken });
      // setMicropaymentRoleService(idToken);
      return response;
    } catch (error: any) {
      // eslint-disable-line @typescript-eslint/no-explicit-any
      console.log("[sign-in-error]", error);
      const fbError = checkIfIsFirebaseError(error);
      if (!fbError) return "Can not sign up";
      const msg = getErrorMessage("signUp", fbError);
      return msg;
    } finally {
      setIsProcessing(false);
    }
  };

  return { isLoading, signUp };
};
