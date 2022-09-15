import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const EnumChainId = {
  BSC: 56,
  ETH: 1,
  POLYGON: 137,
};

export const EnumWallet = {
  METAMASK: "METAMASK",
  TRUSTWALLET: "TRUSTWALLET",
  WALLETCONNECT: "WALLETCONNET",
};

const injected = new InjectedConnector({
  supportedChainIds: [EnumChainId.BSC],
});

const walletconnect = new WalletConnectConnector({
  rpc: {
    [EnumChainId.BSC]: "https://bsc-dataseed4.binance.org/",
  },
  qrcode: true,
});

let to_export = {
  [EnumWallet.METAMASK]: injected,
  [EnumWallet.TRUSTWALLET]: walletconnect,
  [EnumWallet.WALLETCONNECT]: walletconnect,
};
export default to_export;
