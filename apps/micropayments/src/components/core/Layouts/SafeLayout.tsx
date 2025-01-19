import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { cn } from "@/utils/cn";

export interface SafeLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const SafeLayout = ({ children, className }: SafeLayoutProps) => {
  return (
    <SafeAreaView className={cn("flex-1 px-5", className)}>
      <LinearGradient
        className="absolute left-0 right-0 top-0 h-screen"
        colors={["#DEF9FE", "#FFFCE3"]}
      />
      {children}
    </SafeAreaView>
  );
};
