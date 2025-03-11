import { auth } from "@/lib/firebase/client";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface ContextInterface {
  isLoadingAuth: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<ContextInterface>({
  isLoadingAuth: true,
  user: null,
  setUser: () => {},
});

export const useAuth = () => {
  const context = useContext<ContextInterface>(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used as within a Provider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoadingAuth(false);
      if (!user) return;
      setUser(user);
      // router.push("/home");
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ isLoadingAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
