import { useAuth } from "@/context/authContext";
import { useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icons } from "../core";
import { Avatar } from "../core/Avatar/Avatar";

export const HomeHeader = () => {
  const theme = useColorScheme() ?? "light";
  const { user } = useAuth();
  return (
    <SafeAreaView>
      <View className="flex-row items-center justify-between px-5 py-4">
        <Icons.Hamburger />
        <Avatar name={user?.email as string} image={user?.photoURL as string} />
      </View>
    </SafeAreaView>
  );
};
