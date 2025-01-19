import { Icons } from "@/components/core";
import { HomeHeader } from "@/components/navigation";
import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.foreground,
        tabBarActiveBackgroundColor: Colors.light.background,
        tabBarInactiveBackgroundColor: Colors.light.background,
        header: ({ route }) => {
          if (route.name !== "index") {
            return null;
          }

          return <HomeHeader />;
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "",
          headerTransparent: true,
          headerStyle: {},
          tabBarIcon: ({ color }) => (
            <View style={{ marginTop: 10 }}>
              <Icons.Home color={color} />
            </View>
          ),
          tabBarStyle: {
            // paddingTop: 10,
            height: 60,
          },
        }}
      />
      <Tabs.Screen
        name="nfc"
        options={{
          title: "Nfc",
          tabBarLabel: "",
          headerTransparent: true,
          headerStyle: {},
          tabBarIcon: ({ color }) => (
            <View style={{ marginTop: 10 }}>
              <Icons.Nfc color={color} />
            </View>
          ),
          tabBarStyle: {
            // paddingTop: 10,
            height: 60,
          },
        }}
      />
      <Tabs.Screen
        name="user-profile"
        options={{
          title: "User Profile",
          tabBarLabel: "",
          headerTransparent: true,
          headerStyle: {},
          tabBarIcon: ({ color }) => (
            <View style={{ marginTop: 10 }}>
              <Icons.UserProfile color={color} />
            </View>
          ),
          tabBarStyle: {
            // paddingTop: 10,
            height: 60,
          },
        }}
      />
    </Tabs>
  );
}
