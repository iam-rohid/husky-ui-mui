import { Box, Drawer, Container, Theme, useMediaQuery } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import useKeyboard from "../../hooks/use-keyboard";
import useLocalstorage from "../../hooks/use-localstorage";
import { grey } from "../../themes";
import DashboardHeader from "./dashboard-header";
import DashboardSidebar from "./dashboard-sidebar";

export type DashboardLayoutProps = {
  children: ReactNode;
  title: string;
  pageId?: string;
};

export const DashboardLayout = ({
  children,
  title,
  pageId,
}: DashboardLayoutProps) => {
  const [showSidebarOnMobile, setShowSidebarOnMobile] = useState(false);
  const [sidebarCompact, setSidebarCompact] = useLocalstorage<boolean>(
    false,
    "compact-sidebar"
  );
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  useEffect(() => {
    if (!isMobile && showSidebarOnMobile) {
      setShowSidebarOnMobile(false);
    }
  }, [isMobile, showSidebarOnMobile]);

  useKeyboard("/", {
    metaKey: true,
    onKeyDown: (e) => {
      e.preventDefault();
      setSidebarCompact(!sidebarCompact);
    },
  });

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
            boxShadow: `1px 0 0 0 ${
              theme.palette.mode === "light" ? grey[200] : grey[700]
            }`,
          }),
        }}
      >
        <DashboardSidebar pageId={pageId} />
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
            <DashboardSidebar pageId={pageId} compact={sidebarCompact} />
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
            title={title}
            showSidbarOnMobile={showSidebarOnMobile}
            setShowSidbarOnMobile={setShowSidebarOnMobile}
            setSidebarCompact={setSidebarCompact}
            sidebarCompact={sidebarCompact}
          />
          <Container>{children}</Container>
        </Box>
      </>
    </>
  );
};

export default DashboardLayout;
