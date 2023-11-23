import { createTrackingWallet } from "@/services/WalletService";
import { logger } from "@/shared/utils";
import { useAddress } from "@thirdweb-dev/react";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface TrackingWalletFormData {
  tracking_wallet_address: string;
  alias: string;
  notes: string;
}

export const TrackingWalletForm: FC<{
  onSuccess: Function;
}> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackingWalletFormData>({
    defaultValues: {
      tracking_wallet_address: "",
      alias: "",
      notes: "",
    },
  });
  const address = useAddress();

  const onSubmit = (data: TrackingWalletFormData) => {
    if (address) {
      createTrackingWallet(data)
        .then((_) => {
          onSuccess();
        })
        .catch(logger);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-2">
        <label
          htmlFor="tracking_wallet_address"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Tracking address
        </label>
        <input
          type="text"
          id="tracking_wallet_address"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tracking address"
          {...register("tracking_wallet_address", {
            required: "This field is required",
          })}
        />
        {errors.tracking_wallet_address?.message && (
          <span className="text-red-500">
            {errors.tracking_wallet_address.message}
          </span>
        )}
      </div>
      <div className="my-2">
        <label
          htmlFor="alias"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Alias
        </label>
        <input
          type="text"
          id="alias"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Alias"
          {...register("alias", {
            required: "This field is required",
          })}
        />
        {errors.alias?.message && (
          <span className="text-red-500">{errors.alias.message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor="notes"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Notes
        </label>
        <input
          type="text"
          id="notes"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Notes"
          {...register("notes")}
        />
      </div>
      <button
        type="submit"
        className="my-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};
