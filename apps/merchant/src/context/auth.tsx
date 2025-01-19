"use client";

import { auth } from "@/lib/firebase/client";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextInterface {
  user: User | null;
}

const contextInitialData: AuthContextInterface = {
  user: null,
};

const AuthContext = createContext(contextInitialData);

export const useAuth = (): AuthContextInterface => {
  const context = useContext<AuthContextInterface>(AuthContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

export const AuthProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
        router.push("/dashboard/home");
        if (
          user.emailVerified &&
          !pathname.startsWith("/explore") &&
          !pathname.startsWith("/legal")
        ) {
          // router.push("/dashboard/home");
        } else if (
          !user.emailVerified &&
          !pathname.startsWith("/confirm-email")
        ) {
          // router.push("/verify-email");
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const value = { user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
