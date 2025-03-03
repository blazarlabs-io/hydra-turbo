import { useAuth } from "../context";
import { User } from "firebase/auth";
import { useState } from "react";

interface signUpFormProps {
  errorHandler: (error: any) => void;
  authHandler: (
    values: signUpFormProps,
    setUserHandler: (user: User) => Promise<void>,
  ) => void;
}
export function useAuthForm({ authHandler, errorHandler }: signUpFormProps) {
  // * HOOKS
  const { setUserHandler } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // * HANDLERS
  async function onSubmit(values: signUpFormProps) {
    try {
      setIsAuthenticating(true);
      authHandler(values, setUserHandler);
    } catch (error: any) {
      console.error(error);
      errorHandler(error);
    } finally {
      setIsAuthenticating(false);
    }
  }
}
