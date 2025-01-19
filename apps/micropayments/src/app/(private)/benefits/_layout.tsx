import { Icons } from "@/components/core";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { View, TouchableOpacity } from "react-native";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function BenefitsLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="ada-staking"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "ADA Staking",
          headerTitleAlign: "center",
          headerLeft: () => (
            <View className="">
              <TouchableOpacity onPress={() => router.back()}>
                <Icons.ChevronLeft size="24" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="exchange"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Exchange",
          headerTitleAlign: "center",
          headerLeft: () => (
            <View className="">
              <TouchableOpacity onPress={() => router.back()}>
                <Icons.ChevronLeft size="24" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
