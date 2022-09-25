import { ListTransactions } from "@/components/ListTransactions";
import { Main } from "@/templates/Main";
import { useAddress } from "@thirdweb-dev/react";
import { NextPage } from "next";

const Transactions: NextPage = () => {
  const address = useAddress();

  return (
    <Main meta="Transaction History | CNotion">
      <div className="my-8 h-screen px-10">
        <ListTransactions address={address} showSearchBox={true} />
      </div>
    </Main>
  );
};

export default Transactions;
