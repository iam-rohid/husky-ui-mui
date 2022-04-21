import {
  Drafts,
  ExpandLess,
  ExpandMore,
  Inbox,
  Send,
  StarBorder,
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
  Typography,
} from "@mui/material";
import React from "react";
import { grey } from "../../themes";

export type DashboardSidebarProps = {
  compact?: boolean;
};
export const DashboardSidebar = ({ compact }: DashboardSidebarProps) => {
  return (
    <Box
      component="aside"
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        bgcolor: theme.palette.background.paper,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      })}
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
        })}
      >
        {compact ? (
          <Typography
            sx={(theme) => ({
              fontSize: theme.spacing(6),
              fontWeight: 800,
            })}
          >
            L
          </Typography>
        ) : (
          <Typography
            sx={(theme) => ({
              fontSize: theme.spacing(6),
              fontWeight: 800,
            })}
          >
            LOGO
          </Typography>
        )}
      </Box>
      <List sx={{ width: "100%" }} component="nav">
        <ListItemButton selected>
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          <ListItemText primary="Sent maila sdfasdjf lasdjl" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {!compact && (true ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        {!compact && (
          <Collapse in={true} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 10 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        )}
      </List>
    </Box>
  );
};

export default DashboardSidebar;
