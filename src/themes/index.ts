import { createTheme, PaletteMode } from "@mui/material";
import { red } from "@mui/material/colors";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#556cd6",
            },
            secondary: {
              main: "#19857b",
            },
            error: {
              main: red.A400,
            },
            divider: "#f1f5f9",
            background: {
              default: "#fff",
              paper: "#fff",
            },
          }
        : {
            primary: {
              main: "#556cd6",
            },
            secondary: {
              main: "#19857b",
            },
            error: {
              main: red.A400,
            },
            divider: "#1e293b",
            background: {
              default: "#0f172a",
              paper: "#0f172a",
            },
          }),
    },

    components: {
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            boxShadow: "none",
          },
          paper: {
            boxShadow: "none",
          },
        },
      },
    },
    spacing: 4,
  });
