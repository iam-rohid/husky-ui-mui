import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/utils/create-emotion-cache";
import { CustomAppProps } from "../src/types";
import ColorScehmeProvider from "../src/context/color-scheme";
import { SnackbarProvider } from "notistack";

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
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          {getPageFromLayout(<Component {...pageProps} />)}
        </SnackbarProvider>
      </ColorScehmeProvider>
    </CacheProvider>
  );
}

export default MyApp;
