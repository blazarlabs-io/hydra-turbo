import {
  Button,
  GoogleIcon,
  Input,
  SafeLayout,
  ThemedText,
} from "@/components/core";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { SigninErrorModal } from "./SigninErrorModal";
import { useSignin } from "../../hooks/useSignin";
import { useAuth } from "../../contexts/authContext";

export const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { isLoading, signIn } = useSignin();
  const { setUser } = useAuth();

  const handleSignIn = async () => {
    try {
      setErrorMessage("");
      const resp = await signIn(email, password);
      if (!resp) return;
      if (typeof resp === "string") {
        setShowModal(true);
        setErrorMessage(resp);
      } else {
        setUser(resp.user);
        router.push("/home");
      }
    } catch (error) {
      setErrorMessage("Error in signin");
    }
  };

  return (
    <SafeLayout>
      {/* * MODAL START */}
      <SigninErrorModal
        showModal={showModal}
        closeModal={() => setShowModal((old) => !old)}
        errorMessage={errorMessage}
      />
      {/* * MODAL END */}
      <ScrollView>
        <View className="flex h-full w-full flex-col items-center justify-start bg-transparent">
          <View className="mt-8 w-full">
            <Image
              source={require("@/assets/images/money-transfer.png")}
              style={{ width: 340, height: 200 }}
              resizeMode="contain"
            />
          </View>
          <View className="w-full gap-y-3">
            <View className="flex w-full flex-col items-center justify-center">
              <ThemedText type="defaultSemiBold">Welcome to</ThemedText>
              <Image
                source={require("@/assets/images/hydrapay.png")}
                className=""
                style={{ width: 200, height: 64 }}
                resizeMode="contain"
              />
            </View>
            <View className="flex w-full items-center justify-center py-4">
              <Button
                label="Continue with Google"
                variant="outline"
                icon={GoogleIcon}
              />
            </View>
            <View className="flex w-full flex-row items-center justify-center gap-x-2">
              <View className="h-[1px] grow bg-gray-300" />
              <ThemedText type="default" className="opacity-70">
                Or continue with
              </ThemedText>
              <View className="h-[1px] grow bg-gray-300" />
            </View>
            <View className="flex w-full items-center justify-center">
              <View className="w-full">
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onValueChange={(value) => setEmail(value)}
                />
              </View>
              <View className="mt-4 w-full">
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onValueChange={(value) => setPassword(value)}
                />
              </View>
            </View>
            <View>
              <Button
                label="Forgot Password?"
                variant="ghost"
                disabled={isLoading}
              />
            </View>
            <View className="mt-4 flex w-full items-center justify-center">
              <Button
                disabled={isLoading}
                label="Continue"
                variant="primary"
                onPress={() => handleSignIn()}
              />
            </View>
            <View className="flex flex-row items-center justify-center">
              <ThemedText type="default" className="opacity-70">
                Don't have an account?
              </ThemedText>
              <Button
                disabled={isLoading}
                onPress={() => {
                  router.push("/(auth)/signup/");
                }}
                label="Sign up"
                variant="ghost"
                fullWidth={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeLayout>
  );
};
