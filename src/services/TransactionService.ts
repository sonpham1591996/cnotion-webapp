import { logger } from "@/shared/utils";
import axios, { AxiosResponse } from "axios";

export interface TransactionDTO {
  total: number;
  page_number: number;
  size: number;
  data: Array<{
    action: string;
    tx_hash: string;
    from_address: string;
    to_address: string;
    sender_contract_decimals: number;
    sender_name: string;
    sender_address: string;
    value: number;
  }>;
}

export const loadTransactions = (
  public_key: string,
  page_number: number,
  tx_hash?: string
) => {
  return new Promise<TransactionDTO>((resolve, reject) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_TRANSACTIONS_SERVICE_URL}/v1/transactions/search`,
        {
          public_key,
          page_number,
          tx_hash,
        }
      )
      .then((res: AxiosResponse<TransactionDTO>) => {
        return resolve(res.data);
      })
      .catch((error) => {
        logger(error);
        return reject(error);
      });
  });
};
