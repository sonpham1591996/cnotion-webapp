import { logger } from "@/shared/utils";
import axios from "axios";

export const login = (data: { address: string; nonce: string }) => {
  return new Promise<string>((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BO_URL}/v1/users`, data)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((error) => {
        logger(error);
        return reject(error);
      });
  });
};
