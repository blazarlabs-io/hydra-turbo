import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "titleExtraBold"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "caption";
  className?: string;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  className,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "foreground"
  );

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "titleExtraBold" ? styles.titleExtraBold : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "caption" ? styles.caption : undefined,
        style,
      ]}
      {...rest}
      className={className}
    />
  );
}

const styles = StyleSheet.create({
  caption: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "500",
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  titleExtraBold: {
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.primary,
  },
});
