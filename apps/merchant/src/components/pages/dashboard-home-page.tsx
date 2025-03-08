"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { PageHeader } from "../layouts/page-header";

import { useAuth } from "~/src/features/authentication/context/auth-provider";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import { Ada } from "../icons/ada";
import { CashOut as CashOutIcon } from "../icons/CashOut";
import { Receive } from "../icons/Receive";
import { Usdm } from "../icons/Usdm";
import { RecentTransactionsSection } from "../sections/recent-transactions-section";
import { useRouter } from "next/navigation";
import { Cashout } from "../widgets/cashout";
import { Balance } from "../widgets/balance";
import { ReceivePaymentCard } from "@/features/payments";

export const DashboardHomePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title="Home"
        subtitle={`Welcome back ${user?.displayName || user?.email || ""}`}
      />
      <Separator className="w-full" />
      {/* * BALANCE */}
      <div>
        <Balance />
      </div>
      {/* * ACTIONS */}
      <div className="flex items-center justify-between gap-4 w-full">
        <ReceivePaymentCard />
        <Card className="shadow-none rounded-[96px] w-full bg-[#222128] flex items-center justify-between">
          <CardHeader className="flex flex-row items-center justify-start gap-4">
            <div className="flex items-center justify-center bg-white rounded-full p-2">
              <CashOutIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-white">Cashout</CardTitle>
              <p className="text-sm text-white/60">
                Cashout your balance to your bank account.
              </p>
            </div>
          </CardHeader>
          <div className="flex flex-row items-center pr-6">
            <div className="flex items-center  min-h-full">
              <Cashout>Cashout</Cashout>
            </div>
          </div>
        </Card>
      </div>
      {/* * RECENT TRANSACTIONS */}
      <RecentTransactionsSection />
    </div>
  );
};
