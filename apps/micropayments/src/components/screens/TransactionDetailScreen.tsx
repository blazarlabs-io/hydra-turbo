import { Colors } from "@/constants/Colors";
import { dateOptions } from "@/utils/dateUtils";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { SafeAreaView, useColorScheme, View } from "react-native";
import { Button, Icons, ThemedText, ThemedView } from "../core";

export interface TransactionDetailScreenProps {
  data: any;
}

export const TransactionDetailScreen = ({
  data,
}: TransactionDetailScreenProps) => {
  const theme = useColorScheme() ?? "light";

  const [Icon, setIcon] = useState<any>(null);

  useEffect(() => {
    if (data.type === "income") {
      setIcon(<Icons.CurrencyDecrease size="32" />);
    } else if (data.type === "shop") {
      setIcon(<Icons.ShoppingBag size="32" />);
    } else if (data.type === "transfer") {
      setIcon(<Icons.Exchange size="32" />);
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 px-5">
      <LinearGradient
        className="absolute left-0 right-0 top-0 h-screen"
        colors={["#DEF9FE", "#FFFCE3"]}
      />
      <View className="mt-32 flex w-full flex-col items-center justify-between">
        <View className="flex h-[30%] w-full flex-col items-center justify-center">
          <View
            className="flex h-20 w-20 flex-row items-center justify-center rounded-full border"
            style={{
              backgroundColor:
                data.type === "income"
                  ? Colors[theme].primary
                  : data.type === "shop"
                    ? Colors[theme].secondary
                    : Colors[theme].warning,
            }}
          >
            {Icon}
          </View>
          <View className="mt-8">
            <ThemedText type="title" className="ont-bold">
              ${data.value}
            </ThemedText>
          </View>
          <View className="mt-1">
            <ThemedText type="default" className="opacity-50">
              Paid to {data.label}
            </ThemedText>
          </View>
        </View>
        <View className="flex h-[33%] w-full flex-row items-center justify-center">
          <ThemedView className="w-full rounded-[32px] border p-6">
            <View className="flex flex-row items-center justify-between">
              <ThemedText type="default" className="opacity-50">
                You paid
              </ThemedText>
              <ThemedText type="default" className="font-semibold opacity-50">
                ${data.value}
              </ThemedText>
            </View>
            <View className="mt-4 flex flex-row items-center justify-between">
              <ThemedText type="default" className="opacity-50">
                To
              </ThemedText>
              <ThemedText type="default" className="font-semibold opacity-50">
                {data.label}
              </ThemedText>
            </View>
            <View className="mt-4 flex flex-row items-center justify-between">
              <ThemedText type="default" className="opacity-50">
                Date
              </ThemedText>
              <ThemedText type="default" className="font-semibold opacity-50">
                {data.date.toLocaleDateString("en-US", dateOptions as any)}
              </ThemedText>
            </View>
            <View className="mt-4 flex flex-row items-center justify-between">
              <ThemedText type="default" className="opacity-50">
                Transaction ID
              </ThemedText>
              <ThemedText
                type="default"
                numberOfLines={1}
                className="max-w-[30%] font-semibold opacity-50"
              >
                {data.id}
              </ThemedText>
            </View>
          </ThemedView>
        </View>
        <View className="flex h-[33%] w-full flex-row items-end justify-between">
          <Button
            variant="outline"
            fullWidth={false}
            label="Download Receipt"
            className="min-w-[48%]"
          />
          <Button
            variant="primary"
            label="Share Receipt"
            fullWidth={false}
            className="min-w-[48%]"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
