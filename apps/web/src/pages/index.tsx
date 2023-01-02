import { withUser } from "@server/auth/withUser";
import { propsBuilder, ServerSideProps } from "@server/builder/propsBuilder";
import { withTranslations } from "@server/builder/withTranslations";
import { useTranslation } from "next-i18next";
import { Button } from "ui";
import styles from "./index.module.css";

export const getServerSideProps = propsBuilder()
  .use(withTranslations({ namespaces: ["common"] }))
  .use(withUser())
  .get(({ translations, user }) => {
    return Promise.resolve({ props: { ...translations, user } });
  });

type Props = ServerSideProps<typeof getServerSideProps>;

export default function Web({ user }: Props) {
  const { t } = useTranslation("common");

  return (
    <div>
      <h1 className={styles.page}>{t("title")}</h1>
      <Button>{t("title")}</Button>
      <pre>{JSON.stringify({ user }, null, 2)}</pre>
    </div>
  );
}
