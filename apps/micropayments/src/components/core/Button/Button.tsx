import { Colors } from "@/constants/Colors";
import { cn } from "@/utils/cn";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ThemedText } from "../Text/ThemedText";

export interface ButtonProps {
  variant?: "primary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  onPress?: () => void;
  label: string;
  fullWidth?: boolean;
  icon?: any;
  className?: string;
}

export const Button = ({
  variant,
  size = "md",
  onPress,
  label,
  fullWidth = true,
  icon,
  className,
}: ButtonProps) => {
  const theme = useColorScheme() ?? "light";

  const styles = StyleSheet.create({
    primary: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors[theme].primary,
      color: Colors[theme]["primary-foreground"],
      paddingHorizontal: size === "sm" ? 16 : size === "md" ? 24 : 32,
      paddingVertical: size === "sm" ? 8 : size === "md" ? 12 : 16,
      borderRadius: 32,
      borderColor: Colors[theme]["primary-foreground"],
      borderWidth: 1,
      width: fullWidth ? "100%" : undefined,
    },
    outline: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      color: Colors[theme]["primary-foreground"],
      paddingHorizontal: size === "sm" ? 16 : size === "md" ? 24 : 32,
      paddingVertical: size === "sm" ? 8 : size === "md" ? 12 : 16,
      borderRadius: 32,
      borderColor: Colors[theme]["primary-foreground"],
      borderWidth: 1,
      width: fullWidth ? "100%" : undefined,
    },
    ghost: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      color: Colors[theme]["primary-foreground"],
      paddingHorizontal: size === "sm" ? 16 : size === "md" ? 24 : 32,
      paddingVertical: size === "sm" ? 8 : size === "md" ? 12 : 16,
      textDecorationLine: "underline",
      textDecorationColor: Colors[theme]["primary-foreground"],
      textDecorationStyle: "solid",
      width: fullWidth ? "100%" : undefined,
    },
    link: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      color: Colors[theme].primary,
      // paddingHorizontal: size === "sm" ? 16 : size === "md" ? 24 : 32,
      // paddingVertical: size === "sm" ? 8 : size === "md" ? 12 : 16,
      textDecorationLine: "underline",
      textDecorationColor: Colors[theme]["primary-foreground"],
      textDecorationStyle: "solid",
    },
  });

  const Icon = icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn("relative", className)}
      style={[
        variant === "primary" && styles.primary,
        variant === "outline" && styles.outline,
        variant === "ghost" && styles.ghost,
        variant === "link" && styles.link,
      ]}
    >
      {icon && (
        <View className="absolute left-4">
          <Icon />
        </View>
      )}
      <ThemedText type={variant === "link" ? "link" : "default"}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
};
