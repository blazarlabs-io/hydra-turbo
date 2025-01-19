import { useWallet } from "@/context/walletContext";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const AmountInput = () => {
  const {
    adaBalance,
    usdmBalance,
    selectedCurrency,
    adaConversionRate,
    usdmConversionRate,
  } = useWallet();
  const [value, setValue] = useState<string>("0");

  const handleMax = () => {
    if (selectedCurrency === "ADA") {
      setValue(adaBalance.toString());
    } else {
      setValue(usdmBalance.toString());
    }
  };

  return (
    <View className="w-full">
      <View className="flex w-full flex-row items-center justify-end">
        <TouchableOpacity
          onPress={handleMax}
          className="flex flex-row items-center opacity-60"
        >
          <Text className="text-base font-bold">Max</Text>
          {selectedCurrency === "ADA" ? (
            <Text className="pl-2 text-base font-semibold">₳{adaBalance}</Text>
          ) : (
            <Text className="pl-2 text-base font-semibold">${usdmBalance}</Text>
          )}
        </TouchableOpacity>
      </View>
      <View className="mt-20 flex w-full items-center justify-center">
        <TextInput
          //   value={`${selectedCurrency === "ADA" ? "₳" : "$"} ${parseInt(value).toFixed(2).toString()}`}
          value={value}
          className="w-full text-center text-6xl font-bold"
          placeholder="0.00"
          keyboardType="numeric"
          onChangeText={setValue}
        />
        {selectedCurrency === "ADA" ? (
          <>
            {(parseInt(value) * adaConversionRate).toFixed(2) !== "NaN" && (
              <Text>
                ${(parseInt(value) * adaConversionRate).toFixed(2)} USD
              </Text>
            )}
          </>
        ) : (
          <>
            {(parseInt(value) * usdmConversionRate).toFixed(2) !== "NaN" && (
              <Text>
                ${(parseInt(value) * usdmConversionRate).toFixed(2)} USD
              </Text>
            )}
          </>
        )}
      </View>
    </View>
  );
};
