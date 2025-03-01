"use client";

import { useEffect } from "react";
import { useAuth } from "~/src/features/authentication/context/auth-provider";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // if (!user || !user.emailVerified) {
    //   router.replace("/");
    // }
    if (!user) {
      router.replace("/");
    }
  }, []);

  return <>{user && <>{children}</>}</>;
};
