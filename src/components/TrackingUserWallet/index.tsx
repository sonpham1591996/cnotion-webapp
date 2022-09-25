import { loadPortfolio } from "@/services/PortfolioService";
import { formatTotalBalance, logger, validateAddress } from "@/shared/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AssetsCardTable } from "../AssetsCardTable";
import { CardStats } from "../CardStats/CardStats";
import { ListTransactions } from "../ListTransactions";
import { Loader } from "../Loader";

export const TrackingUserWallet = () => {
  const [portfolioData, setPortfolioData] = useState<any>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (router.query.address && validateAddress(router.query.address as string)) {
      loadPortfolio("7d", router.query.address as string)
        .then((data: any) => {
          setPortfolioData(data);
        })
        .catch(logger);
    }
  }, [router.query]);

  if (!portfolioData && router.query.address) return <Loader />;

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

      {router.query.address && (
        <ListTransactions
          address={router.query.address as string}
          showSearchBox={false}
        />
      )}
    </div>
  );
};
