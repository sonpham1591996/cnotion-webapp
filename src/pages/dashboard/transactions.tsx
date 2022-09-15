import { Loader } from "@/components/Loader";
import {
  loadTransactions,
  TransactionDTO,
} from "@/services/TransactionService";
import { shorttenString } from "@/shared/utils";
import { Main } from "@/templates/Main";
import { useAddress } from "@thirdweb-dev/react";
import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface SearchFormData {
  transactionHash: string;
}

const Transactions: NextPage = () => {
  const address = useAddress();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TransactionDTO | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SearchFormData>();

  const onSubmit = (data: SearchFormData) => {
    loadTransactions(address!, 1, data.transactionHash).then(
      (transactionDto: TransactionDTO) => {
        setData(transactionDto);
        setPageNumber(transactionDto.page_number);
      }
    );
  };

  useEffect(() => {
    if (loading && address && !data) {
      loadTransactions(address, 1)
        .then((transactionDto: TransactionDTO) => {
          setData(transactionDto);
          setPageNumber(transactionDto.page_number);
          setLoading(false);
        })
        .catch((_) => {
          setLoading(false);
        });
    }
  }, [address, data]);

  if (loading) return <Loader />;

  if (!address) {
    Router.push("/dashboard/portfolio");
    return <></>;
  }

  return (
    <Main meta="Transaction History | CNotion">
      <div className="my-8 h-screen">
        <div className="title text-3xl font-bold">Transaction History</div>
        <div className="search-box mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="transactionHash"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Transaction Hash
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                id="transactionHash"
                type="search"
                onChange={(event) =>
                  setValue("transactionHash", event.target.value)
                }
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
            <div>
              {errors.transactionHash && (
                <span className="text-red-500 ml-2">
                  {errors.transactionHash.message}
                </span>
              )}
            </div>
          </form>
        </div>
        <div className="overflow-x-auto">
          <div className="w-full flex items-center justify-center overflow-hidden my-8">
            <div className="w-full">
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr className="uppercase text-lg leading-normal overflow-x-auto">
                      <th className="py-3 px-6 text-left">Transaction Hash</th>
                      <th className="py-3 px-6 text-left">Wallet</th>
                      <th className="py-3 px-6 text-left">Action</th>
                      <th className="py-3 px-6 text-left">Send</th>
                      <th className="py-3 px-6 text-left">Token</th>
                      <th className="py-3 px-6 text-left">Receive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data.map((transaction, index) => {
                      return (
                        <tr className="border-b" key={index}>
                          <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                            <a
                              className="text-blue-500"
                              href={transaction.tx_hash}
                              target="_blank"
                            >
                              <span
                                className="ml-3 font-800"
                                title={transaction.tx_hash.substring(
                                  transaction.tx_hash.lastIndexOf("/") + 1
                                )}
                              >
                                {shorttenString(
                                  transaction.tx_hash.substring(
                                    transaction.tx_hash.lastIndexOf("/") + 1
                                  )
                                )}
                              </span>
                            </a>
                          </td>
                          <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                            <span
                              className="ml-3 font-800"
                              title={transaction.from_address}
                            >
                              {transaction.from_address.slice(0, 8)}...
                              {transaction.from_address.slice(8, 16)}
                            </span>
                          </td>
                          <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                            <span
                              className="ml-3 font-800"
                              title={transaction.action}
                            >
                              {transaction.action}
                            </span>
                          </td>
                          <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                            <span className="ml-3 font-800">
                              {transaction.value}
                            </span>
                          </td>
                          <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                            <span
                              className="ml-3 font-800"
                              title={transaction.sender_name}
                            >
                              {transaction.sender_name}
                            </span>
                          </td>
                          <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                            <span
                              className="ml-3 font-800"
                              title={transaction.to_address}
                            >
                              {transaction.to_address.slice(0, 8)}...
                              {transaction.to_address.slice(8, 16)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {Math.ceil((data?.total ?? 0) / (data?.size ?? 1)) > 2 && (
          <div className="flex justify-end">
            <a
              onClick={() => {
                if (pageNumber > 1) {
                  setPageNumber((prev) => prev--);
                }
              }}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>

            <a
              onClick={() => {
                if (pageNumber < (data?.total ?? 0)) {
                  setPageNumber((prev) => prev++);
                }
              }}
              className="inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </div>
        )}
      </div>
    </Main>
  );
};

export default Transactions;
