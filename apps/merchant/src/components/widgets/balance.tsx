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

export const Balance = () => {
  const { theme } = useTheme();
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
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <div className="flex items-center gap-2">
              <p className="text-6xl font-bold">$3615.00</p>
              <span className="font-semibold text-muted-foreground">USD</span>
            </div>
            <p className="text-base foreground">Current balance</p>
          </div>
          <div className="flex w-full flex-col items-end justify-start gap-4">
            <div className="flex w-full flex-col items-end justify-start gap-0">
              <div className="flex items-center gap-2">
                <Ada className="h-5 w-5" />
                <p className="text-lg font-bold">2760.00</p>
                <span className="text-xs font-semibold text-muted-foreground">
                  ADA
                </span>
              </div>
              <p className="text-xs foreground">828.00 USD</p>
            </div>
            <div className="flex w-full flex-col items-end justify-start gap-0">
              <div className="flex items-center gap-2">
                <Usdm className="h-4 w-4" />
                <p className="text-lg font-bold">1489.00</p>
                <span className="text-xs font-semibold text-muted-foreground">
                  ADA
                </span>
              </div>
              <p className="text-xs foreground">1489.00 USDM</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
