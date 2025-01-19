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

export const RecentTransactionsSection = () => {
  const { transactions } = useTransactions();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">Recent transactions</h2>
      <div className="mt-6">
        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex items-center">
                    <span className="font-medium max-w-[164px] truncate">
                      {transaction.id}
                    </span>
                    <Button variant="ghost" className="ml-2 text-xs">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="font-medium max-w-[164px] truncate">
                      {transaction.transactionHash}
                    </span>
                    <Button variant="ghost" className="ml-2 text-xs">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="font-medium max-w-[164px] truncate">
                      {transaction.originWallet.address}
                    </span>
                    <Button variant="ghost" className="ml-2 text-xs">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="font-medium max-w-[164px] truncate">
                      {transaction.destinationWallet.address}
                    </span>
                    <Button variant="ghost" className="ml-2 text-xs">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {transaction.ammount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
