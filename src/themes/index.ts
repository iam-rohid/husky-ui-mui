import { alpha, createTheme, PaletteMode } from "@mui/material";
import {
  fuchsia,
  green,
  grey,
  indigo,
  red,
  sky,
  white,
  yellow,
} from "./colors";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              ...indigo,
              light: indigo[400],
              main: indigo[500],
              dark: indigo[600],
              contrastText: grey[50],
            },
            secondary: {
              ...fuchsia,
              light: fuchsia[400],
              main: fuchsia[500],
              dark: fuchsia[600],
              contrastText: grey[50],
            },
            error: {
              ...red,
              light: red[400],
              main: red[500],
              dark: red[600],
              contrastText: grey[50],
            },
            success: {
              ...green,
              light: green[400],
              main: green[500],
              dark: green[600],
              contrastText: grey[50],
            },
            info: {
              ...sky,
              light: sky[400],
              main: sky[500],
              dark: sky[600],
              contrastText: grey[50],
            },
            warning: {
              ...yellow,
              light: yellow[400],
              main: yellow[500],
              dark: yellow[600],
              contrastText: grey[50],
            },
            grey: {
              ...grey,
            },
            divider: grey[100],
            background: {
              default: white,
              paper: white,
            },
          }
        : {
            primary: {
              ...indigo,
              light: indigo[300],
              main: indigo[400],
              dark: indigo[500],
              contrastText: grey[800],
            },
            secondary: {
              ...fuchsia,
              main: fuchsia[400],
              light: fuchsia[300],
              dark: fuchsia[500],
              contrastText: grey[800],
            },
            error: {
              ...red,
              main: red[400],
              light: red[300],
              dark: red[500],
              contrastText: grey[800],
            },
            success: {
              ...green,
              main: green[400],
              light: green[300],
              dark: green[500],
              contrastText: grey[800],
            },
            info: {
              ...sky,
              main: sky[400],
              light: sky[300],
              dark: sky[500],
              contrastText: grey[800],
            },
            warning: {
              ...yellow,
              main: yellow[400],
              light: yellow[300],
              dark: yellow[500],
              contrastText: grey[800],
            },
            grey: {
              ...grey,
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
            transition: "none",
            borderRadius: `${theme.shape.borderRadius}px`,
            "&:focus-visible, &:hover": {
              backgroundColor:
                theme.palette.mode === "light" ? grey[50] : grey[800],
              boxShadow: `0 0 0 1px ${theme.palette.divider}`,
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
                theme.palette.mode === "light" ? grey[50] : grey[800],
            },
            "&.Mui-selected": {
              backgroundColor:
                theme.palette.mode === "light" ? grey[50] : grey[800],
              "&:focus-visible, &:hover": {
                backgroundColor:
                  theme.palette.mode === "light" ? grey[50] : grey[800],
              },
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
            padding: theme.spacing(1.5, 5),
            gap: theme.spacing(5),
            transition: "none",
            "&:focus-visible, &:hover": {
              backgroundColor:
                theme.palette.mode === "light" ? grey[50] : grey[800],
            },
            "&.Mui-selected": {
              backgroundColor:
                theme.palette.mode === "light" ? grey[50] : grey[800],
              "&:focus-visible, &:hover": {
                backgroundColor:
                  theme.palette.mode === "light" ? grey[50] : grey[800],
              },
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
            transition: "background-color 0.3s, backdrop-filter 0.3s",
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
            backgroundImage: "none",
            backgroundColor: theme.palette.background.paper,
            boxShadow: `0 0 0 1px ${theme.palette.divider}`,
          }),
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: `0 0 0 1px ${theme.palette.divider}`,
            transition: "none",
          }),
        },
      },
      MuiContainer: {
        defaultProps: {
          sx: {
            px: [4, 6],
          },
          maxWidth: "xl",
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
          }),
        },
      },
      MuiAppBar: {
        defaultProps: {
          color: "default",
        },
        styleOverrides: {
          root: ({ theme }) => ({
            paddingBlock: theme.spacing(1),
          }),
          colorDefault: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.background.default, 0.5),
            backdropFilter: "blur(10px)",
            backgroundImage: "none",
          }),
        },
      },
      MuiToolbar: {
        defaultProps: {
          disableGutters: true,
          variant: "dense",
        },
      },
    },
    spacing: 4,
    shape: {
      borderRadius: 8,
    },
  });
