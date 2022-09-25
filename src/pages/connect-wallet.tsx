import { Main } from "@/templates/Main";
import { useMetamask } from "@thirdweb-dev/react";
import { NextPage } from "next";

const ConnectWallet: NextPage = () => {
  const connectWithMetamask = useMetamask();

  return (
    <Main meta="Connect Wallet | CNotion">
      <div className="lg:w-full py-4 ml-10">
        <div className="block justify-center mt-16 md:mt-40 md:w-8/12 px-16 py-16 h-screen">
          <div className="text-2xl font-bold">Welcome to CNotion!</div>
          <div className="text-lg-font-semibold">
            Manage your Defi positions with the most comprehensive analytics
            platform ever built.
          </div>

          <div className="btn-connect-wallet my-4">
            <button
              className="px-4 py-2 rounded-md bg-blue-600 cursor-pointer hover:bg-purple-500 text-lg font-semibold duration-100 text-white"
              onClick={() => {
                connectWithMetamask();
              }}
            >
              Connect Wallet with MetaMask
            </button>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default ConnectWallet;
