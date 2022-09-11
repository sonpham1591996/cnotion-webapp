import toast from "@/components/Toast";
import {
  resetPortfolioData,
  setPortfolioData,
} from "@/redux/actions/appAction";
import { getPortfolioData, getPublicKey } from "@/redux/reducers/appReducer";
import { PORTFOLIO_CONTEXT_ENUM } from "@/redux/state";
import { loadPortfolio } from "@/services/PortfolioService";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardLineChart } from "../CardLineChart";
import { CardStats } from "../CardStats/CardStats";
import { CardTable } from "../CardTable";
import { Loader } from "../Loader";
import { PieChart } from "../PieChart";

export const UserPortfolio = () => {
  const portfolioData = useSelector(getPortfolioData);
  const dispatch = useDispatch();
  const public_key = useSelector(getPublicKey);
  const [filteredTime, setFilteredTime] = useState("7d");

  const formatTotalBalance = () => {
    return portfolioData ? `${portfolioData.total_balance.toFixed(2)} USD` : "";
  };

  const getCardLineChartLabels = () =>
    portfolioData && portfolioData.chart_data
      ? portfolioData.chart_data.map((d: any) =>
          new Date(d.timestamp).toISOString().slice(0, 10)
        )
      : [];

  const getCardLineChartWeight = () =>
    portfolioData && portfolioData.chart_data
      ? portfolioData.chart_data.map((d: any) => d.value)
      : [];

  const getPieChartLabels = () =>
    portfolioData && portfolioData.assets
      ? portfolioData.assets
          .map((d: any) => (d.pie_chart_percentage > 0 ? d.token_name : null))
          .filter((l: string) => !!l)
      : [];

  const getPieChartWeight = () =>
    portfolioData && portfolioData.assets
      ? portfolioData.assets.map((d: any) => d.pie_chart_percentage)
      : [];

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
  };

  const listenData = (address: string, inputFilteredTime?: string) => {
    loadPortfolio(address, inputFilteredTime ?? filteredTime)
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
        notify("success", "Refresh data!");
      }, 30000);
    }
    return () => {
      if (interval) clearInterval(interval);
      dispatch(resetPortfolioData());
    };
  }, [public_key]);

  useEffect(() => {
    if (filteredTime) {
      setPortfolioData({
        public_key,
        portfolio_context: PORTFOLIO_CONTEXT_ENUM.USER_PORTFOLIO,
        portfolio_data: undefined,
      });
      listenData(public_key, filteredTime);
    }
  }, [filteredTime]);

  if (
    !portfolioData ||
    !portfolioData.total_balance ||
    !portfolioData.chart_data ||
    !portfolioData.assets
  ) {
    return <Loader />;
  }

  return (
    <div className="mx-auto md:my-4">
      <div className="md:w-3/12">
        <CardStats
          statSubtitle="Total Balance"
          statTitle={formatTotalBalance()}
        />
      </div>

      <div className="block md:flex my-2">
        <div className="sm:w-full pt-2 sm:px-2 md:pl-8 md:w-8/12">
          <CardLineChart
            title="All chains"
            labels={getCardLineChartLabels()}
            weight={getCardLineChartWeight()}
            filteredTime={filteredTime}
            onFilterTime={(selectedOp: string) => setFilteredTime(selectedOp)}
          />
        </div>
        <div className="sm:w-full pt-12 pl-4 md:w-3/12">
          <PieChart
            title="Tokens"
            labels={getPieChartLabels()}
            weight={getPieChartWeight()}
          />
        </div>
      </div>

      <div className="py-8">
        <CardTable items={portfolioData.assets} />
      </div>
    </div>
  );
};
