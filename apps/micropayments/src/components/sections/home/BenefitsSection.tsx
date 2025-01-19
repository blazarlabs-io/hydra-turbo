import { BenefitCard, ThemedText } from "@/components/core";
import { View, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { router } from "expo-router";

export const BenefitsSection = () => {
  const theme = useColorScheme() ?? "light";
  return (
    <View>
      <View className="flex flex-row items-center justify-between">
        <ThemedText className="font-bold">Benefits</ThemedText>
        <TouchableOpacity>
          <ThemedText
            className="text-sm font-bold"
            style={{ color: Colors[theme]["muted-foreground"] }}
          >
            See All
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View className="w-full">
        <View className="mt-8 flex w-full flex-row items-center justify-between">
          <BenefitCard
            icon="ShoppingBag"
            label="Shop"
            title="Rewards"
            bgColor="warning"
            onPress={() => {}}
          />
          <BenefitCard
            icon="MoneyBag"
            label="ADA"
            title="Staking"
            bgColor="primary"
            onPress={() => router.push("/benefits/ada-staking")}
          />
          <BenefitCard
            icon="Coins"
            label="Token"
            title="Staking"
            bgColor="secondary"
            onPress={() => {}}
          />
          <BenefitCard
            icon="Exchange"
            label=""
            title="Exchange"
            bgColor="tertiary"
            onPress={() => router.push("/benefits/exchange")}
          />
        </View>
      </View>
    </View>
  );
};
