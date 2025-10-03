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
    router.replace("/home");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setUserHandler(user);
      } else {
        setUser(null);
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
