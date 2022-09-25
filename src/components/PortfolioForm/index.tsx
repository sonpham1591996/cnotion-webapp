import { setPortfolioData } from "@/redux/actions/appAction";
import { validateAddress } from "@/shared/utils";
import { useAddress } from "@thirdweb-dev/react";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ConnectWallet } from "../ConnectWallet";

type PortfolioFormData = {
  address: string;
};

export const PortfolioForm: FC = () => {
  const address = useAddress();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const onSubmit = (data: PortfolioFormData) => {
    if (!data.address || !validateAddress(data.address)) {
      return;
    }
    setLoading(false);
    dispatch(
      setPortfolioData({
        portfolio_data: undefined,
        public_key: data.address,
      })
    );
  };

  useEffect(() => {
    if (loading && address) {
      onSubmit({ address: address });
      setLoading(false);
    }
  }, [loading, address]);

  return <ConnectWallet />;
};
