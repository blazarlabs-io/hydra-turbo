import { TouchableOpacity, useColorScheme, View } from "react-native";
import { ThemedText } from "../Text/ThemedText";
import { Icons } from "../Icon";
import { Colors } from "@/constants/Colors";

type ColorKey = keyof typeof Colors.light; // or keyof typeof Colors.dark

export interface TransactionCardProps {
  label: string;
  date: string;
  value: number;
  icon: any;
  bgColor: ColorKey;
  onPress?: () => void;
}

export const TransactionCard = ({
  label,
  date,
  value,
  icon,
  bgColor,
  onPress,
}: TransactionCardProps) => {
  const theme = useColorScheme() ?? "light";

  const Icon: any = Icons[icon as keyof typeof Icons];
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex w-full flex-row items-center justify-between rounded-[48px] border p-2"
    >
      <View className="flex flex-row items-center justify-start gap-x-2">
        <View
          style={{
            backgroundColor: Colors[theme][bgColor as ColorKey],
          }}
          className="flex h-14 w-14 items-center justify-center rounded-[32px] border"
        >
          <Icon size="24" />
        </View>
        <View>
          <ThemedText className="font-bold">{label}</ThemedText>
          <ThemedText className="opacity-50">{date}</ThemedText>
        </View>
      </View>
      <View className="mr-2">
        <ThemedText>${value}</ThemedText>
      </View>
    </TouchableOpacity>
  );
};
