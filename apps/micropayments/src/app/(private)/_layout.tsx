import { useAuth } from "@/features/auth";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function PrivateLayout() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) return;
    router.replace("/");
  }, []);

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="my-transactions" options={{ headerShown: false }} />
      <Stack.Screen name="withdraw" options={{ headerShown: false }} />
      <Stack.Screen name="pay" options={{ headerShown: false }} />
      <Stack.Screen name="benefits" options={{ headerShown: false }} />
    </Stack>
  );
}
