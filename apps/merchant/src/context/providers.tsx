"use client";

import { AuthProvider } from "../features/authentication/context/auth-provider";
import { APIProvider } from "@vis.gl/react-google-maps";
import { TransactionsProvider } from "./transactions";
import { CmsProvider } from "./cms";
import { WalletProvider } from "./wallet";
import { MeshProvider } from "@meshsdk/react";
import { usePublicConfig } from "../hooks/use-public-config";

function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
  const { config, loading, error } = usePublicConfig();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !config) {
    console.error("Failed to load Google Maps config:", error);
    return <>{children}</>; // Render without Google Maps
  }

  return (
    <APIProvider apiKey={config.googleMaps?.apiKey || ""}>
      {children}
    </APIProvider>
  );
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <CmsProvider>
          <MeshProvider>
            <WalletProvider>
              <TransactionsProvider>
                <GoogleMapsProvider>{children}</GoogleMapsProvider>
              </TransactionsProvider>
            </WalletProvider>
          </MeshProvider>
        </CmsProvider>
      </AuthProvider>
    </>
  );
};
