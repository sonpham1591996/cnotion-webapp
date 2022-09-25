import { useTheme } from "next-themes";
import { CSSProperties } from "react";
import DotLoader from "react-spinners/DotLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export const Loader = () => {
  const { theme } = useTheme();

  return (
    <div className="overlay">
      <div className="overlay__inner">
        <DotLoader
          loading={true}
          cssOverride={override}
          size={150}
          color={theme === "light" ? "black" : "white"}
        />
      </div>
    </div>
  );
};
