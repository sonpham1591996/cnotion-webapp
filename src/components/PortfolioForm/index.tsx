import { setPortfolioData } from "@/redux/actions/appAction";
import { PORTFOLIO_CONTEXT_ENUM } from "@/redux/state";
import { loadPortfolio } from "@/services/PortfolioService";
import {
  getLocalStorage,
  logger,
  PORTFOLIO_HISTORY_STORAGE_KEY,
  setLocalStorage,
  validateAddress,
} from "@/shared/utils";
import { useWeb3 } from "@3rdweb/hooks";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Loader } from "../Loader";

type PortfolioFormData = {
  address: string;
};

export const PortfolioForm: FC = () => {
  const { address, connectWallet } = useWeb3();

  const dispatch = useDispatch();
  const [historyPortfolio, setHistoryPortfolio] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const handleData = (data: any, public_key: string) => {
    setLocalStorage(
      PORTFOLIO_HISTORY_STORAGE_KEY,
      (() => {
        const oldValue = getLocalStorage(PORTFOLIO_HISTORY_STORAGE_KEY)
          ? JSON.parse(getLocalStorage(PORTFOLIO_HISTORY_STORAGE_KEY)!)
          : [];
        const index = oldValue.indexOf(public_key);
        if (index >= 0) {
          oldValue.splice(index, 1);
          oldValue.unshift(public_key);
          return JSON.stringify(oldValue);
        }
        oldValue.unshift(public_key);
        return JSON.stringify(oldValue);
      })()
    );
    dispatch(
      setPortfolioData({
        portfolio_context: PORTFOLIO_CONTEXT_ENUM.USER_PORTFOLIO,
        portfolio_data: data && data !== "" ? data : undefined,
        public_key,
      })
    );
  };

  const onSubmit = (data: PortfolioFormData) => {
    if (!data.address || !validateAddress(data.address)) {
      return;
    }
    setLoading(true);
    loadPortfolio(data.address, '30d')
      .then((d: any) => {
        setLoading(false);
        handleData(d, data.address);
      })
      .catch((error: any) => {
        logger(error?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!historyPortfolio) {
      setHistoryPortfolio(
        JSON.parse(getLocalStorage(PORTFOLIO_HISTORY_STORAGE_KEY) ?? "[]")
      );
    }
  }, [historyPortfolio]);

  useEffect(() => {
    if (address) {
      onSubmit({ address: address });
    }
  }, [address]);

  if (loading) return <Loader />;

  if (!address) {
    return (
      <div className="block justify-center mt-16 md:mt-40 md:w-8/12 px-16 py-16">
        <div className="text-2xl font-bold">Welcome to CNotion!</div>
        <div className="text-lg-font-semibold">
          Manage your Defi positions with the most comprehensive analytics
          platform ever built.
        </div>

        <div className="btn-connect-wallet my-4">
          <button
            className="px-4 py-2 rounded-md bg-blue-600 cursor-pointer hover:bg-purple-500 text-lg font-semibold duration-100 text-white"
            onClick={() => connectWallet("injected")}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return <div className="flex justify-center mt-16 md:mt-40"></div>;
};
