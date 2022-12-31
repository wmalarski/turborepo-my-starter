import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (appWithTranslation as any)(MyApp);
