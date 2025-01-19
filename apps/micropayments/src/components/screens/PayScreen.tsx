import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Button, Icons, ThemedText, ThemedView } from "../core";
import { AmountInput, ContactSelector, CurrencySelector } from "../widgets";

export const PayScreen = () => {
  const theme = useColorScheme() ?? "light";
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const windowHeight = Dimensions.get("window").height;

  return (
    <>
      <LinearGradient
        className="absolute left-0 right-0 top-0 h-screen"
        colors={["#DEF9FE", "#FFFCE3"]}
      />
      <SafeAreaView className="flex-1 px-5">
        {/* * MODAL START */}
        <Modal
          animationType="slide"
          transparent={true}
          // We use the state here to toggle visibility of Bottom Sheet
          visible={modalVisible}
          // We pass our function as default function to close the Modal
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex h-full w-full items-center justify-center bg-black/50">
            <ThemedView
              className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-start rounded-t-[32px] border"
              style={[{ height: windowHeight * 0.5 }]}
            >
              <View className="flex w-full flex-row items-center justify-end px-6 py-4">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className=""
                >
                  <Icons.Close
                    size="24"
                    color={Colors[theme]["muted-foreground"]}
                  />
                </TouchableOpacity>
              </View>
              <View className="w-full flex-1 items-center justify-between px-8">
                <View className="w-full">
                  <View className="flex w-full items-center justify-center">
                    <Text className="text-xl font-bold">Add Friend</Text>
                  </View>
                  <View className="w-full pt-8">
                    <TextInput
                      className="h-14 w-full rounded-[32px] border bg-white p-4"
                      placeholder="Search..."
                    />
                  </View>
                </View>
                <View className="flex w-full items-center justify-center pb-8">
                  <Button variant="primary" label="Add" onPress={() => {}} />
                </View>
              </View>
            </ThemedView>
          </View>
        </Modal>
        {/* * MODAL END */}
        <View className="flex h-full flex-col justify-between">
          <View className="">
            <View className="mt-20">
              <ThemedText className="font-bold">Pay With</ThemedText>
            </View>

            <View className="mt-8">
              <CurrencySelector />
            </View>
            <View className="mt-8 flex flex-row items-center justify-between">
              <ThemedText className="font-bold">Pay to</ThemedText>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="flex flex-row items-center"
              >
                <Icons.Plus size="20" />
                <ThemedText
                  className="text-sm font-semibold"
                  style={{ color: Colors[theme]["muted-foreground"] }}
                >
                  Add New
                </ThemedText>
              </TouchableOpacity>
            </View>
            <View className="mt-8">
              <ContactSelector />
            </View>
            <View className="my-8">
              <AmountInput />
            </View>
          </View>
          <View className="flex w-full flex-row items-center justify-center pb-8">
            <Button variant="primary" label="Continue" onPress={() => {}} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
