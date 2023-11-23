import TrackingWalletContext from "@/contexts/TrackingWalletContext";
import { loadPortfolio } from "@/services/PortfolioService";
import { formatTotalBalance, logger } from "@/shared/utils";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { AssetsCardTable } from "../AssetsCardTable";
import { CardStats } from "../CardStats/CardStats";
import ListTransactions from "../ListTransactions";
import { Loader } from "../Loader";

const TrackingUserWallet: FC = () => {
  const [portfolioData, setPortfolioData] = useState<any>(undefined);
  const { publicAddress } = useContext(TrackingWalletContext);
  const [loading, setLoading] = useState(false);

  const loadPortfolioWithTrackingAddress = useCallback(() => {
    if (!publicAddress) return;
    setLoading(true);
    loadPortfolio("7d", publicAddress)
      .then((data: any) => {
        setPortfolioData(data);
        setLoading(false);
      })
      .catch((error) => {
        logger(error.message);
        setLoading(false);
      });
  }, [publicAddress]);

  useEffect(() => {
    loadPortfolioWithTrackingAddress();
  }, [publicAddress]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="md:my-4 h-screen overflow-y-auto">
      <div className="md:w-3/12">
        {portfolioData && (
          <CardStats
            statSubtitle="Total Balance"
            statTitle={formatTotalBalance(portfolioData)}
          />
        )}
      </div>

      {portfolioData && portfolioData.assets && (
        <div className="py-8">
          <AssetsCardTable items={portfolioData.assets} />
        </div>
      )}

      <ListTransactions />
    </div>
  );
};

export default TrackingUserWallet;
