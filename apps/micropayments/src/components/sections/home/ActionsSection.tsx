import { useState } from "react";
import { Colors } from "@/constants/Colors";
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import { AccountCard, Icons, ThemedView } from "../../core";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export const ActionsSection = () => {
  const theme = useColorScheme() ?? "light";

  // We need to get the height of the phone and use it relatively,
  // This is because height of phones vary
  const windowHeight = Dimensions.get("window").height;

  // This state would determine if the drawer sheet is visible or not
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Function to open the bottom sheet
  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  // Function to close the bottom sheet
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      {/* * MODAL START */}
      <Modal
        animationType="slide"
        transparent={true}
        // We use the state here to toggle visibility of Bottom Sheet
        visible={isBottomSheetOpen}
        // We pass our function as default function to close the Modal
        onRequestClose={handleCloseBottomSheet}
      >
        <View className="flex h-full w-full items-center justify-center bg-black/50">
          <ThemedView
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-start rounded-t-[32px] border"
            style={[{ height: windowHeight * 0.4 }]}
          >
            <View className="flex w-full flex-row items-center justify-end px-6 py-4">
              <TouchableOpacity onPress={handleCloseBottomSheet} className="">
                <Icons.Close
                  size="24"
                  color={Colors[theme]["muted-foreground"]}
                />
              </TouchableOpacity>
            </View>
            <View className="w-full px-8">
              <View className="flex w-full items-center justify-center">
                <Text className="text-xl font-bold">Topup</Text>
              </View>
              <View className="pt-8">
                <AccountCard
                  label="My Address"
                  value="addr1q8gg2r3vf9zggn48g7m8vx62rwf6warcs4k7ej8mdzmqmesj30jz7psduyk6n4n2qrud2xlv9fgj53n6ds3t8cs4fvzs05yzmz"
                  icon="Wallet"
                  bgColor="warning"
                />
              </View>
              <View className="flex w-full items-center justify-center pt-8">
                <Text className="text-base font-bold">
                  Instant Deposit With
                </Text>
              </View>
              <View className="flex w-full flex-row items-center justify-between pt-8">
                <View>
                  <Image
                    className="h-16 w-16"
                    source={require("@/assets/images/eternl-button.png")}
                  />
                </View>
                <View>
                  <Image
                    className="h-16 w-16"
                    source={require("@/assets/images/yoroi-button.png")}
                  />
                </View>
                <View>
                  <Image
                    className="h-16 w-16"
                    source={require("@/assets/images/vesper-button.png")}
                  />
                </View>
                <View>
                  <Image
                    className="h-16 w-16"
                    source={require("@/assets/images/lace-button.png")}
                  />
                </View>
              </View>
              <View className="flex w-full items-center justify-center pt-8"></View>
            </View>
          </ThemedView>
        </View>
      </Modal>
      {/* * MODAL END */}
      <View className="flex w-full flex-row items-center justify-between px-2">
        <TouchableOpacity
          onPress={handleOpenBottomSheet}
          className="flex h-[48px] w-[33%] flex-row items-center justify-center gap-x-2 rounded-[32px] px-[2px]"
          style={{ backgroundColor: Colors[theme].foreground }}
        >
          <View
            className="flex h-8 w-8 items-center justify-center rounded-[32px]"
            style={{ backgroundColor: Colors[theme].background }}
          >
            <Icons.CurrencyIncrease size="24" />
          </View>
          <View className="w-20">
            <Text className="" style={{ color: Colors[theme].background }}>
              Topup
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/withdraw")}
          className="flex h-[48px] w-[33%] flex-row items-center justify-center gap-x-2 rounded-[32px] px-[2px]"
          style={{ backgroundColor: Colors[theme].foreground }}
        >
          <View
            className="flex h-8 w-8 items-center justify-center rounded-[32px]"
            style={{ backgroundColor: Colors[theme].background }}
          >
            <Icons.CurrencyDecrease size="24" />
          </View>
          <View className="w-20">
            <Text className="" style={{ color: Colors[theme].background }}>
              Withdraw
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/pay")}
          className="flex h-[48px] w-[33%] flex-row items-center justify-center gap-x-2 rounded-[32px] px-[2px]"
          style={{ backgroundColor: Colors[theme].foreground }}
        >
          <View
            className="flex h-8 w-8 items-center justify-center rounded-[32px]"
            style={{ backgroundColor: Colors[theme].background }}
          >
            <Icons.MoneyBillFly size="24" />
          </View>
          <View className="w-20">
            <Text className="" style={{ color: Colors[theme].background }}>
              Pay
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
