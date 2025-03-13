import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card";
import { receivePaymentService } from "../services";
import { useState } from "react";
import { useToast } from "@repo/ui/hooks/use-toast";
import { usePaymentTransaction } from "../hooks/usePaymentTransaction";

export function ReceivePaymentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentTransactionId, setPaymentTransactionId] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const { paymentTransaction } = usePaymentTransaction(paymentTransactionId);

  const sendToDevice = async () => {
    try {
      setIsLoading(true);
      setPaymentTransactionId("");

      const walletAddress = "My-merchant-wallet";
      // const value = Math.floor(Math.random() * 1000) + 1;
      const resp = await receivePaymentService(walletAddress, `${amount}`);

      if (!resp) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please try again.",
        });
        throw new Error("Payment no processed");
      }

      setPaymentTransactionId(resp.transactionRef);
      toast({
        title: "Payment Processed",
        description: "Your payment information has been sent.",
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-[400px]">
        <Card>
          <CardContent className="flex flex-col space-y-4">
            {paymentTransaction ? (
              <div className="flex w-full flex-col items-start justify-start gap-2">
                {paymentTransaction.processed ? (
                  <CardHeader className="text-3xl font-bold foreground text-center w-full text-green-400">
                    Payment Successed
                  </CardHeader>
                ) : (
                  <CardHeader className="text-3xl font-bold foreground text-center w-full text-blue-300">
                    Waiting to be paid
                  </CardHeader>
                )}
                <div className="grid items-center gap-2">
                  <p className="text-lg font-bold">
                    <span className="font-semibold text-muted-foreground">
                      Invoice:&nbsp;
                    </span>
                    {paymentTransaction.invoiceRef}
                  </p>
                  <p className="text-lg font-bold">
                    <span className="font-semibold text-muted-foreground">
                      Amount:&nbsp;
                    </span>
                    ${paymentTransaction.amount}
                    <span className="font-semibold text-muted-foreground">
                      &nbsp;USD
                    </span>
                  </p>
                  <p className="text-lg font-bold">
                    <span className="font-semibold text-muted-foreground">
                      Merchant:&nbsp;
                    </span>
                    {paymentTransaction.merchantName}
                  </p>
                  <p className="text-lg font-bold">
                    <span className="font-semibold text-muted-foreground">
                      Merchant Wallet:&nbsp;
                    </span>
                    {paymentTransaction.targetRef}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <CardHeader className="text-3xl font-bold foreground text-center w-full">
                  Payment Data
                </CardHeader>
                <Input
                  type="number"
                  placeholder="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isLoading}
                />
                <Button onClick={sendToDevice} disabled={!amount || isLoading}>
                  {isLoading ? "Loading..." : "Send Payment"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
