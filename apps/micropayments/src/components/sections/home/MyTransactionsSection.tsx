import { ThemedText, TransactionCard } from "@/components/core";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { transactions } from "@/data/transactionsTemplate";
import { router } from "expo-router";
import { dateOptions } from "@/utils/dateUtils";

export const MyTransactionsSection = () => {
  const theme = useColorScheme() ?? "light";
  return (
    <View>
      <View className="flex flex-row items-center justify-between">
        <ThemedText className="font-bold">My Transactions</ThemedText>
        <TouchableOpacity onPress={() => router.push("/my-transactions")}>
          <ThemedText
            className="text-sm font-bold"
            style={{ color: Colors[theme]["muted-foreground"] }}
          >
            See All
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View className="w-full">
        {transactions.map((transaction, index) => (
          <View
            key={`transaction-${index}-${transaction.id}`}
            className="w-full"
          >
            {index < 2 && (
              <View className="mt-8 w-full">
                <TransactionCard
                  label={transaction.label}
                  date={transaction.date.toLocaleDateString(
                    "en-US",
                    dateOptions as any
                  )}
                  value={transaction.value}
                  icon={
                    transaction.type === "income"
                      ? "CurrencyDecrease"
                      : transaction.type === "shop"
                        ? "ShoppingBag"
                        : "Exchange"
                  }
                  bgColor={
                    transaction.type === "income"
                      ? "primary"
                      : transaction.type === "shop"
                        ? "secondary"
                        : "warning"
                  }
                  onPress={() =>
                    router.push(`/my-transactions/detail/${transaction.id}`)
                  }
                />
              </View>
            )}
          </View>
        ))}
        {/* <View className="mt-8">
          <TransactionCard
            label="Shell"
            date="May 26, 2024"
            value="$31.05"
            icon="Receipt"
            bgColor="secondary"
          />
        </View>
        <View className="mt-4">
          <TransactionCard
            label="Shell"
            date="May 26, 2024"
            value="$87.41"
            icon="Receipt"
            bgColor="primary"
          />
        </View> */}
      </View>
    </View>
  );
};
