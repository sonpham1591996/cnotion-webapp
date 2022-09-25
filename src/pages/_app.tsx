import "../styles/global.css";
import "../styles/tailwind.css";

import { Loader } from "@/components/Loader";
import { wrapper } from "@/redux/store";
import { withPasswordProtect } from "@storyofams/next-password-protect";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ThemeProvider } from "next-themes";
import "regenerator-runtime/runtime";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return loading ? (
    <Loader />
  ) : (
    <ThemeProvider enableSystem={true} attribute="class">
      {/* @ts-ignore */}
      <ThirdwebProvider
        desiredChainId={ChainId.Mainnet}
        walletConnectors={[
          "walletConnect",
          {
            name: "injected",
            options: {
              shimDisconnect: true,
            },
          },
        ]}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ThemeProvider>
  );
};

export default process.env.PASSWORD_PROTECT
  ? wrapper.withRedux(
      withPasswordProtect(MyApp, {
        loginApiUrl: "/api/login",
      })
    )
  : wrapper.withRedux(MyApp);
