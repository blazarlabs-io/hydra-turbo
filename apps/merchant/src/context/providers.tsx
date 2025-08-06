"use client";

import { AuthProvider } from "../features/authentication/context/auth-provider";
import { APIProvider } from "@vis.gl/react-google-maps";
import { TransactionsProvider } from "./transactions";
import { CmsProvider } from "./cms";
import { WalletProvider } from "./wallet";
import { MeshProvider } from "@meshsdk/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <CmsProvider>
          <MeshProvider>
            <WalletProvider>
              <TransactionsProvider>
                <APIProvider
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
                >
                  {children}
                </APIProvider>
              </TransactionsProvider>
            </WalletProvider>
          </MeshProvider>
        </CmsProvider>
      </AuthProvider>
    </>
  );
};
