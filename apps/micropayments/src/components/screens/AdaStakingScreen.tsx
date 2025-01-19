import { Image, View } from "react-native";
import { SafeLayout, ThemedText } from "../core";
import { useWallet } from "@/context/walletContext";
import { LinearGradient } from "expo-linear-gradient";

export const AdaStakingScreen = () => {
  const { adaBalance } = useWallet();
  return (
    <SafeLayout>
      <View className="relative mt-20 h-[180px] rounded-[40px] border px-6 py-8">
        <LinearGradient
          className="absolute left-0 right-0 top-0 h-[178px] rounded-[40px]"
          colors={["#FFD5E9", "#8CE4F3"]}
        />
        <View className="flex flex-row items-center justify-between">
          <View>
            <ThemedText type="caption" className="font-bold">
              Currently Staking
            </ThemedText>
            <ThemedText type="subtitle" className="font-bold">
              ₳{adaBalance}
            </ThemedText>
          </View>
          <View>
            <ThemedText type="caption" className="font-bold">
              APR 16.32%
            </ThemedText>
            <View className="flex flex-row items-center justify-center">
              <Image
                className="h-6 w-6"
                source={require("@/assets/images/ada-button-blue.png")}
              />
              <ThemedText type="subtitle" className="pl-2 font-bold">
                ADA
              </ThemedText>
            </View>
          </View>
        </View>
        <View className="mt-6">
          <ThemedText type="caption" className="font-bold">
            Staking starts on the begening of the next epoch and rewards will be
            automatically distributed after a few weeks.
          </ThemedText>
        </View>
      </View>
    </SafeLayout>
  );
};
