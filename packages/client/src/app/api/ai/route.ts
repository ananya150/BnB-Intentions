import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { chatCompletionRequest } from "../../../lib/openai";
import { rateLimiter } from "../../../lib/rate-limiter";

const systemMessage: Message = {
  role: "system",
  content: `
    Your are an AI assistant for a crypto wallet named OpIntents. If user asks anything unrelated to the wallet, tell him politely to ask questions regarding wallet only.
    The wallet supports only 2 assets BNB and BUSD on two different chains BSC and its optimistic rollup named OPBNB.
    You are going to help user for the following tasks :-
    a) transfer assets to an address
    b) swaps between the assets on same chain
    c) BUSD swaps between different chains
    using function caling. Don't make assumptions about what values to plug into functions, If enough innformation is not provided, ask the user for the information needed.
    If user mentions any other assets other than BNB and BUSD and any chains other than BSC and OPBNB, tell him its not supported.
  `,
};

export async function POST(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";
  console.log(`rate limiter called from ip ${ip}`);
  try {
    const { success } = await rateLimiter.limit(ip);
    if (!success) {
      console.log("Request rate limited");
      const resp: Message = {
        role: "assistant",
        content:
          "Rate Limiter applied. Request cancelled. Asking questions too fast.",
      };
      return NextResponse.json({ resp }, { status: 200 });
    }
  } catch (e) {
    return new NextResponse("Something went wrong", { status: 400 });
  }
  try {
    console.log("open ai api called");
    const { messages } = await req.json();
    const updatedMessages = [systemMessage, ...messages];

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const resp = await chatCompletionRequest(updatedMessages);

    return NextResponse.json({ resp }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Invalid request", { status: 400 });
  }
}
