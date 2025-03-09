import { Alert, PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device, ScanOptions } from "react-native-ble-plx";
import BluetoothStateManager from "react-native-bluetooth-state-manager";

type DeviceOptions = { [key: string]: string };
type ScanResolve = { address: string; value: string };

export class BleClient {
  // Properties
  private manager: BleManager;
  private counter = 0;

  // Constructor
  constructor() {
    this.manager = new BleManager();
  }

  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === "ios") {
      return true;
    }
    if (
      Platform.OS === "android" &&
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ) {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      if (
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN &&
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      ) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        return (
          result["android.permission.BLUETOOTH_CONNECT"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.BLUETOOTH_SCAN"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.ACCESS_FINE_LOCATION"] ===
            PermissionsAndroid.RESULTS.GRANTED
        );
      }
    }

    console.log("Permission have not been granted");
    return false;
  }

  private calculateDistance(pathLossExponent: number, rssi: number) {
    const referenceRSSI = -59;
    const distance = Math.pow(
      10,
      (referenceRSSI - rssi) / (10 * pathLossExponent)
    );
    return parseFloat(distance.toFixed(2));
  }

  private async deviceHandler(
    deviceName: string,
    currDevice: Device,
    serviceOptions: DeviceOptions
  ) {
    const { rssi } = currDevice;
    const calcDistance = this.calculateDistance(2, rssi ?? 0);
    const isTargeDevice = currDevice?.name === deviceName;
    const isInCloser = calcDistance <= 0.2;
    if (!isTargeDevice || !isInCloser) return;
    console.log("currDevice: ", currDevice);
    console.log(calcDistance);
    // * Stop scanning as it's not necessary if you are scanning for one currDevice
    this.manager.stopDeviceScan();
    // * Connect to the currDevice
    const device = await currDevice.connect();
    await device.discoverAllServicesAndCharacteristics();
    console.log("discoverAllServicesAndCharacteristics");
    // * Read address characteristic
    const addressCharacteristic = await device.readCharacteristicForService(
      serviceOptions.SERVICE_UUID,
      serviceOptions.ADDRESS_CHARACTERISTIC_UUID
    );

    // * Read value characteristic
    const valueCharacteristic = await device.readCharacteristicForService(
      serviceOptions.SERVICE_UUID,
      serviceOptions.VALUE_CHARACTERISTIC_UUID
    );

    // * Convert to base64
    const address = atob(addressCharacteristic.value as string);
    const value = atob(valueCharacteristic.value as string);

    // * Clean the values stored
    const res = await device.writeCharacteristicWithResponseForService(
      serviceOptions.SERVICE_UUID,
      serviceOptions.VALUE_CHARACTERISTIC_UUID,
      btoa("")
    );

    // * Disconnect
    const isConnected = await device.isConnected();
    if (isConnected) device.cancelConnection();
    return {
      address,
      value,
    };
  }

  // Method to get the full name
  async scan(deviceName: string, serviceOptions: DeviceOptions) {
    console.log("Starting scanning...");
    this.counter = 0;
    return new Promise<ScanResolve | undefined>((resolve, reject) => {
      this.manager.startDeviceScan(null, null, async (error, currDevice) => {
        console.log("Scanning...attempt: ", this.counter);
        if (this.counter === 150) {
          this.manager.stopDeviceScan();
          resolve(undefined);
          return;
        }
        if (!currDevice) return;
        this.counter += 1;
        if (error) {
          // * Handle error (scanning will be stopped automatically)
          console.log("ERROR:", error.message);
          // * [BleError: BluetoothLE is powered off]
          if (error.message === "BluetoothLE is powered off") {
            this.manager.stopDeviceScan();
            BluetoothStateManager.requestToEnable()
              .then((result) => {
                this.scan(deviceName, serviceOptions);
              })
              .catch((error) => {
                console.log(error.message);
                Alert.alert(
                  "Bluetooth is off",
                  "Please turn on your bluetooth and try again"
                );
              });
          }
          reject(error.message);
          return;
        }
        try {
          const data = await this.deviceHandler(
            deviceName,
            currDevice,
            serviceOptions
          );
          if (!data) return;
          resolve(data);
        } catch (error) {
          console.log("Connection error", error);
          reject(error);
        }
      });
    });
  }
}
