import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Meta } from "@/layouts/Meta";
import { login } from "@/services/UsersService";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type IMainProps = {
  meta: string;
  children: ReactNode;
};

export const Main = (props: IMainProps) => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      if (!sessionStorage.getItem("token")) {
        login({ address, nonce: "abc" }).then((token: string) => {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("isWalletConnected", "true");
          if (router.asPath === "/connect-wallet") {
            router.push("/");
          }
        });
      }
      setLoading(false);
    } else if (sessionStorage.getItem("isWalletConnected") === "true") {
      connectWithMetamask();
      setLoading(false);
    } else {
      router.push("/connect-wallet");
      setLoading(false);
    }
  }, [address]);

  if (loading) return null;

  return (
    <div className="w-full px-1 text-gray-700 antialiased dark:bg-black-700 dark:text-white">
      <Meta title={props.meta} description="CNotion"></Meta>
      {/* Desktop */}
      <div className="hidden md:flex w-full">
        <Sidebar />
        <div
          className="lg:w-full py-4"
          style={{
            marginLeft: "225px",
          }}
        >
          {props.children}
        </div>
      </div>
      {/* Mobile */}
      <div className="sm:block md:hidden">
        <Navbar />
        <div className="px-2">{props.children}</div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};
