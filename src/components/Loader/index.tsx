import { CSSProperties } from "react";
import DotLoader from "react-spinners/DotLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export const Loader = () => {
  return (
    <div className="overlay">
      <div className="overlay__inner">
        <DotLoader loading={true} cssOverride={override} size={150} />
      </div>
    </div>
  );
};
