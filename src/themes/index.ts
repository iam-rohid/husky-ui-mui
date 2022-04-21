import {
  alpha,
  Color,
  createTheme,
  darken,
  lighten,
  PaletteMode,
} from "@mui/material";
import { red } from "@mui/material/colors";

export const grey: Color = {
  "50": "#f8fafc",
  "100": "#f1f5f9",
  "200": "#e2e8f0",
  "300": "#cbd5e1",
  "400": "#94a3b8",
  "500": "#64748b",
  "600": "#475569",
  "700": "#334155",
  "800": "#1e293b",
  "900": "#0f172a",
  A100: "#f1f5f9",
  A200: "#e2e8f0",
  A400: "#94a3b8",
  A700: "#334155",
};

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
            grey: {
              "50": "#f8fafc",
              "100": "#f1f5f9",
              "200": "#e2e8f0",
              "300": "#cbd5e1",
              "400": "#94a3b8",
              "500": "#64748b",
              "600": "#475569",
              "700": "#334155",
              "800": "#1e293b",
              "900": "#0f172a",
              A100: "#f1f5f9",
              A200: "#e2e8f0",
              A400: "#94a3b8",
              A700: "#334155",
            },
            divider: grey[100],
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
            divider: grey[800],
            background: {
              default: grey[900],
              paper: grey[900],
            },
          }),
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiIconButton: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            "&:focus-visible, &:hover": {
              backgroundColor:
                theme.palette.mode === "light" ? grey[100] : grey[800],
            },
            "&:active": {
              boxShadow: `0 0 0 2px ${
                theme.palette.mode === "light" ? grey[200] : grey[700]
              }`,
            },
          }),
          colorSecondary: {},
        },
      },
      MuiMenuItem: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            "&:focus-visible, &:hover": {
              backgroundColor:
                theme.palette.mode === "light" ? grey[100] : grey[800],
            },
          }),
        },
      },
      MuiListItemButton: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            padding: theme.spacing(2, 5),
            gap: theme.spacing(5),
            "&:focus-visible, &:hover": {
              backgroundColor:
                theme.palette.mode === "light" ? grey[100] : grey[800],
              color: theme.palette.mode === "light" ? grey[900] : grey[50],
            },
          }),
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
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
          modal: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: "auto",
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: Number(theme.shape.borderRadius) * 3,
            backgroundImage: "none",
            backgroundColor: theme.palette.background.default,
            border: "1px solid",
            borderColor: theme.palette.divider,
            boxShadow: `0 4px 32px 0px ${alpha(
              "#000",
              theme.palette.mode === "dark" ? 0.5 : 0.2
            )}`,
          }),
        },
      },
    },
    spacing: 4,
    shape: {
      borderRadius: 2,
    },
  });
