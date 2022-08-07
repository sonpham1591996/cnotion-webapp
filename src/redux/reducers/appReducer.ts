import { RESET_PORTFOLIO_DATA, SET_PORTFOLIO_DATA } from "../actions/appAction";
import {
  AppState,
  PORTFOLIO_CONTEXT_ENUM,
  ReduxActionPayload,
  RootState,
} from "../state";

export const getPortfolioContext = (state: RootState) => {
  return state.app.portfolio_context;
};

export const getPortfolioData = (state: RootState) => {
  return state.app.portfolio_data;
};

export const getPublicKey = (state: RootState) => {
  return state.app.public_key;
};

const initializeState: AppState = {
  public_key: "",
  portfolio_context: PORTFOLIO_CONTEXT_ENUM.FORM,
  portfolio_data: undefined,
};

const appReducer = (state = initializeState, action: ReduxActionPayload) => {
  switch (action.type) {
    case SET_PORTFOLIO_DATA:
      return { ...state, ...action.payload };
    case RESET_PORTFOLIO_DATA:
      return {
        portfolio_context: PORTFOLIO_CONTEXT_ENUM.FORM,
        portfolio_data: undefined,
      };
    default:
      return { ...state };
  }
};

export default appReducer;
