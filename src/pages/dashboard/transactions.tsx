import { Loader } from "@/components/Loader";
import {
  loadTransactions,
  TransactionDTO,
} from "@/services/TransactionService";
import { Main } from "@/templates/Main";
import { useWeb3 } from "@3rdweb/hooks";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Transactions: NextPage = () => {
  const { address } = useWeb3();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TransactionDTO | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (loading && address && !data) {
      loadTransactions(address!, 1)
        .then((transactionDto: TransactionDTO) => {
          setData(transactionDto);
          setPageNumber(transactionDto.page_number);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [address, data]);

  if (loading) return <Loader />;

  return (
    <Main meta="Transaction History | CNotion">
      <div className="my-8">
        <div className="title text-3xl font-bold">Transaction History</div>
        <div className="search-box"></div>
        <div className="overflow-x-auto">
          <div className="w-full flex items-center justify-center overflow-hidden my-8">
            <div className="w-full">
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr className="uppercase text-lg leading-normal overflow-x-auto">
                      <th className="py-3 px-6 text-center">
                        Transaction Hash
                      </th>
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
                            <span
                              className="ml-3 font-800"
                              title={transaction.tx_hash}
                            >
                              {transaction.tx_hash.slice(0, 12)}...
                              {transaction.tx_hash.slice(12, 24)}
                            </span>
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
