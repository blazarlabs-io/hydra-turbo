import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { Icons } from "../Icon";

export interface ListButtonProps {
  label: string;
  color?: string;
  icon?: any;
  withChevron?: boolean;
  onPress: () => void;
}

export type ColorKey = "primary" | "secondary" | "tertiary";

export const ListButton = ({
  label,
  color = "primary",
  icon,
  withChevron = true,
  onPress,
}: ListButtonProps) => {
  const theme = useColorScheme() ?? "light";
  const Icon = Icons[icon as keyof typeof Icons];

  return (
    <TouchableOpacity className="flex flex-row items-center justify-between rounded-[32px] border p-2">
      <View className="flex flex-row items-center justify-start">
        <View
          className="flex h-8 w-8 items-center justify-center rounded-full border"
          style={{ backgroundColor: Colors[theme][color as ColorKey] }}
        >
          <Icon size="24" />
        </View>
        <Text className="pl-2 text-base">{label}</Text>
      </View>
      {withChevron && <Icons.ChevronRight size="24" />}
    </TouchableOpacity>
  );
};
