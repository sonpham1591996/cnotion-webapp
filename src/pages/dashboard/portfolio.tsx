import { UserPortfolio } from "@/components/UserPortfolio";
import { Main } from "@/templates/Main";
import { NextPage } from "next";

const PortfolioPage: NextPage = () => {
  return (
    <Main meta="Portfolio | CNotion">
      <div className="md:px-40">
        <UserPortfolio />
      </div>
    </Main>
  );
};

export default PortfolioPage;
