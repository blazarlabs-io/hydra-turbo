import { useEffect } from "react";
import { Image, View } from "react-native";
import { BleClient } from "../../services/ble-client";
import { SafeLayout, ThemedText } from "../core";

const DEVICE_NAME = "HydraMerchant";
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const ADDRESS_CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
const VALUE_CHARACTERISTIC_UUID = "7f5b388b-5195-4d06-8bbe-2bda381ec89e";
const RESPONSE_CHARACTERISTIC_UUID = "1f27b6c7-0b7b-434c-82bf-3d7e38bee582";

export const NfcScreen = () => {
  useEffect(() => {
    const ble = new BleClient();
    ble.requestPermissions().then((granted) => {
      ble
        .scan(DEVICE_NAME, {
          SERVICE_UUID,
          ADDRESS_CHARACTERISTIC_UUID,
          VALUE_CHARACTERISTIC_UUID,
          RESPONSE_CHARACTERISTIC_UUID,
        })
        .then((characteristics) => {
          console.log("characteristics:", characteristics);
        });
    });
  }, []);
  return (
    <SafeLayout>
      <View className="items-center justify-center py-4">
        <ThemedText type="subtitle" className="text-center">
          NFC Payments
        </ThemedText>
      </View>
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("@/assets/images/nfc-illustration.png")}
          className="h-[30%] w-[55%]"
          resizeMode="contain"
        />
        <ThemedText type="subtitle" className="max-w-[70%] text-center">
          Buy fast and safely NFC technology.
        </ThemedText>
        <ThemedText type="default" className="mt-6 max-w-[90%] text-center">
          Activating NFC technology allows you to pay with your phone in any
          hydrapay compatible terminal.
        </ThemedText>
      </View>
    </SafeLayout>
  );
};
