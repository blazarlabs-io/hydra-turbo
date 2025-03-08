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
import {
  connectToBLEDevice,
  disconnectToBLEDevice,
  getCharacteristic,
  scanDevices,
  writeCharacteristic,
} from "../services/ble-connection";

type ReceivePaymentWidgetProps = {
  children: React.ReactNode;
};

export const ReceivePaymentWidget = ({
  children,
}: ReceivePaymentWidgetProps) => {
  const handleScanDevices = async () => {
    console.log("Scanning devices...");
    const scanResponse = await scanDevices();
    console.log(scanResponse.device);
    const connectResponse = await connectToBLEDevice(scanResponse.device);
    console.log(connectResponse.server);
    const characteristicsResponse = await getCharacteristic(
      connectResponse.server,
    );
    console.log(characteristicsResponse);
    const writeResponse = await writeCharacteristic(scanResponse.device);
    console.log(writeResponse);
    const secondaryCharacteristicsResponse = await getCharacteristic(
      connectResponse.server,
    );
    const secondaryBuffer =
      await secondaryCharacteristicsResponse.characteristic[0].value.buffer;
    const data = new DataView(secondaryBuffer);
    const foo = data.getUint8(0);
    console.log("secondary value: ", foo);
    await disconnectToBLEDevice(scanResponse.device);
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
