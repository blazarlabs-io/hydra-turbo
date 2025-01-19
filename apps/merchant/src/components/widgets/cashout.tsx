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

type CashoutProps = {
  children: React.ReactNode;
};

export const Cashout = ({ children }: CashoutProps) => {
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
            src="/images/cashout.png"
            alt="Cashout"
            width={282}
            height={48}
            className=""
          />
          <SheetTitle>Cashout Balance</SheetTitle>
          <SheetDescription>
            Cashout your balance to your preffered wallet.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col justify-center items-start gap-4">
            <Label htmlFor="name" className="">
              Wallet address
            </Label>
            <Input
              id="name"
              placeholder="addr1qy3n6kp9..."
              className="min-w-[300px]"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Cashout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
