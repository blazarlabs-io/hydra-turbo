import { AuthError, ErrorFn, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../client";

export const login = async (email: string, password: string) => {
  const authRes: any = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      return user;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
  return authRes;
};
