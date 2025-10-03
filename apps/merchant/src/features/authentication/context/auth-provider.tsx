"use client";

import { auth } from "@/lib/firebase/client";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";
import { AUTH_COOKIE, LOGIN_CREDENTIALS_KEY } from "../data";
import { removeFromLocalStorage } from "~/src/utils/local-storage";

interface AuthContextInterface {
  user: User | null;
  loading: boolean;
  setUserHandler: (user: User) => Promise<void>;
  singOutUserHandler: () => Promise<void>;
}

const AuthContext = createContext<AuthContextInterface>({
  user: null,
  loading: true,
  setUserHandler: async () => {},
  singOutUserHandler: async () => {},
});

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const setUserHandler = async (user: User) => {
    setUser(user);
    const idToken = await user.getIdToken();
    
    // Set secure auth cookie via API route
    try {
      await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
      });
    } catch (error) {
      console.error("Failed to set secure auth cookie:", error);
      // Fallback to client-side cookie (less secure but functional)
      setCookie(AUTH_COOKIE, idToken, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
  };

  const singOutUserHandler = async () => {
    setUser(null);
    signOut(auth);
    await deleteCookie(AUTH_COOKIE);
    router.replace("/home");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Set secure auth cookie via API route
        const idToken = await firebaseUser.getIdToken();
        try {
          await fetch("/api/auth/set-cookie", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: idToken }),
          });
        } catch (error) {
          console.error("Failed to set secure auth cookie on auth state change:", error);
          // Fallback to client-side cookie
          setCookie(AUTH_COOKIE, idToken, {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });
        }
      } else {
        setUser(null);
        deleteCookie(AUTH_COOKIE);
      }
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const value = { user, loading, setUserHandler, singOutUserHandler };

  return (
    <AuthContext.Provider value={value}>{children as any}</AuthContext.Provider>
  );
};
