import { logger } from "@/shared/utils";
import axios from "axios";

export const loadCryptoNews = (page_number: number) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BO_URL}/v1/news`, { page_number })
      .then((res) => {
        return resolve(res.data);
      })
      .catch((error) => {
        logger(error);
        return reject(error);
      });
  });
};
