import { loadPortfolio } from "@/services/PortfolioService";
import { formatTotalBalance, logger, validateAddress } from "@/shared/utils";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { AssetsCardTable } from "../AssetsCardTable";
import { CardStats } from "../CardStats/CardStats";
import { ListTransactions } from "../ListTransactions";
import { Loader } from "../Loader";

interface TrackingUserWalletProps {
  address?: string;
}

export const TrackingUserWallet: FC<TrackingUserWalletProps> = ({
  address,
}: TrackingUserWalletProps) => {
  const [portfolioData, setPortfolioData] = useState<any>(undefined);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const trackingAddress =
    address ?? (router.query.address as string) ?? undefined;

  useEffect(() => {
    if (trackingAddress && validateAddress(trackingAddress) && loading) {
      loadPortfolio("7d", trackingAddress)
        .then((data: any) => {
          setPortfolioData(data);
          setLoading(false);
        })
        .catch(logger);
    }
  }, [router.query, loading, address]);

  if (loading) return <Loader />;

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

      {trackingAddress && (
        <ListTransactions address={trackingAddress} showSearchBox={false} />
      )}
    </div>
  );
};
