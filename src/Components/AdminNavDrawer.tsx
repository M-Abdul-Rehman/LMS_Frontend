// src/components/AdminNavDrawer.tsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  styled,
  AppBar,
  Box,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { logout } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

interface AdminNavDrawerProps {
  open: boolean;
  onToggle: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

const drawerWidth = 240;
const miniDrawerWidth = 56;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      width: miniDrawerWidth,
    },
  },
  "& .MuiDrawer-paperClose": {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: miniDrawerWidth,
  },
}));

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: miniDrawerWidth,
    width: `calc(100% - ${miniDrawerWidth}px)`,
  }),
}));

const AdminNavDrawer: React.FC<AdminNavDrawerProps> = ({ open, onToggle, onTabChange, activeTab }) => {
  const theme = useTheme();

  const navItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      tab: "dashboard",
      iconColor: theme.palette.primary.main,
    },
    {
      text: "Students",
      icon: <PeopleIcon />,
      tab: "students",
      iconColor: theme.palette.secondary.main,
    },
    {
      text: "Classes",
      icon: <SchoolIcon />,
      tab: "classes",
      iconColor: theme.palette.success.main,
    },
    {
      text: "Enrollments",
      icon: <AssignmentIcon />,
      tab: "enrollments",
      iconColor: theme.palette.warning.main,
    },
    {
      text: "Reports",
      icon: <BarChartIcon />,
      tab: "reports",
      iconColor: theme.palette.info.main,
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      tab: "settings",
      iconColor: theme.palette.error.main,
    },
  ];
  const dispatch = useDispatch();

  const handleLogout = () => {
  dispatch(logout());
  window.location.href = "/";
};

  return (
    <>
      <StyledAppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onToggle}
              edge="start"
              sx={{ mr: 2 }}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Admin Panel - LMS
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </StyledAppBar>

      <StyledDrawer
        variant="permanent"
        open={open}
        className={open ? "" : "MuiDrawer-paperClose"}
        sx={{
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : miniDrawerWidth,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
            }),
            borderRight: "none",
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[3],
          },
        }}
      >
        <Toolbar />
        <List sx={{ px: 1 }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  mb: 0.5,
                  borderRadius: 1,
                  backgroundColor: isActive
                    ? theme.palette.action.selected
                    : "transparent",
                }}
              >
                <ListItemButton
                  onClick={() => onTabChange(item.tab)}
                  sx={{
                    px: 2,
                    py: 1.25,
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: isActive
                        ? item.iconColor
                        : theme.palette.text.secondary,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: "opacity 0.2s",
                      "& span": {
                        fontWeight: isActive ? "600" : "400",
                        color: isActive
                          ? theme.palette.text.primary
                          : theme.palette.text.secondary,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </StyledDrawer>
    </>
  );
};

export default AdminNavDrawer;