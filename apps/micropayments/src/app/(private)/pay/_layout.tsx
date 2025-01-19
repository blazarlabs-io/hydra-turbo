import { Icons, ScanButton } from "@/components/core";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { TouchableOpacity, View } from "react-native";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function PayLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Pay",
          headerTitleAlign: "center",
          headerRight: () => (
            <View className="">
              <ScanButton onPress={() => router.push("/pay/scan")} />
            </View>
          ),
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
        name="scan"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
