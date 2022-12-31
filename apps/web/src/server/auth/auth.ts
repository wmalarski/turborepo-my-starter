import type { NextApiRequest } from "next";
import type { User } from "services";

export const getUser = (
  cookies: NextApiRequest["cookies"]
): Promise<User | null> => {
  console.log(cookies);
  return Promise.resolve(null);
};
