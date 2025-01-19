import { Image, TouchableOpacity } from "react-native";

export interface ScanButtonProps {
  onPress: () => void;
}

export const ScanButton = ({ onPress }: ScanButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-full border bg-white p-1"
    >
      <Image
        source={require("@/assets/images/qr-icon.png")}
        className="h-10 w-10"
      />
    </TouchableOpacity>
  );
};
