// import { getPrivateKey } from "~/src/utils/wallet";

export async function POST(req: Request) {
  console.log("POSTXXXXXXXXXXXX", req);

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Only POST requests allowed" }),
      { status: 405 },
    );
  }

  try {
    const data = await req.json();
    const { seedPhrase } = data;

    console.log("SEED-PHRASE", seedPhrase);

    if (!seedPhrase) {
      return new Response(
        JSON.stringify({ message: "Seed Phrase not found" }),
        {
          status: 405,
        },
      );
    }

    const privateKey = ""; //getPrivateKey(seedPhrase);

    return new Response(JSON.stringify({ privateKey }), {
      status: 200,
    });
  } catch (error) {
    console.log("ERROR", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
