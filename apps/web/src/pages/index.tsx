import { withUser } from "@server/auth/withUser";
import { propsBuilder } from "@server/builder/propsBuilder";
import { withTranslations } from "@server/builder/withTranslations";
import { useTranslation } from "next-i18next";
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

export const getServerSideProps = propsBuilder()
  .use(withTranslations({ namespaces: ["common"] }))
  .use(withUser())
  .get(({ translations, user }) => {
    return Promise.resolve({ props: { ...translations, user } });
  });
