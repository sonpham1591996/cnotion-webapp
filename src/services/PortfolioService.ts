import { logger } from "@/shared/utils";
import axios from "axios";

export const loadPortfolio = (address: string, filtered_time: string = "7d") => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BO_URL}/v1/portfolio/address/${address}/${filtered_time}`
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
