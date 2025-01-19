# hydra-turbo

## Install dependencies

In the project's root folder:

```shell
pnpm install
```

## Setup micropayments app

1. cd into the micropayments app folder.

```shell
cd apps/micropayments
```

2. Prebuild using expo:

```shell
npx expo prebuild --clean
```

This should build your android and ios folders.

3. Modify the AndroidManifest.xml file located in:

```
android/app/src/main/AndroidManifest.xml
```

Make sure the following permissions are listed, if not please add them:

```xml
<uses-permission-sdk-23 android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission-sdk-23 android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.BLUETOOTH"/>
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT"/>
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" tools:targetApi="31"/>
```

4. Run the app from the hydra-turbo root folder.

```shell
pnpm dev --filter micropayments
```

**IMPORTANT:** Since the APP uses the bluetooth interface, it can't be run on a simulator, it needs to be tested on a physical device.

**KNOWN ERRORS:**

1.  Could not determine the dependencies of task ':app:compileDebugJavaWithJavac'.
    │ > SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable or by setting the sdk.dir path in your project's local properties file xxxx...... SOLUTION: Create a local.properties file inside the adnroid/ folder. If working with linux, copy and save the following line inside the file: `sdk.dir = /home/USERNAME/Android/Sdk`. Make sure you replace USERNAME with your user name. More information [HERE](https://stackoverflow.com/questions/27620262/sdk-location-not-found-define-location-with-sdk-dir-in-the-local-properties-fil).
