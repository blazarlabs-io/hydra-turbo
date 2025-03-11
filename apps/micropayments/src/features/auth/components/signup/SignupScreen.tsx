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
import { SignupErrorModal } from "./SignupErrorModal";
import { useAuth } from "../../contexts/authContext";
import { useSignup } from "../../hooks/useSignup";

export const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { isLoading, signUp } = useSignup();
  const { setUser } = useAuth();

  const wrongPassword = password !== confirmPassword;

  const disable =
    email.length === 0 || password.length === 0 || isLoading || wrongPassword;

  const handleSignIn = async () => {
    try {
      setErrorMessage("");
      const resp = await signUp(email, password);
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
      <SignupErrorModal
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
              <ThemedText type="defaultSemiBold">Signup</ThemedText>
              <Image
                source={require("@/assets/images/hydrapay.png")}
                className=""
                style={{ width: 200, height: 64 }}
                resizeMode="contain"
              />
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
              <View className="mt-4 w-full">
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onValueChange={(value) => setConfirmPassword(value)}
                />
              </View>
            </View>
            <View className="mt-4 flex w-full items-center justify-center">
              <Button
                disabled={disable}
                label="Register"
                variant="primary"
                onPress={() => handleSignIn()}
              />
            </View>
            <View className="flex flex-row items-center justify-center">
              <ThemedText type="default" className="opacity-70">
                Already have an account?
              </ThemedText>
              <Button
                disabled={isLoading}
                onPress={() => {
                  router.push("/(auth)/signin/");
                }}
                label="Sign in"
                variant="ghost"
                fullWidth={false}
              />
            </View>
            <View className="flex w-full flex-row items-center justify-center gap-x-2">
              <View className="h-[1px] grow bg-gray-300" />
              <ThemedText type="default" className="opacity-70">
                Or continue with
              </ThemedText>
              <View className="h-[1px] grow bg-gray-300" />
            </View>
            <View className="flex w-full items-center justify-center py-4">
              <Button
                disabled={isLoading}
                label="Continue with Google"
                variant="outline"
                icon={GoogleIcon}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeLayout>
  );
};
