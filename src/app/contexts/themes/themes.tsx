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

interface ScreenClass {
  sm: boolean;
  md: boolean;
  lg: boolean;
}

interface ThemeContextType {
  isLightMode: boolean;
  setIsLightMode: Dispatch<SetStateAction<boolean>>;
  theme: Record<string, any>;
  screenSize: ScreenClass;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState<boolean>(true);
  const [theme, setTheme] = useState<object>(light);
  const [screenSize, setScreenSize] = useState<ScreenClass>({
    sm: false,
    md: false,
    lg: true,
  });

  useEffect(() => {
    setTheme(isLightMode ? light : dark);
  }, [isLightMode]);

  const updateScreenClass = () => {
    const width = window.innerWidth;
    setScreenSize({
      sm: width < 640,
      md: width >= 640 && width < 1024,
      lg: width >= 1024,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenClass);
    updateScreenClass();

    return () => {
      window.removeEventListener("resize", updateScreenClass);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{ isLightMode, setIsLightMode, theme, screenSize }}
    >
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
