import { db } from "../lib/db";

export const addToWallet = async (
  userId: string,
  address: string,
  keyId: string,
  keyHash: string,
) => {
  console.log(`Userid in the function is ${userId}`);
  await db.sadd(`user:${userId}:wallet`, address);
};
