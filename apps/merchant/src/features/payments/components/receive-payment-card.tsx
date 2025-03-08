import { Card, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { ReceivePaymentWidget } from "../widgets";
import { Receive } from "~/src/components/icons/Receive";

export function ReceivePaymentCard() {
  return (
    <Card className="rounded-[96px] shadow-none w-full bg-[#222128] flex items-center justify-between">
      <CardHeader className="flex flex-row items-center justify-start gap-4">
        <div className="flex items-center justify-center bg-white rounded-full p-2">
          <Receive className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-white">Receive payment</CardTitle>
          <p className="text-sm text-white/60">
            Receive a payment from any client in your wallet.
          </p>
        </div>
      </CardHeader>
      <div className="flex flex-row items-center pr-6">
        <div className="flex items-center  min-h-full">
          <ReceivePaymentWidget>Receive</ReceivePaymentWidget>
        </div>
      </div>
    </Card>
  );
}
