import { createContext } from "react";

const defaultValue = {
  currentTheme: "light",
  changeCurrentTheme: (_: "light" | "dark") => {},
};

const ThemeContext = createContext(defaultValue);

export default ThemeContext;
