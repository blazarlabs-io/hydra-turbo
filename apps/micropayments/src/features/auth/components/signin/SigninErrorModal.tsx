import { Button, Icons, ThemedText, ThemedView } from "@/components/core";
import { Colors } from "@/constants/Colors";
import { Modal, useColorScheme, View } from "react-native";

type Props = {
  showModal: boolean;
  closeModal: () => void;
  errorMessage: string;
};

export const SigninErrorModal = (props: Props) => {
  const { showModal, closeModal, errorMessage } = props;
  // * HOOKS
  const theme = useColorScheme() ?? "light";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <View className="flex h-full w-full items-center justify-center bg-black/60">
        <ThemedView className="flex max-w-[75%] flex-col items-center justify-center rounded-[32px] border p-8">
          <View className="flex w-full flex-row items-center justify-center gap-x-4">
            <View
              style={{
                backgroundColor: Colors[theme].error,
                borderColor: Colors[theme].foreground,
                borderWidth: 1,
              }}
              className="rounded-[16px] p-4"
            >
              <Icons.ErrorCircle />
            </View>
            <ThemedText className="max-w-[75%]">{errorMessage}</ThemedText>
          </View>
          <View className="mt-8 flex w-full flex-row items-center justify-end">
            <Button
              variant="link"
              label="Close"
              fullWidth={false}
              onPress={() => closeModal()}
            />
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
};
