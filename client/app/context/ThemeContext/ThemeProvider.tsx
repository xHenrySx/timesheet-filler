import { useState, useEffect } from "react";
import type { ReactElement } from "react";

import { ThemeContext, ThemeContextType } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactElement;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeContextType>("mira");

  useEffect(() => {
    const lsTheme = localStorage.getItem("theme") as ThemeContextType;

    if (!lsTheme) return;
    setTheme(lsTheme);
  }, []);

  const handleSetTheme = (newTheme: ThemeContextType) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
