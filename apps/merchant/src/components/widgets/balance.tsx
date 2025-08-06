"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@repo/ui/components/ui/card";
import { Ada } from "../icons/ada";
import { Usdm } from "../icons/Usdm";
import { useTheme } from "next-themes";
import { cn } from "@repo/ui/lib/utils";
import { useWallet } from "~/src/context/wallet";
import { useEffect, useState } from "react";

export const Balance = () => {
  const { theme } = useTheme();
  const { accounts } = useWallet();

  const [usd, setUsd] = useState<number>(0);
  const [ada, setAda] = useState<number>(0);
  const [usdm, setUsdm] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setUsd(
        Number(
          accounts.filter((w) => w.balance.currency === "USD")[0]?.balance
            ?.amount,
        ) || 0,
      );
      setAda(
        Number(
          accounts.filter((w) => w.balance.currency === "ADA")[0]?.balance
            ?.amount,
        ) || 0,
      );
      setUsdm(
        Number(
          accounts.filter((w) => w.balance.currency === "USDM")[0]?.balance
            ?.amount,
        ) || 0,
      );
      setTotal(
        (Number(
          accounts.filter((w) => w.balance.currency === "USD")[0]?.balance
            ?.amount,
        ) || 0) + // <--- moved the closing parenthesis here
          (Number(
            accounts.filter((w) => w.balance.currency === "USDM")[0]?.balance
              ?.amount,
          ) || 0),
      );
    }
  }, [accounts]);
  return (
    <Card
      className={cn(
        "shadow-none bg-gradient-to-br",
        theme === "light"
          ? "from-[#FFD5E9] to-[#8CE4F3]"
          : "from-[#852f58] to-[#00a3c0]",
      )}
    >
      <CardHeader></CardHeader>
      <CardContent>
        {accounts && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start justify-start w-full gap-2">
              <p className="text-base text-muted-foreground">Current balance</p>
              <div className="flex items-center gap-2">
                <p className="text-6xl font-bold">{`$${total.toFixed(2)}`}</p>
                <span className="font-semibold text-muted-foreground">USD</span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-start w-full gap-4">
              <div className="flex flex-col items-end justify-start w-full gap-0">
                <div className="flex items-center gap-2">
                  <Ada className="w-5 h-5" />
                  <p className="text-lg font-bold">{ada.toFixed(2)}</p>
                  <span className="text-xs font-semibold text-muted-foreground">
                    ADA
                  </span>
                </div>
                <p className="text-xs foreground">{`$${usd.toFixed(2)}`} USD</p>
              </div>
              <div className="flex flex-col items-end justify-start w-full gap-0">
                <div className="flex items-center gap-2">
                  <Usdm className="w-4 h-4" />
                  <p className="text-lg font-bold">{usdm.toFixed(2)}</p>
                  <span className="text-xs font-semibold text-muted-foreground">
                    USDM
                  </span>
                </div>
                <p className="text-xs foreground">
                  {`$${usdm.toFixed(2)}`} USD
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
