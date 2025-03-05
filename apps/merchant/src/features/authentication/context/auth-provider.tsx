"use client";

import { auth } from "@/lib/firebase/client";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";
import { AUTH_COOKIE } from "../data";

interface AuthContextInterface {
  user: User | null;
  setUserHandler: (user: User) => Promise<void>;
  singOutUserHandler: () => Promise<void>;
}

const AuthContext = createContext<AuthContextInterface>({
  user: null,
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
  const router = useRouter();
  const pathname = usePathname();
  const setUserHandler = async (user: User) => {
    setUser(user);
    const idToken = await user.getIdToken();
    setCookie(AUTH_COOKIE, idToken, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  };

  const singOutUserHandler = async () => {
    setUser(null);
    signOut(auth);
    await deleteCookie(AUTH_COOKIE);
  };

  useEffect(() => {
    if (!pathname.startsWith("/dashboard")) router.replace("/dashboard/home");
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const value = { user, setUserHandler, singOutUserHandler };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
