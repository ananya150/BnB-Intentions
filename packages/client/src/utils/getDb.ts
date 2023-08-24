import { fetchRedis } from "./redis";

export const getAddressById = async (userId: string) => {
  const address = (await fetchRedis(
    "smembers",
    `user:${userId}:address`,
  )) as string;
  return address;
};

export const getCredIdbyId = async (userId: string) => {
  const credId = (await fetchRedis(
    `smembers`,
    `user:${userId}:address`,
  )) as string;
  return credId;
};
