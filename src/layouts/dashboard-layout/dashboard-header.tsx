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
import { useState, MouseEvent, useMemo, useRef, useCallback } from "react";
import { useColorScheme } from "../../context/color-scheme";
import useKeyboard from "../../hooks/use-keyboard";
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
  const searchInputRef = useRef<HTMLInputElement>(null);

  useKeyboard("k", {
    metaKey: true,
    onKeyDown: (e) => {
      if (searchInputRef.current) {
        if (document.activeElement !== searchInputRef.current) {
          e.preventDefault();
          searchInputRef.current.focus();
        }
      }
    },
  });

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

  const colorSchemeMenu = (
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
      MenuListProps={{
        sx: (theme) => ({
          minWidth: theme.spacing(36),
        }),
      }}
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
  );
  const userMenu = (
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
  );

  const searchBar = isMobile ? (
    <IconButton edge="end">
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
        <Typography
          sx={(theme) => ({
            position: "absolute",
            right: theme.spacing(2),
            zIndex: 1,
            top: "50%",
            transform: "translateY(-50%)",
            color: theme.palette.mode === "light" ? grey[500] : grey[400],
          })}
          component="code"
        >
          ⌘K
        </Typography>
      </label>
      <InputBase
        id="search-input"
        placeholder="Search..."
        inputRef={searchInputRef}
        sx={(theme) => ({
          bgcolor: theme.palette.background.paper,
          boxShadow: `0 0 0 1px ${theme.palette.divider}`,
          "&:focus-within": {
            boxShadow: `0 0 0 2px ${
              theme.palette.mode === "light" ? grey[200] : grey[700]
            }`,
          },
          "& input::placeholder": {
            color: theme.palette.mode === "light" ? grey[500] : grey[400],
            opacity: 1,
          },
          paddingRight: theme.spacing(10),
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
      <IconButton edge="end">
        <Notifications />
      </IconButton>
      <IconButton onClick={handleColorSchemeMenuButtonClick} edge="end">
        {colorScheme === "light" ? (
          <LightMode />
        ) : colorScheme === "dark" ? (
          <DarkMode />
        ) : (
          <Computer />
        )}
      </IconButton>
      <IconButton onClick={handleUserMenuButtonClick} edge="end">
        <Person />
      </IconButton>
      {colorSchemeMenu}
      {userMenu}
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
            gap: 4,
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
            edge="start"
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
