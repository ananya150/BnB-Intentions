import { db } from "./db";
import { Ratelimit } from "@upstash/ratelimit";

export const rateLimiter = new Ratelimit({
  redis: db,
  limiter: Ratelimit.slidingWindow(1, "5 s"),
  prefix: "@upstash/ratelimit",
});
