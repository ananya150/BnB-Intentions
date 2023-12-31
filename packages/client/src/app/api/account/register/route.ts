import { authOptions } from "../../../../lib/auth";
import { getServerSession } from "next-auth";
import { getWalletById } from "../../../../utils/getDb";
import { addToWallet } from "../../../../utils/setDb";

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    // verify if account already registered
    const wallet = await getWalletById(session.user.id);
    if (wallet.length !== 0) {
      return new Response("Account already registered", { status: 400 });
    }

    // add the account to db
    try {
      await addToWallet(session.user.id, address);
    } catch (error) {
      console.log(error);
      return new Response("An error occured while adding to db", {
        status: 400,
      });
    }
    return new Response("Wallet Registered", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Invalid request", { status: 400 });
  }
}
