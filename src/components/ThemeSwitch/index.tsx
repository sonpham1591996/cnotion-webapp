import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <DarkModeSwitch
      style={{ marginBottom: "2rem" }}
      checked={theme === "dark"}
      onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      size={24}
    />
  );
};
