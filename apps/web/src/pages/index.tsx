import { useTranslation } from "next-i18next";
import { Button } from "ui";
import { withTranslations } from "../server/withTranslations";
import { propsBuilder } from "../utils/propsBuilder";
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
  .get(({ translations }) => {
    return Promise.resolve({ props: { ...translations } });
  });
