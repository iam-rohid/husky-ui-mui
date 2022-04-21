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
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

export type DashboardSidebarProps = {
  compact?: boolean;
};
export const DashboardSidebar = ({ compact }: DashboardSidebarProps) => {
  const [openList, setOpenList] = useState<string | null>(null);
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
        <ListItem disablePadding>
          <Link href={"/"} passHref>
            <ListItemButton component="a">
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link href={"/analytics"} passHref>
            <ListItemButton component="a">
              <ListItemIcon>
                <Analytics />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component="button"
            onClick={() => setOpenList(openList ? null : "components")}
          >
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary="Components" />
            {!compact &&
              (openList === "components" ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        {!compact && (
          <Collapse in={openList === "components"} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItem disablePadding>
                <Link href={`components/buttons`} passHref>
                  <ListItemButton component="a" sx={{ pl: 10 }}>
                    <ListItemIcon>
                      <CircleOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Buttons" />
                  </ListItemButton>
                </Link>
              </ListItem>

              <ListItem disablePadding>
                <Link href={`components/icon-buttons`} passHref>
                  <ListItemButton component="a" sx={{ pl: 10 }}>
                    <ListItemIcon>
                      <CircleOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Icon Buttons" />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </Collapse>
        )}
      </List>
    </Paper>
  );
};

export default DashboardSidebar;
