import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/utils/create-emotion-cache";
import { CustomAppProps } from "../src/types";
import ColorScehmeProvider from "../src/context/color-scheme";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: CustomAppProps) {
  const getPageFromLayout = Component.getLayout || ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorScehmeProvider>
        {getPageFromLayout(<Component {...pageProps} />)}
      </ColorScehmeProvider>
    </CacheProvider>
  );
}

export default MyApp;
