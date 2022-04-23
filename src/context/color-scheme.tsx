import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { createContext, ReactNode, useContext, useMemo } from "react";
import useKeyboard from "src/hooks/use-keyboard";
import useLocalstorage from "src/hooks/use-localstorage";
import { getTheme } from "src/themes";
export type ColorScheme = "light" | "dark" | "system";

export type ColorSchemeContextType = {
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
};

export const ColorSchemeContext = createContext<ColorSchemeContextType | null>(
  null
);

export type ColorScehmeProviderProps = {
  children: ReactNode;
};

const ColorScehmeProvider = ({ children }: ColorScehmeProviderProps) => {
  const [colorScheme, setColorScheme] = useLocalstorage<ColorScheme>(
    "system",
    "color-scheme"
  );
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    if (colorScheme === "light") {
      return getTheme("light");
    } else if (colorScheme === "dark") {
      return getTheme("dark");
    } else {
      return getTheme(prefersDarkMode ? "dark" : "light");
    }
  }, [colorScheme, prefersDarkMode]);

  useKeyboard("b", {
    metaKey: true,
    onKeyDown: (e) => {
      e.preventDefault();
      setColorScheme(
        colorScheme === "light"
          ? "dark"
          : colorScheme === "dark"
          ? "system"
          : "light"
      );
    },
  });

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={(theme) => ({
            ":root": {
              colorScheme: theme.palette.mode,
            },
          })}
        />
        {children}
      </ThemeProvider>
    </ColorSchemeContext.Provider>
  );
};

export default ColorScehmeProvider;

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (context === null) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  }

  return context;
};
