import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { NextResponse } from "next/server";
import { chatCompletionRequest } from "../../../lib/openai";

export async function POST(req: Request) {
  try {
    console.log("open ai api called");
    const { messages } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    console.log(messages);

    const resp = await chatCompletionRequest(messages);

    return NextResponse.json({ resp }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Invalid request", { status: 400 });
  }
}
