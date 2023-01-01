import type { GetServerSidePropsContext } from "next";
import { z } from "zod";

export const withTypedQuery = <
  SchemaType extends z.ZodRawShape,
  R extends GetServerSidePropsContext = GetServerSidePropsContext
>(
  schema: z.ZodObject<SchemaType>
) => {
  return async (event: R) => {
    const parsedQuery = await schema.parseAsync(event.query);
    return { ...event, parsedQuery };
  };
};
