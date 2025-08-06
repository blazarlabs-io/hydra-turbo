// import { SerialPort } from "serialport";
import bleno from "bleno";
import * as BeaconScanner from "node-beacon-scanner";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Only POST requests allowed" }),
      { status: 405 },
    );
  }

  const data = await req.json();
  const { service } = data;

  if (!service) {
    return new Response(JSON.stringify({ message: "Token not found" }), {
      status: 405,
    });
  }

  try {
    // const port = new SerialPort({ path: "/dev/ttyUSB0", baudRate: 115200 }); // Replace with your port
    console.log("HELLO WORLD Scanning...");

    const scanner = new BeaconScanner();

    scanner
      .startScan()
      .then((result: any) => {
        console.log("Scanning for BLE devices...", result);
      })
      .catch((error: any) => {
        console.error(error);
      });

    setTimeout(() => {
      console.log("Scan stopped");
    }, 10000);

    const response = {
      data: {
        success: true,
      },
    };

    if (response.data.success) {
      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Failed to verify" }), {
        status: 405,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
