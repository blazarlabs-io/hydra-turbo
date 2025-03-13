import {
  SERVICE_UUID,
  DEVICE_NAME,
  ADDRESS_CHARACTERISTIC_UUID,
  VALUE_CHARACTERISTIC_UUID,
} from "../data";
import {
  connectToBLEDeviceService,
  disconnectToBLEDeviceService,
  getCharacteristicFromService,
  getCharacteristicValueFromService,
  scanDevicesService,
  writeCharacteristicService,
} from "./ble-connection";

export const receivePaymentService = async (address: string, value: string) => {
  try {
    console.log("Scanning devices...");
    const device = await scanDevicesService(DEVICE_NAME, [SERVICE_UUID]);
    if (!device) throw new Error("Deviced not found");

    console.log("Getting Service...");
    const service = await connectToBLEDeviceService(device, SERVICE_UUID);
    if (!service) throw new Error("Service not found");

    console.log("Getting Caracteristics...");
    const addressChart = await getCharacteristicFromService(
      service,
      ADDRESS_CHARACTERISTIC_UUID,
    );
    const valueChart = await getCharacteristicFromService(
      service,
      VALUE_CHARACTERISTIC_UUID,
    );
    if (!addressChart || !valueChart) throw new Error("Can not process");

    console.log("Creating transactions...");
    const response = await postPaymentTransactionService(address, value);
    const transactionRef = response.id;

    console.log("Writing data...");
    await writeCharacteristicService(addressChart, transactionRef);
    await writeCharacteristicService(valueChart, value);

    console.log("Getting written data values...");
    const newAddress = await getCharacteristicValueFromService(addressChart);
    const newValue = await getCharacteristicValueFromService(valueChart);
    await disconnectToBLEDeviceService(device);

    return { newAddress, newValue, transactionRef };
  } catch (error) {
    console.error(error);
  }
};

const postPaymentTransactionService = async (
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
