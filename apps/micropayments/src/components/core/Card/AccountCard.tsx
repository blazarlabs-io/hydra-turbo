import { Colors } from "@/constants/Colors";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { Icons } from "../Icon";
import { ThemedText } from "../Text/ThemedText";
import { FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

type ColorKey = keyof typeof Colors.light; // or keyof typeof Colors.dark

export interface AccountCardProps {
  label: string;
  value: string;
  icon: any;
  bgColor: ColorKey;
}

export const AccountCard = ({
  label,
  value,
  icon,
  bgColor,
}: AccountCardProps) => {
  const theme = useColorScheme() ?? "light";

  const Icon: any = Icons[icon as keyof typeof Icons];

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(value);
  };

  return (
    <View className="flex w-full flex-row items-center justify-between rounded-[48px] border p-2 pr-4">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <View
            style={{
              backgroundColor: Colors[theme][bgColor as ColorKey],
            }}
            className="flex h-14 w-14 items-center justify-center rounded-[32px]"
          >
            <Icon />
          </View>
          <View className="pl-2">
            <ThemedText className="font-bold">{label}</ThemedText>
            <ThemedText numberOfLines={1} className="max-w-[80%] opacity-50">
              {value}
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity onPress={copyToClipboard}>
          <Icons.Copy size="20" />
        </TouchableOpacity>
      </View>
      <View className="mr-2">{/* <ThemedText>{value}</ThemedText> */}</View>
    </View>
  );
};
