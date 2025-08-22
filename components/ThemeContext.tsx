"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Optionally, load theme from localStorage or cookie
    const storedTheme =
      typeof window !== "undefined"
        ? (localStorage.getItem("theme") as Theme)
        : null;
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.remove("light", "dark");

      document.body.classList.add(`${theme}`);

      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
