import { loadPortfolio } from "@/services/PortfolioService";
import { useEffect, useState } from "react";
import {
  formatTotalBalance,
  getCardLineChartLabels,
  getCardLineChartWeight,
  getPieChartLabels,
  getPieChartWeight,
  logger,
} from "../../shared/utils";
import { AssetsCardTable } from "../AssetsCardTable";
import { CardLineChart } from "../CardLineChart";
import { CardStats } from "../CardStats/CardStats";
import { Loader } from "../Loader";
import { PieChart } from "../PieChart";

export const UserPortfolio = () => {
  const [portfolioData, setPortfolioData] = useState<any>(undefined);

  useEffect(() => {
    if (!portfolioData) {
      loadPortfolio("7d")
        .then((data: any) => {
          if (!data || !data.assets) return;
          setPortfolioData(data);
        })
        .catch(logger);
    }
  }, [portfolioData]);

  if (!portfolioData) {
    return <Loader />;
  }

  return (
    <div className="mx-auto md:my-4">
      <div className="md:w-3/12">
        <CardStats
          statSubtitle="Total Balance"
          statTitle={formatTotalBalance(portfolioData)}
          profitAndLoss={portfolioData.profitAndLoss}
        />
      </div>

      <div className="block md:flex my-2">
        <div className="sm:w-full pt-2 sm:px-2 md:pl-8 md:w-8/12">
          <CardLineChart
            title="All chains"
            labels={getCardLineChartLabels(portfolioData)}
            weight={getCardLineChartWeight(portfolioData)}
            filteredTime={"7d"}
            onFilterTime={(_: string) => {
              // TODO:
              // if (selectedOp !== filteredTime) {
              //   setPortfolioData(null);
              //   setFilteredTime(selectedOp);
              // }
            }}
          />
        </div>
        <div className="sm:w-full pt-12 pl-4 md:w-3/12">
          <PieChart
            title="Tokens"
            labels={getPieChartLabels(portfolioData)}
            weight={getPieChartWeight(portfolioData)}
          />
        </div>
      </div>

      <div className="py-8">
        <AssetsCardTable items={portfolioData.assets} />
      </div>
    </div>
  );
};
