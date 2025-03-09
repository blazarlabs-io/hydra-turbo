"use client";

import { Button } from "@repo/ui/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { receivePaymentService } from "../services/receive-payment-services";

type ReceivePaymentWidgetProps = {
  children: React.ReactNode;
};

export const ReceivePaymentWidget = ({
  children,
}: ReceivePaymentWidgetProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProccessed, setIsProccessed] = useState(false);

  const handleScanDevices = async () => {
    try {
      setIsProcessing(true);
      const address = "E1s4jG9evuaaiuTdX8A8";
      const value = "100";
      const resp = await receivePaymentService(address, value);
      if (!resp) throw new Error("Payment no processed");
      setIsProccessed(true);
    } catch (error) {
      console.error(error);
      setIsProccessed(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={handleScanDevices}>{children}</Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="flex flex-col items-center justify-center"
      >
        <SheetHeader className="flex flex-col items-center justify-center">
          <Image
            src="/images/receive-payment.png"
            alt="Receive Payment"
            width={212}
            height={48}
            className=""
          />
          <SheetTitle>Awaiting payment</SheetTitle>
          <SheetDescription>
            Make sure the client's phone hovers over the hydrapay payment
            terminal.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {isProcessing ? (
            <LoaderCircle className="animate-spin text-foreground" />
          ) : isProccessed ? (
            <p>Payment Sent to device</p>
          ) : (
            <Button onClick={handleScanDevices}>Retry</Button>
          )}
        </div>
        <SheetFooter>
          {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
