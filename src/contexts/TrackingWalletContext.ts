import { createContext } from "react";

const defaultValue: {publicAddress: string | null, setPublicAddress: Function} = {
  publicAddress: null,
  setPublicAddress: Function
};

const TrackingWalletContext = createContext(defaultValue);

export default TrackingWalletContext;
