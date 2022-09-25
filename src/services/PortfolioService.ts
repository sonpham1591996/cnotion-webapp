import { getAuthorizationHeader, logger } from "@/shared/utils";
import axios from "axios";

export const loadPortfolio = (
  filtered_time: string = "7d",
  address?: string
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BO_URL}/v1/portfolio/`,
        {
          address,
          filtered_time,
        },
        getAuthorizationHeader()
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
