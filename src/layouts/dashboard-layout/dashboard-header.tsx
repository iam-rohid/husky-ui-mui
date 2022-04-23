import {
  Computer,
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  Notifications,
  Person,
  Search,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Container,
  IconButton,
  InputBase,
  Theme,
  Typography,
  useMediaQuery,
  AppBar,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { useState, MouseEvent, useRef } from "react";
import { ColorSchemeMenu, ProfileMenu } from "src/components/menus";
import { useColorScheme } from "src/context/color-scheme";
import useKeyboard from "src/hooks/use-keyboard";
import { grey } from "src/themes/colors";

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
  const [colorSchemeMenuAnchorEL, setColorSchemeMenuAnchorEL] =
    useState<HTMLElement | null>(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
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

  const handleColorSchemeClick = (e: MouseEvent<HTMLButtonElement>) => {
    setColorSchemeMenuAnchorEL(e.currentTarget);
  };
  const handleColorSchemeMenuClose = () => {
    setColorSchemeMenuAnchorEL(null);
  };
  const handleProfileClick = (e: MouseEvent<HTMLButtonElement>) => {
    setProfileMenuAnchorEl(e.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

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
            left: theme.spacing(3),
            zIndex: 1,
            top: "50%",
            transform: "translateY(-50%)",
            color: theme.palette.mode === "light" ? grey[500] : grey[400],
          })}
        />
        <Typography
          sx={(theme) => ({
            position: "absolute",
            right: theme.spacing(3),
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
          bgcolor: alpha(theme.palette.background.paper, 0.5),
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
          paddingRight: theme.spacing(11),
          paddingLeft: theme.spacing(11),
          height: theme.spacing(10),
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
      <Tooltip title="Change Color Scheme (⌘B)">
        <IconButton onClick={handleColorSchemeClick}>
          {colorScheme === "light" ? (
            <LightMode />
          ) : colorScheme === "dark" ? (
            <DarkMode />
          ) : (
            <Computer />
          )}
        </IconButton>
      </Tooltip>
      <IconButton onClick={handleProfileClick}>
        <Person />
      </IconButton>
      <ColorSchemeMenu
        anchorEl={colorSchemeMenuAnchorEL}
        open={!!colorSchemeMenuAnchorEL}
        onClose={handleColorSchemeMenuClose}
        sx={{
          "& .MuiMenu-paper": {
            mt: 4,
          },
        }}
      />
      <ProfileMenu
        anchorEl={profileMenuAnchorEl}
        open={!!profileMenuAnchorEl}
        onClose={handleProfileMenuClose}
        sx={{
          "& .MuiMenu-paper": {
            mt: 4,
          },
        }}
      />
    </>
  );

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar
          sx={{
            gap: 2,
          }}
          disableGutters
        >
          <Tooltip title="Compact Sidebar (⌘/)">
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
          </Tooltip>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DashboardHeader;
