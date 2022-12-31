import type { GetServerSidePropsContext } from "next";
import { getUser } from "./auth";

export const withUser = <
  R extends GetServerSidePropsContext = GetServerSidePropsContext
>() => {
  return async (event: R) => {
    const user = await getUser(event.req.cookies);
    return { ...event, user };
  };
};
