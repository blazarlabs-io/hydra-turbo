import { FirebaseError } from "firebase/app";
import { authErrorCodes } from "./firebaseErrorCodes";

export function checkIfIsFirebaseError(obj: any) {
  if ((obj as FirebaseError).code) return obj as FirebaseError;
  return;
}

type KeyTypes = keyof typeof authErrorCodes;

export const getErrorMessage = (key: KeyTypes, error: FirebaseError) => {
  let message = "";
  Object.entries(authErrorCodes[key]).forEach(([key, value]) => {
    if (value.code.includes(error.code)) {
      message = value.message;
    }
  });
  return message || "Firebase error";
};
