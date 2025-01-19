import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Icons, ThemedText } from "../core";

export const ScanScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="px-5" style={styles.container}>
        <View className="w-full rounded-[32px] border p-6">
          <View className="flex w-full flex-row items-center justify-center pb-4">
            <Icons.Camera size="64" />
          </View>
          <ThemedText style={styles.message}>
            We need your permission to show the camera
          </ThemedText>
          <Button
            onPress={requestPermission}
            label="Grant permission"
            variant="primary"
            className="mt-4"
          />
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  return (
    <SafeAreaView className="flex-1">
      <View
        style={styles.container}
        className="mt-20 flex flex-col items-center justify-between px-5"
      >
        <CameraView style={styles.camera} facing={facing}>
          <View className="flex h-full w-[100%] flex-row items-end justify-end">
            <View className="p-4">
              <TouchableOpacity
                onPress={toggleCameraFacing}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800"
              >
                <Icons.FlipCamera size="24" color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>

        <View className="flex w-[100%] flex-1 flex-row items-end justify-between pb-12">
          <Button
            variant="outline"
            label="Cancel"
            fullWidth={false}
            className="min-w-[48%]"
            onPress={() => {}}
          />
          <Button
            variant="primary"
            label="Pay"
            fullWidth={false}
            className="min-w-[48%]"
            onPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    // flex: 1,
    position: "relative",
    width: "90%",
    height: "44%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    borderWidth: 1,
    borderColor: "white",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
