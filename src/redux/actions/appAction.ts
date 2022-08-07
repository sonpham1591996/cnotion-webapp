import { AppState } from "../state";

export const SET_PORTFOLIO_DATA = "SET_PORTFOLIO_DATA";
export const RESET_PORTFOLIO_DATA = "RESET_PORTFOLIO_DATA";

export const setPortfolioData = (payload: AppState) => ({
  type: SET_PORTFOLIO_DATA,
  payload,
});


export const resetPortfolioData = () => ({
  type: RESET_PORTFOLIO_DATA,
});
