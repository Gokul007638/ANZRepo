import { useState } from "react";

import {
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Outlet } from "react-router-dom";

import Topbar from "./TopBar";
import Sidebar from "./SideBar";

const TOPBAR_HEIGHT = 62;
const DRAWER_WIDTH = 77;

function AppLayout() {
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuClick = () => {
    setMobileOpen((previous) => !previous);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fb",
      }}
    >
      {/* TOPBAR */}
      <Topbar onMenuClick={handleMenuClick} />

      {/* SIDEBAR */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
        drawerWidth={DRAWER_WIDTH}
        topbarHeight={TOPBAR_HEIGHT}
      />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          marginTop: `${TOPBAR_HEIGHT}px`,

          marginLeft: isMobile
            ? 0
            : `${DRAWER_WIDTH}px`,

          minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px)`,

          padding: {
            xs: 1.5,
            sm: 2,
            md: 2.5,
          },

          backgroundColor: "#f8f9fb",

          boxSizing: "border-box",

          overflowX: "hidden",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout;