import { createContext, useState, useContext, ReactNode } from "react";

// Define a type for the context value
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Load the theme from localStorage or default to false (light mode)
  const storedTheme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (!storedTheme) return false;
    try {
      return JSON.parse(storedTheme);
    } catch {
      // Handle legacy string values like "light" or "dark"
      return storedTheme === "dark";
    }
  });

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    localStorage.setItem("theme", JSON.stringify(newMode));
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
