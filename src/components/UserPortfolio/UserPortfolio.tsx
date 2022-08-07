import { resetPortfolioData } from "@/redux/actions/appAction";
import { getPortfolioData } from "@/redux/reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";
import { CardLineChart } from "../CardLineChart";
import { CardStats } from "../CardStats/CardStats";
import { CardTable } from "../CardTable";

export const UserPortfolio = () => {
  const portfolioData = useSelector(getPortfolioData);
  const dispatch = useDispatch();

  if (!portfolioData) return null;

  const formatTotalBalance = () => {
    return `${portfolioData.total_balance.toFixed(2)} USD`;
  };

  const getCardLineChartLabels = () =>
    portfolioData
      ? portfolioData.chart_data.map((d: any) =>
          new Date(d.timestamp).toISOString().slice(0, 10)
        )
      : [];

  const getCardLineChartWeight = () =>
    portfolioData
      ? portfolioData.chart_data.map(
          (d: any) => (d.open + d.high + d.low + d.close) / 4
        )
      : [];

  const onBack = () => {
    dispatch(resetPortfolioData());
  };

  return (
    <div className="md:w-9/12 mx-auto md:my-16">
      <div className="md:w-3/12">
        <CardStats
          statSubtitle="Total Balance"
          statTitle={formatTotalBalance()}
        />
      </div>

      <div className="my-4">
        <CardLineChart
          title="Binance smart chain"
          labels={getCardLineChartLabels()}
          weight={getCardLineChartWeight()}
        />
      </div>

      <CardTable items={portfolioData.assets} />

      <div className="flex justify-end my-4">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};
