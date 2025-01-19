import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { TouchableOpacity } from "react-native";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function TransactionDetailLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
