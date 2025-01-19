import { initAdmin } from "~/src/lib/firebase/admin";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Only POST requests allowed" }),
      { status: 405 },
    );
  }

  const data = await req.json();
  const { email } = data;

  try {
    const app = await initAdmin();
    const res = await app.auth().getUserByEmail(email);

    return new Response(
      JSON.stringify({
        exists: false,
        message: "Email does not exists",
      }),
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.log("ERROR:", error);
    return new Response(
      JSON.stringify({ exists: true, message: error.message }),
      {
        status: 200,
      },
    );
  }
}
