import { CreateWalletDto, WalletDto } from "@/shared/dto";
import { getAuthorizationHeader, logger } from "@/shared/utils";
import axios from "axios";

export const getListWallets = () => {
  return new Promise<WalletDto[]>((resolve, reject) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BO_URL}/v1/wallets`,
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

export const createTrackingWallet = (data: CreateWalletDto) => {
  return new Promise<string[]>((resolve, reject) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BO_URL}/v1/wallets`,
        data,
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
