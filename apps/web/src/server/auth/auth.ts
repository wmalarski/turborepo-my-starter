import { CookieSerializeOptions, serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { getUser, User } from "services";

const cookieKey = "starter-session-token";

const cookieOptions: CookieSerializeOptions = {
  httpOnly: true,
  maxAge: 2592000,
  path: "/",
  sameSite: "strict",
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  secure: process.env.NODE_ENV === "production",
};

export const getUserFromCookies = (
  cookies: NextApiRequest["cookies"]
): Promise<User | null> => {
  const token = cookies[cookieKey];
  if (!token) {
    return Promise.resolve(null);
  }
  return getUser({ token });
};

export const setUserCookie = (res: NextApiResponse, token: string) => {
  const cookie = serialize(cookieKey, token, cookieOptions);
  res.setHeader("Set-Cookie", cookie);
};

export const clearUserCookie = (res: NextApiResponse) => {
  const cookie = serialize(cookieKey, "-", { ...cookieOptions, maxAge: 1 });
  res.setHeader("Set-Cookie", cookie);
};
