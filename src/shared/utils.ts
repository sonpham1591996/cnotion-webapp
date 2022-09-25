import web3 from "web3";

export const PORTFOLIO_HISTORY_STORAGE_KEY = "portfolio-history";

export const setLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getLocalStorage = (key: string) => localStorage.getItem(key);

export function prettyDate(time: string) {
  var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
    diff = (new Date().getTime() - date.getTime()) / 1000,
    day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return "";

  return `${
    (day_diff == 0 &&
      ((diff < 60 && "just now") ||
        (diff < 120 && "1 minute ago") ||
        (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
        (diff < 7200 && "1 hour ago") ||
        (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))) ||
    (day_diff == 1 && "Yesterday") ||
    (day_diff < 7 && day_diff + " days ago") ||
    (day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago")
  }`;
}

export function validateAddress(address: string): boolean {
  return web3.utils.isAddress(address);
}

export function logger(message: string) {
  return process.env.NODE_ENV === "development" ? console.log(message) : "";
}

export function shortenString(value: string) {
  return `${value.slice(0, 8)}...${value.slice(16, 24)}`;
}

export const getCardLineChartLabels = (portfolioData: any) =>
  portfolioData && portfolioData.chart_data
    ? portfolioData.chart_data.map((d: any) =>
        new Date(d.timestamp).toISOString().slice(0, 10)
      )
    : [];

export const getCardLineChartWeight = (portfolioData: any) =>
  portfolioData && portfolioData.chart_data
    ? portfolioData.chart_data.map((d: any) => d.value)
    : [];

export const getPieChartLabels = (portfolioData: any) =>
  portfolioData && portfolioData.assets
    ? portfolioData.assets
        .map((d: any) => (d.pie_chart_percentage > 0 ? d.token_name : null))
        .filter((l: string) => !!l)
    : [];

export const getPieChartWeight = (portfolioData: any) =>
  portfolioData && portfolioData.assets
    ? portfolioData.assets.map((d: any) => d.pie_chart_percentage)
    : [];

export const formatTotalBalance = (portfolioData: any) => {
  return portfolioData ? `${portfolioData.total_balance.toFixed(2)} USD` : "";
};

export const getAuthorizationHeader = () => {
  return {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
};
