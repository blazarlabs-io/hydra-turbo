import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { Icons } from "../core";

export const BalanceInfo = () => {
  return (
    <View className="relative h-[200px] rounded-[32px]">
      <LinearGradient
        className="absolute left-0 right-0 top-0 h-[200px] rounded-[32px] border"
        colors={["#FFD5E9", "#8CE4F3"]}
      />
      <View className="flex flex-row items-center justify-start gap-x-2 px-6 pt-8">
        <Text className="text-5xl font-black">$3,617.00</Text>
        <Text className="text-base font-black opacity-50">USD</Text>
      </View>
      <View className="px-6">
        <Text className="text-base">Current Balance</Text>
      </View>
      <View className="flex w-full flex-row items-center justify-between">
        <View className="flex flex-col items-center justify-center">
          <View className="flex flex-row items-center justify-start gap-x-1 px-6 pt-8">
            <Icons.AdaIcon />
            <Text className="text-lg font-bold">$3,617.00</Text>
            {/* <Text className="pl-1 text-xs font-black opacity-50">ADA</Text> */}
          </View>
          <View className="flex flex-row items-center justify-start gap-x-1 px-6 opacity-50">
            <Text className="text-sm font-normal">$828.00</Text>
            <Text className="text-sm font-bold">USD</Text>
          </View>
        </View>
        <View className="flex flex-col items-center justify-center">
          <View className="flex flex-row items-center justify-start gap-x-1 px-6 pt-8">
            <Icons.UsdmIcon />
            <Text className="text-lg font-bold">$2,789.00</Text>
            {/* <Text className="pl-1 text-xs font-black opacity-50">USDM</Text> */}
          </View>
          <View className="flex flex-row items-center justify-start gap-x-1 px-6 opacity-50">
            <Text className="text-sm font-normal">$2,789.00</Text>
            <Text className="text-sm font-bold">USD</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
