"use client";

import { AuthProvider } from "../features/authentication/context/auth-provider";
import { APIProvider } from "@vis.gl/react-google-maps";
import { TransactionsProvider } from "./transactions";
import { CmsProvider } from "./cms";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CmsProvider>
        <TransactionsProvider>
          <AuthProvider>
            <APIProvider
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
            >
              {children}
            </APIProvider>
          </AuthProvider>
        </TransactionsProvider>
      </CmsProvider>
    </>
  );
};
