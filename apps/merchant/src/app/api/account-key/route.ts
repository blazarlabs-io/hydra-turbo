export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Only POST requests allowed" }),
      { status: 405 },
    );
  }
  const data = await req.json();
  const { seedPhrase } = data;
  if (!seedPhrase) {
    return new Response(JSON.stringify({ message: "Seed Phrase not found" }), {
      status: 405,
    });
  }
  const privateKey = seedPhrase;

  return new Response(JSON.stringify({ privateKey }), {
    status: 200,
  });
}
