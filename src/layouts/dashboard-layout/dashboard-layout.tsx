import { Box, Drawer, Container, Theme, useMediaQuery } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import DashboardHeader from "./dashboard-header";
import DashboardSidebar from "./dashboard-sidebar";

export type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [showSidebarOnMobile, setShowSidebarOnMobile] = useState(false);
  const [sidebarCompact, setSidebarCompact] = useState(false);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  useEffect(() => {
    if (!isMobile && showSidebarOnMobile) {
      setShowSidebarOnMobile(false);
    }
  }, [isMobile, showSidebarOnMobile]);

  return (
    <>
      <Drawer
        anchor={"left"}
        open={showSidebarOnMobile}
        onClose={() => setShowSidebarOnMobile(false)}
      >
        <DashboardSidebar />
      </Drawer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {!isMobile && <DashboardSidebar compact={sidebarCompact} />}
        <Box
          sx={(theme) => ({
            flex: 1,
            overflowY: "scroll",
            bgcolor: theme.palette.background.default,
          })}
        >
          <DashboardHeader
            title="Dashboard"
            showSidbarOnMobile={showSidebarOnMobile}
            setShowSidbarOnMobile={setShowSidebarOnMobile}
            setSidebarCompact={setSidebarCompact}
            sidebarCompact={sidebarCompact}
          />
          <Container maxWidth="xl">{children}</Container>
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
