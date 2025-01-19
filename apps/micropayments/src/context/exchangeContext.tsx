import { createContext, useContext, useState } from "react";

interface ContextInterface {
  exchangeFrom: "ADA" | "USDM";
  exchangeTo: "ADA" | "USDM";
  switchCurrency: () => void;
}

const ExchangeContext = createContext<ContextInterface>({
  exchangeFrom: "ADA",
  exchangeTo: "USDM",
  switchCurrency: () => {},
});

export const useExchange = () => {
  const context = useContext<ContextInterface>(ExchangeContext);
  if (context === undefined) {
    throw new Error("useExchange must be used as within a Provider");
  }
  return context;
};

export const ExchangeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [exchangeFrom, setExchangeFrom] = useState<"ADA" | "USDM">("ADA");
  const [exchangeTo, setExchangeTo] = useState<"ADA" | "USDM">("USDM");

  const switchCurrency = () => {
    if (exchangeFrom === "ADA") {
      setExchangeFrom("USDM");
      setExchangeTo("ADA");
    } else {
      setExchangeFrom("ADA");
      setExchangeTo("USDM");
    }
  };

  return (
    <ExchangeContext.Provider
      value={{
        exchangeFrom,
        exchangeTo,
        switchCurrency,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};
