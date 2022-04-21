import {
  Computer,
  DarkMode,
  LightMode,
  Logout,
  Menu as MenuIcon,
  Notifications,
  Person,
  Search,
  Settings,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Container,
  IconButton,
  InputBase,
  MenuItem,
  Theme,
  Typography,
  useMediaQuery,
  Menu,
  ListItemIcon,
  Divider,
  ListItemText,
} from "@mui/material";
import { useState, MouseEvent, useMemo } from "react";
import { useColorScheme } from "../../context/color-scheme";
import { grey } from "../../themes";

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
  const [menuButtonAnchorEl, setMenuButtonAnchorEl] =
    useState<HTMLElement | null>(null);
  const [userMenuButtonAnchorEl, setUserMenuButtonAnchorEl] =
    useState<HTMLElement | null>(null);

  const colorSchemeMenuOpen = useMemo(
    () => Boolean(menuButtonAnchorEl),
    [menuButtonAnchorEl]
  );
  const userMenuOpen = useMemo(
    () => Boolean(userMenuButtonAnchorEl),
    [userMenuButtonAnchorEl]
  );

  const handleColorSchemeMenuButtonClick = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    setMenuButtonAnchorEl(e.currentTarget);
  };
  const handleColorSchemeMenuClose = () => {
    setMenuButtonAnchorEl(null);
  };
  const handleUserMenuButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setUserMenuButtonAnchorEl(e.currentTarget);
  };
  const handleUserMenuClose = () => {
    setUserMenuButtonAnchorEl(null);
  };

  const themeToggleButton = (
    <>
      <IconButton onClick={handleColorSchemeMenuButtonClick}>
        {colorScheme === "light" ? (
          <LightMode />
        ) : colorScheme === "dark" ? (
          <DarkMode />
        ) : (
          <Computer />
        )}
      </IconButton>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={menuButtonAnchorEl}
        open={colorSchemeMenuOpen}
        onClose={handleColorSchemeMenuClose}
      >
        <MenuItem
          onClick={() => {
            setColorScheme("light");
            handleColorSchemeMenuClose();
          }}
        >
          <ListItemIcon>
            <LightMode />
          </ListItemIcon>
          Light
        </MenuItem>
        <MenuItem
          onClick={() => {
            setColorScheme("dark");
            handleColorSchemeMenuClose();
          }}
        >
          <ListItemIcon>
            <DarkMode />
          </ListItemIcon>
          Dark
        </MenuItem>
        <MenuItem
          onClick={() => {
            setColorScheme("system");
            handleColorSchemeMenuClose();
          }}
        >
          <ListItemIcon>
            <Computer />
          </ListItemIcon>
          System
        </MenuItem>
      </Menu>
    </>
  );
  const userMenuButton = (
    <>
      <IconButton onClick={handleUserMenuButtonClick}>
        <Person />
      </IconButton>
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={userMenuButtonAnchorEl}
        open={userMenuOpen}
        onClose={handleUserMenuClose}
        MenuListProps={{
          sx: (theme) => ({
            minWidth: theme.spacing(44),
          }),
        }}
      >
        <MenuItem
          onClick={() => {
            handleUserMenuClose();
          }}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleUserMenuClose();
          }}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleUserMenuClose();
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );

  const searchBar = isMobile ? (
    <IconButton>
      <Search />
    </IconButton>
  ) : (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <label htmlFor="search-input">
        <Search
          sx={(theme) => ({
            position: "absolute",
            left: theme.spacing(2),
            zIndex: 1,
            top: "50%",
            transform: "translateY(-50%)",
            color: theme.palette.mode === "light" ? grey[500] : grey[400],
          })}
        />
      </label>
      <InputBase
        id="search-input"
        placeholder="Search..."
        inputProps={{}}
        sx={(theme) => ({
          bgcolor: theme.palette.mode === "light" ? grey[100] : grey[800],
          "&:focus-within": {
            boxShadow: `0 0 0 2px ${
              theme.palette.mode === "light" ? grey[200] : grey[700]
            }`,
          },
          "& input::placeholder": {
            color: theme.palette.mode === "light" ? grey[500] : grey[400],
            opacity: 1,
          },
          paddingRight: theme.spacing(4),
          paddingLeft: theme.spacing(10),
          height: theme.spacing(9),
          borderRadius: `${theme.shape.borderRadius}px`,
        })}
      />
    </Box>
  );

  const actions = (
    <>
      {searchBar}
      <IconButton>
        <Notifications />
      </IconButton>
      {themeToggleButton}
      {userMenuButton}
    </>
  );

  return (
    <Box
      component="header"
      sx={(theme) => ({
        position: "sticky",
        top: 0,
        zIndex: theme.zIndex.appBar,
        bgcolor: alpha(theme.palette.background.default, 0.5),
        backdropFilter: "blur(5px)",
        boxShadow: `0 1px 0 0 ${theme.palette.divider}`,
      })}
    >
      <Container maxWidth="xl">
        <Box
          sx={(theme) => ({
            display: "flex",
            flexdirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            height: theme.spacing(14),
            gap: 2,
          })}
        >
          <IconButton
            onClick={() => {
              if (isMobile) {
                setShowSidbarOnMobile(!showSidbarOnMobile);
              } else {
                setSidebarCompact(!compactSidebar);
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h1"
            sx={(theme) => ({
              fontSize: theme.spacing(5),
              fontWeight: "500",
              flex: 1,
              pr: 2,
            })}
          >
            {title}
          </Typography>
          {actions}
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardHeader;
