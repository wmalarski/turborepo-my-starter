import { withUser } from "@server/auth/withUser";
import { propsBuilder, ServerSideProps } from "@server/builder/propsBuilder";
import { withTranslations } from "@server/builder/withTranslations";
import { withTypedParams } from "@server/builder/withTypedParams";
import { withTypedQuery } from "@server/builder/withTypedQuery";
import { useTranslation } from "next-i18next";
import { Button } from "ui";
import { z } from "zod";
import styles from "./index.module.css";

export const getServerSideProps = propsBuilder()
  .use(withTranslations({ namespaces: ["common"] }))
  .use(withUser())
  .use(withTypedParams(z.object({ id: z.string() })))
  .use(
    withTypedQuery(
      z.object({
        filter: z.array(z.string()),
        page: z.coerce.number().min(0).optional(),
      })
    )
  )
  .get(({ translations, user, parsedParams, parsedQuery }) => {
    return Promise.resolve({
      props: { ...translations, ...parsedParams, ...parsedQuery, user },
    });
  });

type Props = ServerSideProps<typeof getServerSideProps>;

export default function Profile({ id, user, page, filter }: Props) {
  const { t } = useTranslation("common");

  return (
    <div>
      <h1 className={styles.page}>{t("title")}</h1>
      <Button>Profile</Button>
      <pre>{JSON.stringify({ filter, id, page, user }, null, 2)}</pre>
    </div>
  );
}
