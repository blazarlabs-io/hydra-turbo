import { Colors } from "@/constants/Colors";
import { contacts } from "@/data/contactListTemplate";
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

export const ContactSelector = ({}: AccountSelectorProps) => {
  const [data, setData] = useState<any>(contacts);

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
          contact={item}
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
  contact: any;
  onSelection: (contact: any) => void;
}

const Item = ({ contact, onSelection }: AccountSelectorItemProps) => {
  const theme = useColorScheme() ?? "light";

  return (
    <>
      {contact && (
        <TouchableOpacity
          onPress={() => onSelection(contact)}
          style={{
            borderColor: contact.selected
              ? Colors[theme].primary
              : "transparent",
            borderWidth: 4,
          }}
          className="mx-1 rounded-[32px]"
        >
          <View className="flex flex-row items-center justify-start rounded-[32px] border p-1">
            <View className="flex h-12 w-12 items-center justify-center rounded-full border">
              <Image
                className="h-full w-full rounded-full"
                source={{
                  uri: contact.image,
                }}
              />
            </View>
            <View className="pl-2">
              <Text
                numberOfLines={2}
                className="max-w-[80%] text-base font-bold"
              >
                {contact.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};
