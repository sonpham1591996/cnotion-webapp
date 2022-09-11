import { FC } from "react";

export interface CardTableProps {
  title?: string;
  items: any;
}

export const CardTable: FC<CardTableProps> = ({
  title,
  items,
}: CardTableProps) => {
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg">
              {title ?? "Wallet Assets"}
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <td className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                NAME
              </td>
              <td className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                SYMBOL
              </td>
              <td className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                PRICE
              </td>
              <td className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                BALANCE
              </td>
              <td className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                VALUE
              </td>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span className="ml-3 font-800">{item.token_name}</span>
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span className="ml-3 font-800">{item.symbol}</span>
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span className="ml-3 font-800">{item.price}</span>
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span className="ml-3 font-800">{item.balance}</span>
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span className="ml-3 font-800">{item.quote}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
