import { Icons } from "@/components/core";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { View, TouchableOpacity } from "react-native";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function WithdrawLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: "center",
          headerTitle: "Withdraw Funds",
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
