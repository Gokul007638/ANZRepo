
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { NavLink } from "react-router-dom";

import HomeIcon from "../assets/HomeIcon";
import AddClaimsIcon from "../assets/AddClaimsIcon";
import ReconIcon from "../assets/ReconIcon";
import ExceptionsIcon from "../assets/ExceptionsIcon";
import ReportsIcon from "../assets/ReportsIcon";
import ApprovalsIcon from "../assets/ApprovalsIcon";
import AuditLogIcon from "../assets/AuditLogIcon";
import MasterIcon from "../assets/MasterIcon";

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  drawerWidth: number;
  topbarHeight: number;
}

const menuItems = [
  {
    label: "Home",
    path: "/home",
    icon: <HomeIcon />,
  },
  {
    label: "Add Claims",
    path: "/add-claims",
    icon: <AddClaimsIcon />,
  },
  {
    label: "Recon",
    path: "/recon",
    icon: <ReconIcon />,
  },
  {
    label: "Master",
    path: "/master",
    icon: <MasterIcon/>
  },
  {
    label: "Exceptions",
    path: "/exceptions",
    icon: <ExceptionsIcon />,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: <ReportsIcon />,
  },
  {
    label: "Approvals",
    path: "/approvals",
    icon: <ApprovalsIcon />,
  },
  {
    label: "Audit Log",
    path: "/audit-log",
    icon: <AuditLogIcon />,
  },
];

function Sidebar({
  mobileOpen,
  onMobileClose,
  drawerWidth,
  topbarHeight,
}: SidebarProps) {

  // =====================================================
  // SIDEBAR CONTENT
  // =====================================================

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        width: "100%",

        backgroundColor: "#ffffff",

        display: "flex",
        flexDirection: "column",

        // No sidebar scrolling
        overflow: "hidden",
      }}
    >
      <List
        disablePadding
        sx={{
          padding: 0,
          margin: 0,

          width: "100%",
          height: "100%",

          display: "flex",
          flexDirection: "column",

          // All menu items fit inside available height
          overflow: "hidden",
        }}
      >
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end
            onClick={onMobileClose}
            sx={{
              // =========================================
              // AUTOMATIC HEIGHT DISTRIBUTION
              // =========================================

              position: "relative",

              flex: "1 1 0",

              minHeight: 0,

              height: 0,

              maxHeight: "none",

              width: "100%",

              boxSizing: "border-box",

              padding: "4px",

              // =========================================
              // ICON AND TEXT ALIGNMENT
              // =========================================

              display: "flex",

              flexDirection: "column",

              alignItems: "center",

              justifyContent: "center",

              borderRadius: 0,

              color: "#999999",

              overflow: "hidden",

              // =========================================
              // LEFT ACTIVE INDICATOR
              // =========================================

              "&::before": {
                content: '""',

                position: "absolute",

                left: 0,

                top: 0,

                bottom: 0,

                width: 3,

                backgroundColor: "#6500ed",

                opacity: 0,

                transition: "opacity 150ms ease",
              },

              // =========================================
              // ACTIVE ITEM
              // =========================================

              "&.active": {
                backgroundColor: "#f3eaff",

                color: "#6900EF",

                "&::before": {
                  opacity: 1,
                },

                "& .MuiListItemText-primary": {
                  fontWeight: 600,
                },
              },

              // =========================================
              // HOVER
              // =========================================

              "&:hover": {
                backgroundColor: "#faf6ff",
              },

              // =========================================
              // ICON
              // =========================================

              "& svg": {
                width: 21,

                height: 21,

                flexShrink: 0,
              },

              "& .MuiListItemIcon-root": {
                minWidth: 0,

                width: "auto",

                margin: 0,

                padding: 0,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                color: "inherit",

                flexShrink: 0,
              },

              // =========================================
              // TEXT CONTAINER
              // =========================================

              "& .MuiListItemText-root": {
                margin: 0,

                width: "100%",

                flex: "0 0 auto",

                minWidth: 0,
              },

              // =========================================
              // MENU LABEL
              // =========================================

              "& .MuiListItemText-primary": {
                fontSize: 10.5,

                lineHeight: 1.3,

                textAlign: "center",

                whiteSpace: "normal",

                marginTop: "5px",

                fontWeight: 400,

                color: "inherit",

                overflowWrap: "break-word",
              },
            }}
          >
            {/* ICON */}
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>

            {/* LABEL */}
            <ListItemText
              primary={item.label}
            />

          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  // =====================================================
  // DESKTOP SIDEBAR
  // =====================================================

  return (
    <>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          width: drawerWidth,

          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,

            top: `${topbarHeight}px`,

            height: `calc(100% - ${topbarHeight}px)`,

            boxSizing: "border-box",

            borderRight: "1px solid #eeeeee",

            backgroundColor: "#ffffff",

            // Prevent scrollbar
            overflowY: "hidden",

            overflowX: "hidden",
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,

            top: `${topbarHeight}px`,

            height: `calc(100% - ${topbarHeight}px)`,

            boxSizing: "border-box",

            borderRight: "1px solid #eeeeee",

            backgroundColor: "#ffffff",

            // Prevent scrollbar
            overflowY: "hidden",

            overflowX: "hidden",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}

export default Sidebar;