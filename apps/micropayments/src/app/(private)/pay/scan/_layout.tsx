import { ScanButton } from "@/components/core";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function ScanLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Scan QR Code",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
