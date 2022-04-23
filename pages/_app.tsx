import { CacheProvider } from "@emotion/react";
import createEmotionCache from "src/utils/create-emotion-cache";
import { CustomAppProps } from "src/types";
import ColorScehmeProvider from "src/context/color-scheme";
import { SnackbarProvider } from "notistack";
import PageProgressBar from "src/components/page-progress-bar";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: CustomAppProps) {
  const getPageFromLayout = Component.getLayout || ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <ColorScehmeProvider>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          {getPageFromLayout(<Component {...pageProps} />)}
          <PageProgressBar />
        </SnackbarProvider>
      </ColorScehmeProvider>
    </CacheProvider>
  );
}

export default MyApp;
