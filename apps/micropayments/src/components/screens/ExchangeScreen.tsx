import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { Button, Icons, SafeLayout, ThemedText } from "../core";
import { LinearGradient } from "expo-linear-gradient";
import { useWallet } from "@/context/walletContext";
import { useExchange } from "@/context/exchangeContext";
import { useEffect, useState } from "react";

export const ExchangeScreen = () => {
  const { adaBalance, usdmBalance, adaConversionRate, usdmConversionRate } =
    useWallet();
  const { exchangeFrom, exchangeTo, switchCurrency } = useExchange();

  const [getBalance, setGetBalance] = useState<number>(0);
  const [getSymbol, setGetSymbol] = useState<"₳" | "$">("₳");
  const [maxBalance, setMaxBalance] = useState<number>(0);
  const [maxSymbol, setMaxSymbol] = useState<"₳" | "$">("₳");
  const [conversionRate, setConversionRate] = useState<number>(0);
  const [exchangeFromValue, setExchangeFromValue] = useState<number>(0);
  const [exchangeToValue, setExchangeToValue] = useState<number>(0);

  const handleSwitcher = () => {
    switchCurrency();
  };

  const handleExchangeValue = (value: string) => {
    setExchangeFromValue(parseFloat(value));
  };

  useEffect(() => {
    if (exchangeFrom === "ADA") {
      setGetBalance(usdmBalance);
      setGetSymbol("$");
      setMaxBalance(adaBalance);
      setMaxSymbol("₳");
      setConversionRate(adaConversionRate);
    } else {
      setGetBalance(adaBalance);
      setGetSymbol("₳");
      setMaxBalance(usdmBalance);
      setMaxSymbol("$");
      setConversionRate(adaConversionRate);
    }
  }, [adaBalance, usdmBalance, exchangeFrom]);

  return (
    <SafeLayout>
      <View className="flex-1 flex-col items-center justify-between">
        <View className="relative mt-20">
          {/* * SEND */}
          <View className="relative h-[210px] w-full rounded-[48px] border px-6 py-8">
            <LinearGradient
              className="absolute left-0 right-0 top-0 h-[208px] rounded-[48px]"
              colors={["#FFD5E9", "#8CE4F3"]}
            />
            <View>
              <ThemedText type="default" className="font-bold">
                You send
              </ThemedText>
            </View>
            <View className="w-full flex-row items-center justify-between">
              <View className="mt-4 flex flex-row items-center">
                {exchangeFrom === "ADA" ? (
                  <Image
                    className="h-8 w-8"
                    source={require("@/assets/images/ada-button-blue.png")}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    className="h-8 w-8"
                    source={require("@/assets/images/usdm-button-blue.png")}
                    resizeMode="contain"
                  />
                )}
                <ThemedText type="subtitle" className="pl-2 font-bold">
                  {exchangeFrom}
                </ThemedText>
              </View>
              <View className="flex flex-row items-center">
                <ThemedText type="subtitle" className="pl-2 font-bold">
                  {maxSymbol}
                </ThemedText>
                <TextInput
                  onChangeText={handleExchangeValue}
                  placeholder="0.00"
                  keyboardType="numeric"
                  className="text-right text-xl font-bold"
                />
              </View>
            </View>
            <View className="w-full-500 my-4 h-[1px] bg-gray-400" />
            <View className="flex flex-row items-center justify-end py-4">
              <TouchableOpacity className="flex flex-row items-center">
                <ThemedText type="caption" className="font-bold">
                  Max
                </ThemedText>
                <ThemedText type="caption" className="pl-2">
                  {maxSymbol}
                  {maxBalance}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
          {/* * RECEIVE */}
          <View className="relative mt-4 h-[210px] w-full rounded-[48px] border px-6 py-8">
            <LinearGradient
              className="absolute left-0 right-0 top-0 h-[208px] rounded-[48px]"
              colors={["#FFD5E9", "#8CE4F3"]}
            />
            <View>
              <ThemedText type="default" className="font-bold">
                You get
              </ThemedText>
            </View>
            <View className="w-full flex-row items-center justify-between">
              <View className="mt-4 flex flex-row items-center">
                {exchangeTo === "ADA" ? (
                  <Image
                    className="h-8 w-8"
                    source={require("@/assets/images/ada-button-blue.png")}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    className="h-8 w-8"
                    source={require("@/assets/images/usdm-button-blue.png")}
                    resizeMode="contain"
                  />
                )}
                <ThemedText type="subtitle" className="pl-2 font-bold">
                  {exchangeTo}
                </ThemedText>
              </View>
              <View>
                <ThemedText type="subtitle" className="font-bold">
                  {getSymbol}
                  {getSymbol === "$"
                    ? (exchangeFromValue * conversionRate).toFixed(2)
                    : (exchangeFromValue / conversionRate).toFixed(2)}
                </ThemedText>
              </View>
            </View>
            <View className="w-full-500 my-4 h-[1px] bg-gray-400" />
            <View className="flex flex-row items-center justify-between py-4">
              <ThemedText type="caption" className="font-bold">
                Balance
              </ThemedText>
              <ThemedText type="caption" className="pl-2">
                {getSymbol}
                {getBalance}
              </ThemedText>
            </View>
          </View>
          <View className="items flex w-full flex-row justify-between p-4">
            <ThemedText type="default" className="font-bold">
              Rate
            </ThemedText>
            <ThemedText type="default" className="font-bold">
              1 ADA = {conversionRate} USDM
            </ThemedText>
          </View>
          {/* * CENTER BUTTON */}
          <TouchableOpacity
            className="flex items-center justify-center"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 80,
              height: 80,
              marginLeft: -40,
              marginTop: -68,
              borderRadius: 40,
              backgroundColor: "#121212",
            }}
            onPress={handleSwitcher}
          >
            <Icons.Transfer size="32" color="white" />
          </TouchableOpacity>
        </View>
        <View className="w-full pb-8">
          <Button label="Exchange" variant="primary" />
        </View>
      </View>
    </SafeLayout>
  );
};
