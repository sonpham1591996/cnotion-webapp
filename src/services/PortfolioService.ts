import { logger } from "@/shared/utils";
import axios from "axios";

export const loadPortfolio = (address: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BO_URL}/v1/portfolio/network/56/address/${address}/balances`
      )
      .then((res) => {
        return resolve(res.data);
      })
      .catch((error) => {
        logger(error);
        return reject(error);
      });
  });
};
