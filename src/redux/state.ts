import { Action } from "redux";


export interface AppState {
  public_key: string | undefined;
  portfolio_data:
    | {
        total_balance: number;
        assets: any;
        chart_data: Array<{
          timestamp: string;
          open: number;
          high: number;
          low: number;
          close: number;
        }>;
        profitAndLoss: {
          price_change_24h: number;
          percentage_change_24h: number;
          overall_profit_loss: number;
        };
      }
    | undefined;
}

export interface RootState {
  app: AppState;
}

export interface ReduxActionPayload extends Action {
  payload?: any;
}
