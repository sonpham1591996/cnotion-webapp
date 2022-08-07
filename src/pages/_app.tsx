import "../styles/global.css";
import "../styles/tailwind.css";

import { Loader } from "@/components/Loader";
import { wrapper } from "@/redux/store";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

  return loading ? <Loader /> : <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
