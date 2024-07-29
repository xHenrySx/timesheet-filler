import { createContext } from "react";
export type ThemeContextType = "mira" | "arya-blue";

export const ThemeContext = createContext<{
  theme: ThemeContextType;
  setTheme: (theme: ThemeContextType) => void;
}>({ theme: "mira", setTheme: () => {} });
