import { TransactionDetailScreen } from "@/components/screens";
import { useLocalSearchParams } from "expo-router";
import { transactions } from "@/data/transactionsTemplate";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const transaction = transactions.find((t) => t.id === id);

  return <TransactionDetailScreen data={transaction} />;
}
