import type { GetServerSidePropsContext } from "next";
import { z } from "zod";

export const withTypedQuery = <
  SchemaType extends z.ZodRawShape,
  R extends GetServerSidePropsContext = GetServerSidePropsContext
>(
  schema: z.ZodObject<SchemaType>
) => {
  return async (event: R) => {
    console.log("before", event.params, event.query);
    const parsedQuery = await schema.parseAsync(event.query);
    console.log("after", parsedQuery);
    return { ...event, parsedQuery };
  };
};
