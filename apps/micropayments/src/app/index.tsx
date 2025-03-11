import { SafeLayout, Spinner } from "@/components/core";
import { useAuth } from "@/features/auth";
import { Redirect } from "expo-router";

export default function MainPage() {
  const { isLoadingAuth } = useAuth();
  return (
    <SafeLayout>
      {isLoadingAuth ? (
        <Spinner size={"large"} />
      ) : (
        <Redirect href={"/(auth)/signin/"} />
      )}
    </SafeLayout>
  );
}
