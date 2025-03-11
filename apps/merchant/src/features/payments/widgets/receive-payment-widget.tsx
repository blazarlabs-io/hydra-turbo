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
import { ReceivePaymentForm } from "../components/";
type ReceivePaymentWidgetProps = {
  children: React.ReactNode;
};

export const ReceivePaymentWidget = ({
  children,
}: ReceivePaymentWidgetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>{children}</Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="flex flex-row items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <SheetHeader className="flex flex-col items-center justify-center ">
            <SheetTitle>Receive payment</SheetTitle>
            <SheetDescription>
              Make sure the client's phone hovers over the Hydrapay payment -
              terminal.
            </SheetDescription>
          </SheetHeader>
          <ReceivePaymentForm />
        </div>
        <Image
          src="/images/receive-payment.png"
          alt="Receive Payment"
          width={212}
          height={48}
          className=""
        />
      </SheetContent>
    </Sheet>
  );
};
