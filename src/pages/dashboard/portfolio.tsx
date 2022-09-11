import { PortfolioForm } from "@/components/PortfolioForm";
import { UserPortfolio } from "@/components/UserPortfolio";
import { getPortfolioContext } from "@/redux/reducers/appReducer";
import { PORTFOLIO_CONTEXT_ENUM } from "@/redux/state";
import { Main } from "@/templates/Main";
import { NextPage } from "next";
import { useSelector } from "react-redux";

const PortfolioPage: NextPage = () => {
  const context = useSelector(getPortfolioContext);

  if (context === PORTFOLIO_CONTEXT_ENUM.FORM) {
    return (
      <Main meta="Portfolio Form | CNotion">
        <PortfolioForm />
      </Main>
    );
  }

  if (context === PORTFOLIO_CONTEXT_ENUM.USER_PORTFOLIO) {
    return (
      <Main meta="User Portfolio | CNotion">
        <UserPortfolio />
      </Main>
    );
  }

  return null;
};

export default PortfolioPage;
