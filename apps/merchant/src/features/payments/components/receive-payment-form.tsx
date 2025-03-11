import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card";
import { receivePaymentService } from "../services";
import { useState } from "react";
import { useToast } from "@repo/ui/hooks/use-toast";

export function ReceivePaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const sendToDevice = async () => {
    try {
      setIsProcessing(true);
      // const address = "My-merchant-wallet";
      // const value = Math.floor(Math.random() * 1000) + 1;
      const resp = await receivePaymentService(wallet, `${amount}`);
      if (!resp) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please try again.",
        });
        throw new Error("Payment no processed");
      }
      setIsProcessed(true);
      toast({
        title: "Payment Processed",
        description: "Your payment information has been sent.",
      });
      setTimeout(() => {
        setIsProcessed(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsProcessed(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="w-[400px]">
        <Card>
          <CardHeader>Payment Data</CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {isProcessed && <p className="text-green-600">Payment Processed</p>}
            <Input
              placeholder="Wallet Address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
            <Input
              type="number"
              placeholder="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              onClick={sendToDevice}
              disabled={!wallet || !amount || isProcessing}
            >
              {isProcessing ? "Processing..." : "Send Payment"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
