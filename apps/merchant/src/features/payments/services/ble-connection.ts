import { optional } from "zod";

const DEVICE_NAME = "HydraMerchant";
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const ADDRESS_CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
const VALUE_CHARACTERISTIC_UUID = "7f5b388b-5195-4d06-8bbe-2bda381ec89e";
const RESPONSE_CHARACTERISTIC_UUID = "1f27b6c7-0b7b-434c-82bf-3d7e38bee582";

interface ScanDevicesResponse {
  success: boolean;
  device: any;
}
export async function scanDevices(): Promise<ScanDevicesResponse> {
  if (!("bluetooth" in navigator)) {
    console.log("Your browser may not support the BLE Bluetooth API");
    return { success: false, device: null };
  }

  try {
    const device = await (navigator as any).bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [SERVICE_UUID],
    });

    const connectStatus = device.name ? true : false;
    return { success: connectStatus, device: connectStatus ? device : null };
  } catch (error) {
    console.log(error);
    return { success: false, device: null };
  }
}
interface ConnectToDevice {
  success: boolean;
  server: any;
}
export async function connectToBLEDevice(
  device: any,
): Promise<ConnectToDevice> {
  if (device === null) {
    return { success: false, server: null };
  }

  try {
    const server = await device.gatt.connect();
    return { success: true, server };
  } catch (error) {
    console.log(error, "Your browser may not support the GATT server");
    return { success: false, server: null };
  }
}

interface GetCharacteristicsResponse {
  characteristic: any;
  success: boolean;
}
export async function getCharacteristic(
  server: any,
): Promise<GetCharacteristicsResponse> {
  if (server === null) return { characteristic: null, success: false };
  try {
    const service = await server.getPrimaryService(SERVICE_UUID);
    const characteristic = await service.getCharacteristics(
      VALUE_CHARACTERISTIC_UUID,
    );
    return { characteristic, success: true };
  } catch (error) {
    console.log(error, "Your browser may not support the GATT server");
    return { characteristic: null, success: false };
  }
}

interface WriteCharacteristicResponse {
  success: boolean;
}
export async function writeCharacteristic(
  device: any,
): Promise<WriteCharacteristicResponse> {
  if (device === null) return { success: false };
  try {
    const service = await device.gatt.getPrimaryService(SERVICE_UUID);
    const characteristic = await service.getCharacteristic(
      VALUE_CHARACTERISTIC_UUID,
    );
    const encoder = new TextEncoder();
    const value = encoder.encode("E1s4jG9evuaaiuTdX8A8");
    await characteristic.writeValue(value);
    return { success: true };
  } catch (error) {
    console.log(error, "Your browser may not support the GATT server");
    return { success: false };
  }
}

interface DisconnectToBLEDeviceProps {
  success: boolean;
}
export async function disconnectToBLEDevice(
  device: any,
): Promise<DisconnectToBLEDeviceProps> {
  if (device === null) {
    return { success: false };
  }

  try {
    await device.gatt.disconnect();
    return { success: true };
  } catch (error) {
    console.log(error, "Your browser may not support the GATT server");
    return { success: false };
  }
}
