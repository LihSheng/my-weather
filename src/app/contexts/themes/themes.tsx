import { light } from "@/app/themes/light";
import { dark } from "@/app/themes/dark";
import {
  type FC,
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface ThemeContextType {
  isLightMode: boolean;
  setIsLightMode: Dispatch<SetStateAction<boolean>>;
  theme: Record<string, any>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState<boolean>(true);

  const [theme, setTheme] = useState<object>(light);

  useEffect(() => {
    setTheme(isLightMode ? light : dark);
  }, [isLightMode]);

  return (
    <ThemeContext.Provider value={{ isLightMode, setIsLightMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
