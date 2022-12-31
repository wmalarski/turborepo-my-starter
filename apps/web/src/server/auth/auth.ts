import type { NextApiRequest } from "next";
import type { User } from "./types";

export const getUser = (
  cookies: NextApiRequest["cookies"]
): Promise<User | null> => {
  console.log(cookies);
  return Promise.resolve(null);
};
