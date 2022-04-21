import { Box } from "@mui/material";
import React from "react";

export type DashboardSidebarProps = {
  compact?: boolean;
};
export const DashboardSidebar = ({ compact }: DashboardSidebarProps) => {
  return (
    <Box
      component="aside"
      sx={(theme) => ({
        width: compact ? theme.spacing(16) : theme.spacing(64),
        height: "100%",
        bgcolor: theme.palette.background.default,
        boxShadow: `1px 0 0 0 ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer,
        overflowY: "auto",
      })}
    >
      Hello form Sidebar
    </Box>
  );
};

export default DashboardSidebar;
