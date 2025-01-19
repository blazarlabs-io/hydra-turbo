import { Colors } from "@/constants/Colors";
import { useEffect, useRef, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native";

export interface AvatarProps {
  image?: string;
  size?: number;
  name?: string;
}

export const Avatar = ({
  image,
  size = 48,
  name = "John Doe",
}: AvatarProps) => {
  const theme = useColorScheme() ?? "light";
  const [initials, setInitials] = useState<string>("JD");
  const mountRef = useRef<boolean>(false);

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      if (name) {
        const nameArray = name.split(" ");
        if (nameArray.length > 1) {
          setInitials(`${nameArray[0].charAt(0)}${nameArray[1].charAt(0)}`);
        } else {
          setInitials(`${nameArray[0].charAt(0)}${nameArray[0].charAt(1)}`);
        }
      }
    }
  }, [name]);
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        backgroundColor: Colors[theme].foreground,
        width: size,
        height: size,
      }}
      className="flex items-center justify-center rounded-full"
    >
      {image === null || image === undefined ? (
        <Text className="text-xl" style={{ color: Colors[theme].background }}>
          {initials}
        </Text>
      ) : (
        <Image
          source={{ uri: image }}
          style={{ width: size, height: size }}
          className="rounded-full"
        />
      )}
    </TouchableOpacity>
  );
};
