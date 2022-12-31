/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

type HandlerBuilderResult<
  C extends GetServerSidePropsContext = GetServerSidePropsContext
> = {
  get: <P extends { [key: string]: any } = { [key: string]: any }>(
    inner: (context: C) => Promise<GetServerSidePropsResult<P>>
  ) => GetServerSideProps<P>;
  use: <N extends C>(
    middleware: (context: C) => Promise<N>
  ) => HandlerBuilderResult<N>;
};

const handlerBuilderInner = <
  R extends GetServerSidePropsContext = GetServerSidePropsContext
>(
  next: (e: GetServerSidePropsContext) => R | Promise<R>
): HandlerBuilderResult<R> => {
  return {
    get: (last) => async (e) => {
      const resolved = await next(e);
      return last(resolved);
    },
    use: (middle) => {
      return handlerBuilderInner(async (e) => middle(await next(e)));
    },
  };
};

// Utility for chaining middleware
export const propsBuilder =
  (): HandlerBuilderResult<GetServerSidePropsContext> => {
    return {
      get: (inner) => inner,
      use: (middle) => handlerBuilderInner((e) => middle(e)),
    };
  };
