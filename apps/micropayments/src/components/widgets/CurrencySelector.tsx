import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { Icons } from "../core";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { useWallet } from "@/context/walletContext";

export type Currency = "ADA" | "USDM";
export interface CurrencySelectorProps {}

export const CurrencySelector = ({}: CurrencySelectorProps) => {
  const theme = useColorScheme() ?? "light";
  const { selectedCurrency, updateSelectedCurrency } = useWallet();

  return (
    <View className="flex w-full flex-row items-center justify-between">
      <TouchableOpacity
        onPress={() => updateSelectedCurrency("ADA")}
        style={{
          borderColor:
            selectedCurrency === "ADA" ? Colors[theme].primary : "transparent",
          borderWidth: 4,
        }}
        className="w-[48%] rounded-[32px]"
      >
        <View className="flex w-[100%] flex-row items-center justify-start rounded-[32px] border p-1">
          <View
            style={{ backgroundColor: Colors[theme].primary }}
            className="flex h-12 w-12 items-center justify-center rounded-full border"
          >
            <Icons.Ada2 size="24" />
          </View>
          <View className="pl-2">
            <Text className="text-base font-bold">ADA</Text>
            <Text className="text-xs opacity-50">1 ADA = $0.31</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => updateSelectedCurrency("USDM")}
        style={{
          borderColor:
            selectedCurrency === "USDM" ? Colors[theme].primary : "transparent",
          borderWidth: 4,
        }}
        className="w-[48%] rounded-[32px]"
      >
        <View className="flex w-[100%] flex-row items-center justify-start rounded-[32px] border p-1">
          <View
            style={{ backgroundColor: Colors[theme].secondary }}
            className="flex h-12 w-12 items-center justify-center rounded-full border"
          >
            <Icons.Usdm2 size="24" />
          </View>
          <View className="pl-2">
            <Text className="text-base font-bold">USDM</Text>
            <Text className="text-xs opacity-50">1 USDM = $1.00</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
