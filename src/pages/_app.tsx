import "../styles/global.css";
import "../styles/tailwind.css";

import { Loader } from "@/components/Loader";
import { wrapper } from "@/redux/store";
import { withPasswordProtect } from "@storyofams/next-password-protect";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

import "regenerator-runtime/runtime";
import { ThemeProvider } from "next-themes";

const MyApp = ({ Component, pageProps }: AppProps) => {
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

  const supportedChainIds = [56];

  const connectors = {
    injected: {},
  };

  return loading ? (
    <Loader />
  ) : (
    <ThemeProvider enableSystem={true} attribute="class">
      {/* @ts-ignore */}
      <ThirdwebWeb3Provider
        supportedChainIds={supportedChainIds}
        connectors={connectors}
      >
        <Component {...pageProps} />
      </ThirdwebWeb3Provider>
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
