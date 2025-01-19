import { createContext, useContext, useState } from "react";

interface ContextInterface {
  adaBalance: number;
  adaConversionRate: number;
  usdmBalance: number;
  usdmConversionRate: number;
  selectedCurrency: "ADA" | "USDM";
  updateSelectedCurrency: (currency: "ADA" | "USDM") => void;
}

const WalletContext = createContext<ContextInterface>({
  adaBalance: 10704.32,
  adaConversionRate: 0.35,
  usdmBalance: 2789.0,
  usdmConversionRate: 1.0,
  selectedCurrency: "ADA",
  updateSelectedCurrency: () => {},
});

export const useWallet = () => {
  const context = useContext<ContextInterface>(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used as within a Provider");
  }
  return context;
};

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [adaBalance, setAdaBalance] = useState<number>(10704.32);
  const [usdmBalance, setUsdmBalance] = useState<number>(2789.01);
  const [selectedCurrency, setSelectedCurrency] = useState<"ADA" | "USDM">(
    "ADA"
  );
  const [adaConversionRate, setAdaConversionRate] = useState<number>(0.35);
  const [usdmConversionRate, setUsdmConversionRate] = useState<number>(1.0);

  const updateSelectedCurrency = (currency: "ADA" | "USDM") => {
    setSelectedCurrency(currency);
  };

  return (
    <WalletContext.Provider
      value={{
        adaBalance,
        adaConversionRate,
        usdmBalance,
        usdmConversionRate,
        selectedCurrency,
        updateSelectedCurrency,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
