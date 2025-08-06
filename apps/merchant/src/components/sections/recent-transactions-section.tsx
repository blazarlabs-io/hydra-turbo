"use client";

import { useTransactions } from "~/src/context/transactions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Button } from "@repo/ui/components/ui/button";
import { Copy } from "lucide-react";
import { useWallet } from "~/src/context/wallet";

export const RecentTransactionsSection = () => {
  const { transactions } = useTransactions();
  const { current } = useWallet();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">Recent transactions</h2>
      <div className="mt-6">
        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[100px]">Id</TableHead> */}
              <TableHead>Hash</TableHead>
              <TableHead>Origin</TableHead>
              {/* <TableHead>Destination</TableHead> */}
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {current &&
              current.transactions &&
              current.transactions.length > 0 &&
              current.transactions?.map((transaction: any) => (
                <TableRow key={transaction?.txHash}>
                  {/* <TableCell>
                    <div className="flex items-center">
                      <span className="font-medium max-w-[164px] truncate">
                        {transaction?.id}
                      </span>
                      <Button variant="ghost" className="ml-2 text-xs">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell> */}
                  <TableCell>
                    <div className="flex items-center">
                      <span className="max-w-[164px] truncate">
                        {transaction?.txHash}
                      </span>
                      <Button variant="ghost" className="ml-2 text-xs">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="max-w-[164px] truncate">
                        {transaction?.address}
                      </span>
                      <Button variant="ghost" className="ml-2 text-xs">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    <div className="flex items-center">
                      <span className="font-medium max-w-[164px] truncate">
                        {transaction?.address}
                      </span>
                      <Button variant="ghost" className="ml-2 text-xs">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell> */}
                  <TableCell className="text-right">
                    ₳ {transaction.assets?.lovelace / 1000000}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
