#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define DEVICE_NAME "HydraMerchant"
#define SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define ADDRESS_CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define VALUE_CHARACTERISTIC_UUID "7f5b388b-5195-4d06-8bbe-2bda381ec89e"
#define RESPONSE_CHARACTERISTIC_UUID "1f27b6c7-0b7b-434c-82bf-3d7e38bee582"

class MyCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    // std::string value = pCharacteristic->getValue();
    // String stringValue = String(value.c_str());
    String stringValue = pCharacteristic->getValue();

    if (stringValue.length() > 0) {
      Serial.println("*********");
      Serial.print("New value: ");
      for (int i = 0; i < stringValue.length(); i++) {
        Serial.print(stringValue[i]);
      }

      Serial.println();
      Serial.println("*********");
    }
  }
};

class MyServerCallbacks : public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
        Serial.println("Client connected!");
    }

    void onDisconnect(BLEServer* pServer) {
        Serial.println("Client disconnected, restarting advertising...");
        pServer->getAdvertising()->start();  // Restart BLE advertising
    }
};

void setup() {
  // Start serialport for debug
  Serial.begin(115200);
  Serial.println("1- Download and install an BLE scanner app in your phone");
  Serial.println("2- Scan for BLE devices in the app");
  Serial.println("3- Connect to HydraMerchant");
  Serial.println("4- Go to CUSTOM CHARACTERISTIC in CUSTOM SERVICE and write something");
  Serial.println("5- See the magic =)");

  // Init the BLE beacon
  BLEDevice::init(DEVICE_NAME);
  // Create the BLE server
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  // Create services
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create characteristics
  BLECharacteristic *addressCharacteristic =
    pService->createCharacteristic(ADDRESS_CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE);
  BLECharacteristic *valueCharacteristic =
    pService->createCharacteristic(VALUE_CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE);
  BLECharacteristic *responseCharacteristic =
    pService->createCharacteristic(RESPONSE_CHARACTERISTIC_UUID, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE);

  // Set callbacks
  addressCharacteristic->setCallbacks(new MyCallbacks());
  valueCharacteristic->setCallbacks(new MyCallbacks());
  responseCharacteristic->setCallbacks(new MyCallbacks());

  // Set Values
  addressCharacteristic->setValue("Hello World"); //here we can send the merchant's wallet address
  valueCharacteristic->setValue("5500");          //here we can send the value to be paid by client
  responseCharacteristic->setValue("");

  // Starrt service
  pService->start();

  //start advertising service
  // BLEAdvertising *pAdvertising = pServer->getAdvertising();
  // pAdvertising->addServiceUUID(SERVICE_UUID);

  // pAdvertising->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("Characteristic defined! Now you can read it in your phone!");
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(2000);
}
