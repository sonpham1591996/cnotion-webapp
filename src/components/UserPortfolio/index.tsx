import toast from "@/components/Toast";
import {
  resetPortfolioData,
  setPortfolioData,
} from "@/redux/actions/appAction";
import { getPortfolioData, getPublicKey } from "@/redux/reducers/appReducer";
import { PORTFOLIO_CONTEXT_ENUM } from "@/redux/state";
import { loadPortfolio } from "@/services/PortfolioService";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardLineChart } from "../CardLineChart";
import { CardStats } from "../CardStats/CardStats";
import { CardTable } from "../CardTable";

export const UserPortfolio = () => {
  const portfolioData = useSelector(getPortfolioData);
  const dispatch = useDispatch();
  const public_key = useSelector(getPublicKey);

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
          (d: any) => d.value
        )
      : [];

  const onBack = () => {
    dispatch(resetPortfolioData());
  };

  const notify = React.useCallback((type: string, message: string) => {
    toast({ type, message });
  }, []);

  let interval: any;

  const handleData = (data: any, public_key: string) => {
    dispatch(
      setPortfolioData({
        public_key,
        portfolio_context: PORTFOLIO_CONTEXT_ENUM.USER_PORTFOLIO,
        portfolio_data: data,
      })
    );
    notify("success", "Refresh data!");
  };

  const listenData = (address: string) => {
    loadPortfolio(address)
      .then((data: any) => {
        if (!data || !data.assets) return;
        if (interval) clearInterval(interval);
        handleData(data, address);
      })
      .catch((_) => {
        notify("error", "Internal server error");
      });
  };

  useEffect(() => {
    if (interval) clearInterval(interval);
    if (public_key) {
      interval = setInterval(() => {
        listenData(public_key);
      }, 30000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [public_key]);

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
