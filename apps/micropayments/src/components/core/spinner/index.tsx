import { Colors } from "@/constants/Colors";
import { ActivityIndicator, useColorScheme } from "react-native";

type Props = {
  customColor?: string;
  size?: "small" | "large";
};

export const Spinner = ({ customColor = "#73DEF0", size = "small" }: Props) => {
  const theme = useColorScheme() ?? "light";
  return (
    <ActivityIndicator
      size={size}
      color={customColor || Colors[theme].primary}
    />
  );
};
