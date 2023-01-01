import type { GetServerSidePropsContext } from "next";
import { z } from "zod";

export const withTypedParams = <
  SchemaType extends z.ZodRawShape,
  R extends GetServerSidePropsContext = GetServerSidePropsContext
>(
  schema: z.ZodObject<SchemaType>
) => {
  return async (event: R) => {
    const parsedParams = await schema.parseAsync(event.params);
    return { ...event, parsedParams };
  };
};
