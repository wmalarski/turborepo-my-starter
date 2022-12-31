import type { GetServerSidePropsContext } from "next";
import { getUserFromCookies } from "./auth";

export const withUser = <
  R extends GetServerSidePropsContext = GetServerSidePropsContext
>() => {
  return async (event: R) => {
    const user = await getUserFromCookies(event.req.cookies);
    return { ...event, user };
  };
};
