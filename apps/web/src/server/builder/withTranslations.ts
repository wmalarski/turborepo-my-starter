import type { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type WithTranslations = {
  namespaces?: string[];
};

export const withTranslations = <
  R extends GetServerSidePropsContext = GetServerSidePropsContext
>(
  options: WithTranslations = {}
) => {
  return async (event: R) => {
    const locale = event.locale || event.defaultLocale || "pl";
    const translations = await serverSideTranslations(
      locale,
      options.namespaces
    );

    return { ...event, translations };
  };
};
