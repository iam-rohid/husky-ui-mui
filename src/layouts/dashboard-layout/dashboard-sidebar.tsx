import {
  Analytics,
  Category,
  CircleOutlined,
  Dashboard,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";

const sidebarMenuList = [
  {
    id: "dashboard",
    icon: <Dashboard />,
    label: "Dashboard",
    path: "/",
  },
  {
    id: "analytics",
    icon: <Analytics />,
    label: "Analytics",
    path: "/analytics",
  },
  {
    id: "components",
    icon: <Category />,
    label: "Components",
    path: "",
    subMenu: [
      {
        id: "buttons",
        icon: <CircleOutlined />,
        label: "Buttons",
        path: "/components/buttons",
      },
      {
        id: "cards",
        icon: <CircleOutlined />,
        label: "Cards",
        path: "/components/cards",
      },
      {
        id: "chips",
        icon: <CircleOutlined />,
        label: "Chips",
        path: "/components/chips",
      },
      {
        id: "dialogs",
        icon: <CircleOutlined />,
        label: "Dialogs",
        path: "/components/dialogs",
      },
      {
        id: "panels",
        icon: <CircleOutlined />,
        label: "Expansion Panels",
        path: "/components/expansion-panels",
      },
      {
        id: "forms",
        icon: <CircleOutlined />,
        label: "Forms",
        path: "/components/forms",
      },
      {
        id: "icons",
        icon: <CircleOutlined />,
        label: "Icons",
        path: "/components/icons",
      },
      {
        id: "lists",
        icon: <CircleOutlined />,
        label: "Lists",
        path: "/components/lists",
      },
      {
        id: "menus",
        icon: <CircleOutlined />,
        label: "Menus",
        path: "/components/menus",
      },
      {
        id: "paper",
        icon: <CircleOutlined />,
        label: "Paper",
        path: "/components/paper",
      },
      {
        id: "progress",
        icon: <CircleOutlined />,
        label: "Progress",
        path: "/components/progress",
      },
      {
        id: "sliders",
        icon: <CircleOutlined />,
        label: "Sliders",
        path: "/components/sliders",
      },
      {
        id: "snackbars",
        icon: <CircleOutlined />,
        label: "Snackbars",
        path: "/components/snackbars",
      },
      {
        id: "tabs",
        icon: <CircleOutlined />,
        label: "Tabs",
        path: "/components/tabs",
      },
    ],
  },
  {
    id: "pages",
    icon: <Category />,
    label: "Pages",
    path: "",
    subMenu: [
      {
        id: "buttons",
        icon: <CircleOutlined />,
        label: "Buttons",
        path: "/components/buttons",
      },
      {
        id: "cards",
        icon: <CircleOutlined />,
        label: "Cards",
        path: "/components/cards",
      },
    ],
  },
];
export type DashboardSidebarProps = {
  compact?: boolean;
  pageId?: string;
};

export const DashboardSidebar = ({
  compact,
  pageId,
}: DashboardSidebarProps) => {
  const [openList, setOpenList] = useState<string | null>(null);

  useEffect(() => {
    setOpenList(null);
  }, [compact]);

  return (
    <Paper
      component="aside"
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: 0,
        overflowY: "auto",
      }}
    >
      <Box
        sx={(theme) => ({
          bgcolor: alpha(theme.palette.background.paper, 0.75),
          backdropFilter: "blur(5px)",
          height: theme.spacing(14),
          display: "flex",
          alignItems: "center",
          justifyContent: compact ? "center" : "flex-start",
          paddingInline: theme.spacing(4),
          zIndex: 10,
          position: "sticky",
          top: 0,
        })}
      >
        {compact ? (
          <Typography
            sx={(theme) => ({
              fontSize: theme.spacing(6),
              fontWeight: 800,
            })}
          >
            HUI
          </Typography>
        ) : (
          <Typography
            sx={(theme) => ({
              fontSize: theme.spacing(6),
              fontWeight: 800,
            })}
          >
            HUSKY UI
          </Typography>
        )}
      </Box>

      <List sx={{ width: "100%" }}>
        {sidebarMenuList.map((item, i) => (
          <Fragment key={i}>
            <ListItem disablePadding>
              <Link href={item.path} passHref={!!item.path}>
                <ListItemButton
                  id={item.id}
                  component={item.path ? "a" : "button"}
                  selected={pageId === (item.id || "")}
                  onClick={() => {
                    if (item.subMenu) {
                      setOpenList(openList === item.id ? null : item.id);
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />

                  {!!item.subMenu &&
                    (openList === item.id ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </Link>
            </ListItem>
            {!!item.subMenu && !compact && (
              <Collapse in={openList === item.id} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {item.subMenu.map((subItem, j) => (
                    <ListItem disablePadding key={j}>
                      <Link href={`components/buttons`} passHref>
                        <ListItemButton component="a" sx={{ pl: 10 }}>
                          <ListItemIcon>
                            {subItem.icon || <CircleOutlined />}
                          </ListItemIcon>
                          <ListItemText primary={subItem.label} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
            {!!item.subMenu && compact && (
              <Menu
                open={openList === item.id}
                onClose={() => setOpenList(null)}
                anchorEl={document.getElementById(item.id)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  "& .MuiMenu-paper": {
                    ml: 2,
                  },
                }}
              >
                {item.subMenu.map((subItem, j) => (
                  <Link href={`components/buttons`} passHref key={j}>
                    <MenuItem component="a">
                      <ListItemIcon>
                        {subItem.icon || <CircleOutlined />}
                      </ListItemIcon>
                      <ListItemText primary={subItem.label} />
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            )}
          </Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default DashboardSidebar;
