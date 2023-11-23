import TrackingUserWallet from "@/components/TrackingUserWallet";
import { TrackingWalletForm } from "@/components/TrackingWalletForm";
import TrackingWalletContext from "@/contexts/TrackingWalletContext";
import { getListWallets } from "@/services/WalletService";
import { WalletDto } from "@/shared/dto";
import { shortenString } from "@/shared/utils";
import { Main } from "@/templates/Main";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

const Wallets: NextPage = () => {
  const [listWallets, setListWallets] = useState<WalletDto[] | null>(null);
  const [showNewWalletModal, setNewWalletModal] = useState(false);
  const onAddClicked = () => setNewWalletModal(true);
  const [publicAddress, setPublicAddress] = useState<string | null>(null);

  const getListTrackingWallets = useCallback(() => {
    getListWallets().then((data: WalletDto[]) => {
      setListWallets(data);
    });
  }, []);

  useEffect(() => {
    getListTrackingWallets();
  }, []);

  return (
    <Main meta="Wallets | CNotion">
      <TrackingWalletContext.Provider
        value={{ publicAddress, setPublicAddress }}
      >
        <div className="flex">
          <div
            className="border-r h-screen"
            style={{ width: "220px", maxWidth: "220px", overflow: "hidden" }}
          >
            <div className="flex aligns-center border-b">
              <div className="text-sm font-bold mt-2">Wallets</div>
              <button
                className="border rounded-md ml-auto hover:bg-gray-800 hover:cursor-pointer hover:text-white mr-2 mb-2 flex items-center justify-center px-2 py-1"
                onClick={() => onAddClicked()}
              >
                +
              </button>
            </div>
            <ul>
              {(listWallets ?? []).map((wallet, index) => {
                return (
                  <li
                    key={index}
                    className={`p-2 hover:cursor-pointer border-b ${
                      publicAddress === wallet.tracking_wallet_address
                        ? "bg-gray-800 text-white font-bold"
                        : "hover:bg-gray-300"
                    }`}
                    onClick={() => {
                      setPublicAddress(wallet.tracking_wallet_address);
                    }}
                  >
                    <div>
                      <div className="text-lg font-bold" title={wallet.alias}>
                        {wallet.alias}
                      </div>
                      <div
                        className="text-md text-overflow-hidden"
                        title={wallet.tracking_wallet_address}
                      >
                        {shortenString(wallet.tracking_wallet_address)}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className="px-8 overflow-x-hidden"
            style={{ width: "calc(100% - 90px)" }}
          >
            <TrackingUserWallet />
          </div>
        </div>
        {showNewWalletModal && (
          <div
            id="authentication-modal"
            data-modal-placement="top-left"
            tabIndex={-1}
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
          >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto mx-auto mt-20">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={() => setNewWalletModal(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="py-4 px-10">
                  <TrackingWalletForm
                    onSuccess={() => {
                      getListTrackingWallets();
                      setNewWalletModal(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </TrackingWalletContext.Provider>
    </Main>
  );
};

export default Wallets;
