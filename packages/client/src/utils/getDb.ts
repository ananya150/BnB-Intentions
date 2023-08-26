import { fetchRedis } from "./redis";

export const getWalletById = async (userId: string) => {
  const wallet = (await fetchRedis(
    "smembers",
    `user:${userId}:wallet`,
  )) as string;
  return wallet;
};
