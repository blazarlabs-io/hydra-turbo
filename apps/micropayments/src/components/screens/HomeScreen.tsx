import { ScrollView, useColorScheme, View } from "react-native";
import { SafeLayout } from "../core";
import {
  ActionsSection,
  BenefitsSection,
  MyTransactionsSection,
} from "../sections";
import { BalanceInfo } from "../widgets";

export const HomeScreen = () => {
  const theme = useColorScheme() ?? "light";
  return (
    <SafeLayout>
      <ScrollView>
        <View className="mt-20">
          <BalanceInfo />
        </View>
        <View className="mt-8">
          <ActionsSection />
        </View>
        <View className="mt-8">
          <MyTransactionsSection />
        </View>
        <View className="mt-8">
          <BenefitsSection />
        </View>
      </ScrollView>
    </SafeLayout>
  );
};
