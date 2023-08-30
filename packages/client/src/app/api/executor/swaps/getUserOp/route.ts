import { getSwapBNBToBUSDUserOp } from "@opintents/shared";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("api called");
    const { account, assetName, amount } = await req.json();
    if (assetName === "BNB") {
      const { userOp, userOpHash } = await getSwapBNBToBUSDUserOp(
        amount,
        account,
      );
      return NextResponse.json(
        { userOp: userOp, userOpHash: userOpHash },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log(error);
    return new Response("Invalid request", { status: 400 });
  }
}
