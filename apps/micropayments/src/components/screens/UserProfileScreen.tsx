import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button, ListButton } from "../core";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { router } from "expo-router";
import { useAuth } from "@/features/auth/contexts/authContext";
import { LinearGradient } from "expo-linear-gradient";
import { Logout } from "../core/Icon/Logout";

export const UserProfileScreen = () => {
  const { user, setUser } = useAuth();

  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        router.replace("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <SafeAreaView className="flex-1 px-5">
      <LinearGradient
        className="absolute left-0 right-0 top-0 h-screen"
        colors={["#DEF9FE", "#FFFCE3"]}
      />
      {user && (
        <View className="mt-20 flex-1 items-center justify-start">
          <View>
            <Avatar
              size={88}
              image={user?.photoURL as string}
              name={user?.email as string}
            />
          </View>
          <View>
            <Text className="text-2xl font-bold">{user?.displayName}</Text>
            <Text className="text-base font-semibold opacity-60">
              {user?.email}
            </Text>
          </View>
          <View className="mt-8 w-full">
            <View className="mt-2">
              <ListButton
                label="Help"
                color="primary"
                icon="HelpMan"
                onPress={() => {}}
              />
            </View>
            <View className="mt-4">
              <ListButton
                label="Settings"
                icon="SettingsCog"
                color="warning"
                onPress={() => {}}
              />
            </View>
            <View className="mt-4">
              <ListButton
                label="FAQ"
                icon="Help"
                color="secondary"
                withChevron={false}
                onPress={() => {}}
              />
            </View>
          </View>
          <View className="mt-8 h-[1px] w-full bg-black/40" />
          <View className="mt-8 w-full">
            <Button
              onPress={handleSignOut}
              variant="outline"
              label="Logout"
              icon={Logout}
            />
          </View>
          <View className="mt-4 w-full">
            <Button onPress={() => {}} variant="ghost" label="Delete Account" />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
