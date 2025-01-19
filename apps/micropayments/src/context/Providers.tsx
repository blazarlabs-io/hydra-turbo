import { AuthProvider } from "./authContext";
import { WalletProvider } from "./walletContext";
import { ExchangeProvider } from "./exchangeContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <WalletProvider>
        <ExchangeProvider>{children}</ExchangeProvider>
      </WalletProvider>
    </AuthProvider>
  );
};
