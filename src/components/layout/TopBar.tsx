import { useEffect, useState } from "react";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { getContext } from "@microsoft/power-apps/app";

import DrlIcon from "../../assets/DrlIcon";

interface TopbarProps {
  onMenuClick: () => void;
}

function TopBar({ onMenuClick }: TopbarProps) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // =====================================================
  // LOGGED-IN USER STATE
  // =====================================================

  const [fullName, setFullName] = useState("");

  // =====================================================
  // GET CURRENT POWER APPS USER
  // =====================================================

  useEffect(() => {
    let isMounted = true;

    const loadCurrentUser = async () => {
      try {
        const context = await getContext();

        const name =
          context.user.fullName?.trim() ||
          context.user.userPrincipalName?.trim() ||
          "";

        if (isMounted) {
          setFullName(name);
        }
      } catch (error) {
        console.error("Unable to retrieve current user context:", error);

        if (isMounted) {
          setFullName("");
        }
      }
    };

    loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  // =====================================================
  // GENERATE USER INITIALS
  // =====================================================

  const getInitials = (name: string): string => {
    const cleanName = name.trim();

    if (!cleanName) {
      return "U";
    }

    const parts = cleanName.split(/\s+/);

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // =====================================================
  // TOPBAR UI
  // =====================================================

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: 62,

        backgroundColor: "#ffffff",

        color: "#222222",

        borderBottom: "1px solid #eeeeee",

        zIndex: theme.zIndex.drawer + 2,
      }}
    >
      <Toolbar
        sx={{
          minHeight: "62px !important",

          height: 62,

          paddingX: {
            xs: 1.5,
            sm: 2,
            md: 2.5,
          },

          display: "flex",

          alignItems: "center",
        }}
      >
        {/* =================================================
            MOBILE MENU
        ================================================== */}

        {isMobile && (
          <IconButton
            onClick={onMenuClick}
            sx={{
              marginRight: 1,

              color: "#555555",

              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* =================================================
            LEFT SECTION
            DRL LOGO + DIVIDER + APPLICATION NAME
        ================================================== */}

        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            gap: {
              xs: 1,
              sm: 2,
            },

            minWidth: 0,
          }}
        >
          {/* DRL LOGO */}

          <Box
            sx={{
              width: 34,

              height: 34,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              flexShrink: 0,
            }}
          >
            <DrlIcon />
          </Box>

          {/* VERTICAL DIVIDER */}

          <Box
            sx={{
              height: 29,

              width: "1px",

              backgroundColor: "#d9d9d9",

              flexShrink: 0,
            }}
          />

          {/* APPLICATION NAME */}

          <Typography
            sx={{
              fontSize: {
                xs: 17,
                sm: 21,
              },

              fontWeight: 600,

              color: "#6500ed",

              whiteSpace: "nowrap",

              overflow: "hidden",

              textOverflow: "ellipsis",
            }}
          >
            ANZ Process
          </Typography>
        </Box>

        {/* =================================================
            RIGHT SECTION - USER AVATAR
        ================================================== */}

        <Box
          sx={{
            marginLeft: "auto",

            display: "flex",

            alignItems: "center",

            flexShrink: 0,
          }}
        >
          {/* USER AVATAR WITH FULL NAME TOOLTIP */}

          <Tooltip
            title={fullName || "Loading user..."}
            arrow
            placement="bottom"
          >
            <Avatar
              sx={{
                width: 29,

                height: 29,

                fontSize: 12,

                fontWeight: 600,

                backgroundColor: "#d7c2ff",

                color: "#6500ed",

                marginLeft: 0.5,

                cursor: "pointer",
              }}
            >
              {getInitials(fullName)}
            </Avatar>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
