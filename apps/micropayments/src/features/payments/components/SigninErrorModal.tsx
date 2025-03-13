import { Button, ThemedText, ThemedView } from "@/components/core";
import { Modal, useColorScheme, View } from "react-native";
import { usePaymentTransaction } from "../hooks/usePaymentTransaction";
import { useConfirmPaymentTransactio } from "../hooks/useConfirmPaymentTransactio";

type Props = {
  showModal: boolean;
  closeModal: () => void;
  paymentTransactionId: string;
};

export const PaymentConirmationModal = (props: Props) => {
  const { showModal, closeModal, paymentTransactionId } = props;
  // * HOOKS
  const theme = useColorScheme() ?? "light";
  const { paymentTransaction } = usePaymentTransaction(paymentTransactionId);
  const { isLoading, confirmHandler } =
    useConfirmPaymentTransactio(paymentTransactionId);

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
        <ThemedView className="flex max-w-[75%] flex-col items-center justify-center rounded-[32px] border px-4 py-6">
          <View className="text-2xl">
            <ThemedText className="my-2 text-2xl font-bold">
              Payment Confirmation
            </ThemedText>
          </View>
          {paymentTransaction ? (
            <>
              <View className="my-4 w-full items-start">
                <View className="w-full items-start">
                  <ThemedText className="font-bold">Merchant:</ThemedText>
                  <ThemedText className="pl-2 opacity-50">
                    {paymentTransaction.merchantName}
                  </ThemedText>
                </View>
                <View className="w-full items-start">
                  <ThemedText className="font-bold">Invoice:</ThemedText>
                  <ThemedText className="pl-2 opacity-50">
                    {paymentTransaction.invoiceRef}
                  </ThemedText>
                </View>
                <View className="w-full items-start">
                  <ThemedText className="font-bold">Amount:</ThemedText>
                  <ThemedText className="pl-2 opacity-50">
                    {paymentTransaction.amount} USD
                  </ThemedText>
                </View>
              </View>
              <View className="">
                {isLoading ? (
                  <ThemedText className="my-2 text-xl font-bold">
                    Payment in progress...
                  </ThemedText>
                ) : paymentTransaction.processed ? (
                  <View className="flex flex-col gap-4">
                    <ThemedText className="my-4 text-xl font-bold text-green-500">
                      Payment success!
                    </ThemedText>
                    <Button
                      variant="outline"
                      label="Close"
                      fullWidth={false}
                      onPress={() => closeModal()}
                    />
                  </View>
                ) : (
                  <View className="mt-8 flex w-full flex-row items-center justify-evenly">
                    <Button
                      variant="outline"
                      label="Cancel"
                      fullWidth={false}
                      onPress={() => closeModal()}
                    />
                    <Button
                      variant="primary"
                      label="Confirm"
                      fullWidth={false}
                      onPress={() => confirmHandler()}
                    />
                  </View>
                )}
              </View>
            </>
          ) : (
            <ThemedText className="font-bold">
              Loading Payment Data...
            </ThemedText>
          )}
        </ThemedView>
      </View>
    </Modal>
  );
};
