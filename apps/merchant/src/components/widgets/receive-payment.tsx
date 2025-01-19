"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";

type ReceivePaymentProps = {
  children: React.ReactNode;
};

export const ReceivePayment = ({ children }: ReceivePaymentProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>{children}</Button>
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
          <LoaderCircle className="animate-spin text-foreground" />
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
