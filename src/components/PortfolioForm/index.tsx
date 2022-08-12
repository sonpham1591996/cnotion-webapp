import { setPortfolioData } from "@/redux/actions/appAction";
import { PORTFOLIO_CONTEXT_ENUM } from "@/redux/state";
import { loadPortfolio } from "@/services/PortfolioService";
import {
  getLocalStorage,
  logger,
  PORTFOLIO_HISTORY_STORAGE_KEY,
  setLocalStorage,
  validateAddress,
} from "@/shared/utils";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Loader } from "../Loader";

type PortfolioFormData = {
  address: string;
};

export const PortfolioForm: FC = () => {
  const { handleSubmit, register, formState, setError, setValue } =
    useForm<PortfolioFormData>({
      defaultValues: {
        address: "",
      },
    });
  const dispatch = useDispatch();
  const [disableBtnSubmit, setDisabledBtnSubmit] = useState(false);
  const [historyPortfolio, setHistoryPortfolio] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const handleData = (data: any, public_key: string) => {
    setLocalStorage(
      PORTFOLIO_HISTORY_STORAGE_KEY,
      (() => {
        const oldValue = getLocalStorage(PORTFOLIO_HISTORY_STORAGE_KEY)
          ? JSON.parse(getLocalStorage(PORTFOLIO_HISTORY_STORAGE_KEY)!)
          : [];
        const index = oldValue.indexOf(public_key);
        if (index >= 0) {
          oldValue.splice(index, 1);
          oldValue.unshift(public_key);
          return JSON.stringify(oldValue);
        }
        oldValue.unshift(public_key);
        return JSON.stringify(oldValue);
      })()
    );
    dispatch(
      setPortfolioData({
        portfolio_context: PORTFOLIO_CONTEXT_ENUM.USER_PORTFOLIO,
        portfolio_data: data && data !== "" ? data : undefined,
        public_key,
      })
    );
  };

  const onSubmit = (data: PortfolioFormData) => {
    if (!data.address || !validateAddress(data.address)) {
      setError("address", { message: "Invalid address" });
      return;
    }
    setDisabledBtnSubmit(true);
    setLoading(true);
    loadPortfolio(data.address)
      .then((d: any) => {
        setLoading(false);
        handleData(d, data.address);
      })
      .catch((error: any) => {
        logger(error?.message);
        setDisabledBtnSubmit(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!historyPortfolio) {
      setHistoryPortfolio(
        JSON.parse(getLocalStorage(PORTFOLIO_HISTORY_STORAGE_KEY) ?? "[]")
      );
    }
  }, [historyPortfolio]);

  if (loading) return <Loader />;

  return (
    <div className="flex justify-center mt-16 md:mt-40">
      <form className="bg-white shadow-md rounded md:w-8/12 px-16 py-16">
        <div className="flex justify-center">
          <div className="text-3xl font-bold">YOUR PORTFOLIO FORM</div>
        </div>
        <div className="mt-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="bsc_address"
          >
            BSC Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bsc_address"
            type="text"
            placeholder="BSC Address"
            {...register("address", { required: "The field is required" })}
          />
          {formState.errors.address && (
            <span className="text-red-600 mt-2">
              {formState.errors.address.message}
            </span>
          )}
        </div>
        <div className="flex flex-wrap flex-row flex-grow my-4 cursor-pointer">
          {(historyPortfolio ?? []).map((h: string, index: number) => {
            return (
              <div
                key={index}
                className="text-xs px-4 py-2 bg-gray-200 text-gray-800 rounded-full mr-4 my-1"
                onClick={() => setValue("address", h)}
              >
                {h}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={disableBtnSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
