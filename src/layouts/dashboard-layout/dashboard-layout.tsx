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
        PaperProps={{
          sx: (theme) => ({
            width: "80%",
            maxWidth: theme.spacing(82),
          }),
        }}
      >
        <DashboardSidebar />
      </Drawer>
      <>
        {!isMobile && (
          <Box
            sx={(theme) => ({
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              width: sidebarCompact ? theme.spacing(16) : theme.spacing(64),
              zIndex: theme.zIndex.drawer - 10,
            })}
          >
            <DashboardSidebar compact={sidebarCompact} />
          </Box>
        )}
        <Box
          sx={(theme) => ({
            paddingLeft: isMobile
              ? 0
              : sidebarCompact
              ? theme.spacing(16)
              : theme.spacing(64),
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
      </>
    </>
  );
};

export default DashboardLayout;
