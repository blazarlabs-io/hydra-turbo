import { Colors } from "@/constants/Colors";
import { accounts } from "@/data/accountListTemplate";
import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Icons } from "../core";

export interface AccountSelectorProps {}

export const AccountSelector = ({}: AccountSelectorProps) => {
  const [data, setData] = useState<any>(accounts);

  const handleSelection = (account: any) => {
    let newData = data.map((item: any) => {
      if (item.id === account.id) {
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });
    setData(newData);
  };

  return (
    <FlatList
      data={data}
      horizontal
      renderItem={({ item }) => (
        <Item
          account={item}
          onSelection={(account) => {
            handleSelection(account);
          }}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export interface AccountSelectorItemProps {
  account: any;
  onSelection: (account: any) => void;
}

const Item = ({ account, onSelection }: AccountSelectorItemProps) => {
  const theme = useColorScheme() ?? "light";
  const Icon = Icons[account.icon as keyof typeof Icons];

  return (
    <>
      {account && (
        <TouchableOpacity
          onPress={() => onSelection(account)}
          style={{
            borderColor: account.selected
              ? Colors[theme].primary
              : "transparent",
            borderWidth: 4,
          }}
          className="mx-1 rounded-[32px]"
        >
          <View className="flex flex-row items-center justify-start rounded-[32px] border p-1">
            <View
              style={{
                backgroundColor:
                  account.type === "custom"
                    ? Colors[theme].warning
                    : Colors[theme].foreground,
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full border"
            >
              {account.type === "custom" ? (
                <Icon size="24" />
              ) : (
                <Image source={require("@/assets/images/Lace.png")} />
              )}
            </View>
            <View className="pl-2">
              <Text
                numberOfLines={2}
                className="max-w-[80%] text-base font-bold"
              >
                {account.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};
