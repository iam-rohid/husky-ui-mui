import {
  Computer,
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  Message,
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
  Avatar,
} from "@mui/material";
import { useState, MouseEvent, useRef, useEffect } from "react";
import { ColorSchemeMenu, ProfileMenu } from "src/components/menus";
import NotificationsMenu, {
  NotificationType,
} from "src/components/menus/notifications-menu";
import { useColorScheme } from "src/context/color-scheme";
import useKeyboard from "src/hooks/use-keyboard";
import { grey } from "src/themes/colors";
import faker from "@faker-js/faker";

type User = {
  name: string;
  avatar: string;
  email: string;
  username: string;
};
const getUser = (): User => ({
  name: faker.name.findName(),
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
});

const getNotifications = (amount?: number) =>
  new Array(
    amount ||
      faker.random.number({
        min: 2,
        max: 20,
      })
  )
    .fill(0)
    .map<NotificationType>(
      () =>
        ({
          title: faker.name.findName(),
          icon: <Person />,
          avatarSrc: faker.random.boolean()
            ? faker.internet.avatar()
            : undefined,
          secondaryText: faker.lorem.sentences(2),
          date: faker.date.past(),
          read: faker.random.boolean(),
          href: "/",
        } as NotificationType)
    );

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
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [messages, setMessages] = useState<NotificationType[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const { colorScheme } = useColorScheme();
  const [colorSchemeMenuAnchorEL, setColorSchemeMenuAnchorEL] =
    useState<HTMLElement | null>(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const [notificationsMenuAnchorEl, setNotificationsMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const [messagesMenuAnchorEl, setMessagesMenuAnchorEl] =
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

  useEffect(() => {
    setNotifications(getNotifications());
    setMessages(getNotifications());
    setUser(getUser());
  }, []);

  const handleColorSchemeClick = (e: MouseEvent<HTMLButtonElement>) => {
    setColorSchemeMenuAnchorEL(e.currentTarget);
  };
  const handleNotificationsClick = (e: MouseEvent<HTMLButtonElement>) => {
    setNotificationsMenuAnchorEl(e.currentTarget);
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
  const handleNotificationsMenuClose = () => {
    setNotificationsMenuAnchorEl(null);
  };

  const handleMessagesClick = (e: MouseEvent<HTMLButtonElement>) => {
    setMessagesMenuAnchorEl(e.currentTarget);
  };
  const handleMessagesMenuClose = () => {
    setMessagesMenuAnchorEl(null);
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
      <Tooltip title="Messages">
        <IconButton onClick={handleMessagesClick}>
          <Message />
        </IconButton>
      </Tooltip>
      <Tooltip title="Notifications">
        <IconButton onClick={handleNotificationsClick}>
          <Notifications />
        </IconButton>
      </Tooltip>
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
      <Tooltip title="Profile">
        <Avatar
          component="button"
          sx={{
            position: "relative",
            outline: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
          src={user?.avatar}
          variant="rounded"
          onClick={handleProfileClick}
        >
          <Person />
        </Avatar>
      </Tooltip>
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
      <NotificationsMenu
        anchorEl={notificationsMenuAnchorEl}
        open={!!notificationsMenuAnchorEl}
        onClose={handleNotificationsMenuClose}
        sx={{
          "& .MuiMenu-paper": {
            mt: 4,
          },
        }}
        list={notifications}
        title="Notifications"
        readAllLink="demo-01/dashboard/notifications"
      />
      <NotificationsMenu
        anchorEl={messagesMenuAnchorEl}
        open={!!messagesMenuAnchorEl}
        onClose={handleMessagesMenuClose}
        sx={{
          "& .MuiMenu-paper": {
            mt: 4,
          },
        }}
        list={messages}
        title="Messages"
        readAllLink="demo-01/dashboard/messages"
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
