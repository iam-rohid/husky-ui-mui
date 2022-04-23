import { Person } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Chip,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";
import moment from "moment";

export type NotificationType = {
  title: string;
  icon?: ReactNode;
  avatarSrc?: string;
  secondaryText: string;
  date: string | Date;
  read: boolean;
  href: string;
};
export type NotificationsMenuPorps = Omit<MenuProps, "onClose"> & {
  onClose: (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | "itemClick"
  ) => void;
  list: NotificationType[];
  title?: string;
  readAllLink?: string;
  readAllText?: string;
};

export const NotificationsMenu = ({
  list,
  title = "Notifications",
  readAllLink,
  readAllText,
  ...rest
}: NotificationsMenuPorps) => {
  const handleItemClick = () => {
    rest.onClose({}, "itemClick");
  };
  return (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      MenuListProps={{
        sx: (theme) => ({
          maxWidth: theme.spacing(100),
        }),
        disablePadding: true,
      }}
      PaperProps={{
        sx: (theme) => ({
          maxHeight: "80vh",
          py: 0,
        }),
      }}
      {...rest}
    >
      <AppBar position="sticky">
        <Toolbar
          disableGutters={false}
          sx={{
            minHeight: (theme) => theme.spacing(10),
          }}
        >
          <Typography sx={{ flex: 1 }}>{title}</Typography>
          <ListItemSecondaryAction>
            <Chip
              label={`${list.filter((item) => !item.read).length} new`}
              variant="filled"
              color="default"
              size="small"
            />
          </ListItemSecondaryAction>
        </Toolbar>
      </AppBar>
      {list.map((item, index) => (
        <Link href={item.href} passHref key={index}>
          <MenuItem
            component={"a"}
            onClick={handleItemClick}
            sx={{
              position: "relative",
              alignItems: "start",
              gap: 3,
            }}
          >
            <ListItemIcon>
              <Avatar src={item.avatarSrc}>{item.icon}</Avatar>
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              secondary={item.secondaryText}
              sx={{
                overflow: "hidden",
              }}
              secondaryTypographyProps={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                color: (theme) =>
                  item.read
                    ? theme.palette.text.secondary
                    : theme.palette.text.primary,
              }}
              primaryTypographyProps={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                paddingRight: 18,
                color: (theme) =>
                  item.read
                    ? theme.palette.text.secondary
                    : theme.palette.text.primary,
              }}
            />
            <ListItemSecondaryAction
              sx={(theme) => ({
                top: theme.spacing(4),
              })}
            >
              <Typography variant="caption">
                {moment(item.date).format("MMM DD, YYYY")}
              </Typography>
            </ListItemSecondaryAction>
          </MenuItem>
        </Link>
      ))}
      {readAllLink && (
        <AppBar
          sx={{
            position: "sticky",
            bottom: 0,
            height: "auto",
          }}
        >
          <Link href={readAllLink} passHref>
            <MenuItem
              component={"a"}
              onClick={handleItemClick}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <ListItemText primary={readAllText || `Read all ${title}`} />
            </MenuItem>
          </Link>
        </AppBar>
      )}
    </Menu>
  );
};

export default NotificationsMenu;
