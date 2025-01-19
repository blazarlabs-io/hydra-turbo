import { useCallback, useEffect, useState } from "react";
import { Image, ToastAndroid, View } from "react-native";
import NfcManager, { Ndef, NfcEvents, NfcTech } from "react-native-nfc-manager";
import { Button, SafeLayout, ThemedText } from "../core";
import {
  HCESession,
  NFCTagType4NDEFContentType,
  NFCTagType4,
} from "react-native-hce";
import { HceTools, NdefTools } from "react-native-nfc-sdk";

export const NfcScreen = () => {
  const hce = new HceTools();
  const [isTagRead, setIsTagRead] = useState("No");

  const emulate = () => {
    // The start emulation function receives a content, which
    // corresponds to a NFC tag payload, and a writable boolean,
    // which will define if the NFC card you emulate can be written
    // The second parameter is a callback which will be called once
    // your emulated tag is read
    console.log("emulating tag");
    hce.startEmulation({ content: "Hello World!", writable: true }, () => {
      setIsTagRead("Yes!");
      console.log("tag read");
      setTimeout(() => setIsTagRead("No"), 5000);
    });
  };

  useEffect(() => {
    const ndf = new NdefTools();
    ndf.readTag().then((ndef) => {
      console.log(ndef);
    });
  }, []);
  // const [session, setSession] = useState<HCESession | null>(null);

  // const startSession = useCallback(async () => {
  //   const tag = new NFCTagType4({
  //     type: NFCTagType4NDEFContentType.Text,
  //     content: "fito",
  //     writable: true,
  //   });

  //   const s = await HCESession.getInstance();
  //   setSession(s);
  //   s.setApplication(tag);
  //   await s.setEnabled(true);
  //   console.log("started emulating tag:\n", tag);
  //   // await s.handleStateUpdate(HCESession.Events.HCE_STATE_UPDATE_APPLICATION);
  //   // console.log("update emulating tag:\n", tag);
  // }, []);

  // useEffect(() => {
  //   if (session) {
  //     console.log("setting listeners");
  //     session?.on(HCESession.Events.HCE_STATE_WRITE_FULL, () => {
  //       console.log("update emulating tag:\n");
  //     });

  //     session?.on(HCESession.Events.HCE_STATE_UPDATE_APPLICATION, (data) => {
  //       console.log("XXXXXXXXXXXXXXXX:\n", data);
  //     });
  //   }
  // }, [session]);

  // const [hasNfc, setHasNFC] = useState<boolean | null>(null);

  // useEffect(() => {
  //   const checkIsSupported = async () => {
  //     const deviceIsSupported = await NfcManager.isSupported();

  //     setHasNFC(deviceIsSupported);
  //     if (deviceIsSupported) {
  //       console.log("NFC is supported");
  //       await NfcManager.start();
  //     }
  //   };

  //   checkIsSupported();
  // }, []);

  // useEffect(() => {
  //   NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
  //     console.log("tag found", tag);
  //   });

  //   return () => {
  //     NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
  //   };
  // }, []);

  // const readTag = async () => {
  //   // await NfcManager.registerTagEvent();

  //   try {
  //     // register for the NFC tag with NDEF in it
  //     await NfcManager.requestTechnology(NfcTech.Ndef);
  //     // the resolved tag object will contain `ndefMessage` property
  //     const tag = await NfcManager.getTag();
  //     console.warn("Tag found", tag);
  //   } catch (ex) {
  //     console.warn("Oops!", ex);
  //   } finally {
  //     // stop the nfc scanning
  //     NfcManager.cancelTechnologyRequest();
  //   }
  // };

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
        {/* <Button
          className="mt-8"
          variant="primary"
          label="Activate NFC Payments"
        /> */}
        <View className="flex flex-row items-center justify-center">
          <Button
            className="mr-4 mt-8"
            variant="primary"
            fullWidth={false}
            label="Emulate"
            onPress={emulate}
          />
          {/* <Button
            className="mt-8"
            variant="primary"
            fullWidth={false}
            label="Stop"
            onPress={stopSession}
          /> */}
        </View>
      </View>
    </SafeLayout>
  );
};
