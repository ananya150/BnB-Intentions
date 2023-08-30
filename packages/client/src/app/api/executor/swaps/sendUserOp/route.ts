import { swap } from "@opintents/shared";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("api called");
    const { assetName, signedUserOp, account } = await req.json();
    const txRespnse = await swap(signedUserOp, account);
    return NextResponse.json({ txRespnse }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Invalid request", { status: 400 });
  }
}
