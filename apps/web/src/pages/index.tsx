import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button } from "ui";
import styles from "./index.module.css";

export default function Web() {
  const { t } = useTranslation("common");

  return (
    <div>
      <h1 className={styles.page}>{t("title")}</h1>
      <Button />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || defaultLocale || "pl", [
        "common",
      ])),
    },
  };
};
