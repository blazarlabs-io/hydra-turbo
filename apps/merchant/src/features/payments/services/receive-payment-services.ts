import {
  connectToBLEDeviceService,
  disconnectToBLEDeviceService,
  getCharacteristicService,
  getCharacteristicValueService,
  scanDevicesService,
  writeCharacteristicService,
} from "./ble-connection";

const DEVICE_NAME = "HydraMerchant";
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const ADDRESS_CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
const VALUE_CHARACTERISTIC_UUID = "7f5b388b-5195-4d06-8bbe-2bda381ec89e";

export const receivePaymentService = async (address: string, value: string) => {
  try {
    console.log("Scanning devices...");
    const device = await scanDevicesService(DEVICE_NAME, [SERVICE_UUID]);
    if (!device) throw new Error("Deviced not found");
    console.log("Getting Service...");
    const service = await connectToBLEDeviceService(device, SERVICE_UUID);
    if (!service) throw new Error("Service not found");
    console.log("Getting Caracteristics...");
    const addressChart = await getCharacteristicService(
      service,
      ADDRESS_CHARACTERISTIC_UUID,
    );
    const valueChart = await getCharacteristicService(
      service,
      VALUE_CHARACTERISTIC_UUID,
    );
    if (!addressChart || !valueChart) throw new Error("Can not process");

    console.log("Creating transactions...");
    const response = await postPaymentTrasnsactionService(address, value);
    const transactionRef = response.id;

    console.log("Writing data...");
    await writeCharacteristicService(addressChart, transactionRef);
    await writeCharacteristicService(valueChart, value);
    console.log("Getting writen data values...");
    const newAddress = await getCharacteristicValueService(addressChart);
    const newValue = await getCharacteristicValueService(valueChart);
    await disconnectToBLEDeviceService(device);
    return { newAddress, newValue };
  } catch (error) {
    console.error(error);
  }
};

const postPaymentTrasnsactionService = async (
  address: string,
  value: string,
) => {
  const resp = await fetch("/api/post-payment", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetRef: address,
      amount: value,
      invoiceRef: "some-ref",
    }),
  });

  return await resp.json();
};
