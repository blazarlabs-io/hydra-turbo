export async function scanDevicesService(
  deviceName: string,
  optionalServices: string[],
) {
  if (!("bluetooth" in navigator)) {
    throw new Error("Your browser may not support the BLE Bluetooth API");
  }

  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: false,
      filters: [{ name: deviceName, services: optionalServices }],
    });
    const isTargetDevice = device.name === deviceName;
    if (!isTargetDevice) return;
    return device;
  } catch (error) {
    console.log(error);
  }
}

export async function connectToBLEDeviceService(
  device: BluetoothDevice,
  serviceId: string,
) {
  if (device === null) return;

  try {
    const server = await device?.gatt?.connect();
    if (!server) return;
    return await server.getPrimaryService(serviceId);
  } catch (error) {
    console.log(error, "Error connecting to BLE device");
  }
}

export async function getCharacteristicService(
  service: BluetoothRemoteGATTService,
  characteristicId: string,
) {
  try {
    const characteristic = await service.getCharacteristic(characteristicId);
    return characteristic;
  } catch (error) {
    console.log(error, "Error in get characteristic service");
  }
}

export async function getCharacteristicValueService(
  characteristic: BluetoothRemoteGATTCharacteristic,
) {
  try {
    const value = await characteristic.readValue();
    // Convert DataView to string
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(value);
  } catch (error) {
    console.log(error, "Error in get characteristic value");
  }
}

export async function writeCharacteristicService(
  characteristic: BluetoothRemoteGATTCharacteristic,
  value: string,
) {
  try {
    const encoder = new TextEncoder();
    const envodedValue = encoder.encode(value);
    await characteristic.writeValue(envodedValue);
  } catch (error) {
    console.log(error, "Error writing characteristic");
    return { success: false };
  }
}

export async function disconnectToBLEDeviceService(device: BluetoothDevice) {
  try {
    device?.gatt?.disconnect();
  } catch (error) {
    console.log(error, "Error disconnecting device");
  }
}
