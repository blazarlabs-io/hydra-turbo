import { cn } from "@/utils/cn";
import { useState } from "react";
import { TextInput, TouchableHighlight, View } from "react-native";
import { Icons } from "../Icon";

export interface InputProps {
  placeholder?: string;
  type: "email" | "password";
  className?: string;
  onValueChange?: (value: string) => void;
  value: string;
}

export const Input = ({
  value,
  placeholder,
  type,
  className,
  onValueChange,
}: InputProps) => {
  const [secure, setSecure] = useState<boolean>(true);

  const handleHideView = () => {
    setSecure(!secure);
  };

  return (
    <>
      {type === "email" && (
        <TextInput
          placeholder={placeholder}
          className={cn("h-12 w-full rounded-[32px] border px-4", className)}
          onChangeText={onValueChange}
          value={value}
        />
      )}
      {type === "password" && (
        <View className="relative">
          <TextInput
            placeholder={placeholder}
            className={cn("h-12 w-full rounded-[32px] border px-4", className)}
            onChangeText={onValueChange}
            value={value}
            secureTextEntry={secure}
          />
          <View className="absolute right-4 top-[14px]">
            <TouchableHighlight
              onPress={handleHideView}
              underlayColor="transparent"
            >
              <View>{secure ? <Icons.ViewEye /> : <Icons.ViewEyeOff />}</View>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </>
  );
};
