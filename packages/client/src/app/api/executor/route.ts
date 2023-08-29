export async function POST(req: Request) {
  try {
    const { address, keyId, keyHash } = await req.json();

    return new Response("", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Invalid request", { status: 400 });
  }
}
