import {
  Computer,
  DarkMode,
  LightMode,
  Menu,
  Notifications,
  Person,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Container,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Fragment } from "react";
import { useColorScheme } from "../../context/color-scheme";

export type DashboardHeaderProps = {
  title: string;
  sidebarCompact: boolean;
  setSidebarCompact: (compact: boolean) => void;
  showSidbarOnMobile: boolean;
  setShowSidbarOnMobile: (compact: boolean) => void;
};

export const DashboardHeader = ({
  title,
  sidebarCompact: compactSidebar,
  setSidebarCompact,
  showSidbarOnMobile,
  setShowSidbarOnMobile,
}: DashboardHeaderProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const { colorScheme, setColorScheme } = useColorScheme();

  const themeToggleButton = (
    <IconButton
      size="large"
      edge="end"
      onClick={() => {
        if (colorScheme === "light") {
          setColorScheme("dark");
        } else if (colorScheme === "dark") {
          setColorScheme("system");
        } else {
          setColorScheme("light");
        }
      }}
    >
      {colorScheme === "light" ? (
        <LightMode />
      ) : colorScheme === "dark" ? (
        <DarkMode />
      ) : (
        <Computer />
      )}
    </IconButton>
  );

  const actions = (
    <Fragment>
      <IconButton size="large" edge="end">
        <Notifications />
      </IconButton>
      {themeToggleButton}
      <IconButton size="large" edge="end">
        <Person />
      </IconButton>
    </Fragment>
  );

  return (
    <Box
      component="header"
      sx={(theme) => ({
        position: "sticky",
        top: 0,
        zIndex: theme.zIndex.appBar,
        bgcolor: alpha(theme.palette.background.default, 0.75),
        backdropFilter: "blur(10px)",
        boxShadow: `0 1px 0 0 ${theme.palette.divider}`,
      })}
    >
      <Container
        maxWidth="xl"
        sx={(theme) => ({
          display: "flex",
          flexdirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          height: theme.spacing(14),
          gap: theme.spacing(2),
        })}
      >
        <IconButton
          size="large"
          onClick={() => {
            if (isMobile) {
              setShowSidbarOnMobile(!showSidbarOnMobile);
            } else {
              setSidebarCompact(!compactSidebar);
            }
          }}
          edge="start"
        >
          <Menu />
        </IconButton>
        <Typography
          variant="h1"
          sx={(theme) => ({
            fontSize: theme.spacing(5),
            fontWeight: "500",
            flexGrow: 1,
          })}
        >
          {title}
        </Typography>
        {actions}
      </Container>
    </Box>
  );
};

export default DashboardHeader;
