import { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  styled,
  useTheme,
  Theme,
} from "@mui/material";

import {
  Menu as MenuIcon,
  ChevronLeft,
  Dashboard,
  School,
  Assignment,
  ExitToApp,
} from "@mui/icons-material";

interface NavItem {
  text: string;
  icon: React.ReactNode;
  tab: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const drawerWidth = 240;
const collapsedWidth = 56;

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : collapsedWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
    borderRight: "none",
  },
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: open ? drawerWidth : collapsedWidth,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
}));

const DrawerHeader = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  isLoading = false,
  activeTab,
  onTabChange,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => setOpen(!open);

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navItems: NavItem[] = [
    { text: "Dashboard", icon: <Dashboard />, tab: "dashboard" },
    { text: "Enrollment", icon: <School />, tab: "enrollment" },
    { text: "Results", icon: <Assignment />, tab: "result" },
  ];

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBarStyled position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap>
            Learning Management System
          </Typography>
        </Toolbar>
      </AppBarStyled>

      <DrawerStyled variant="permanent" open={open}>
        <DrawerHeader />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.tab} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => onTabChange(item.tab)}
                selected={activeTab === item.tab}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.action.selected,
                    "& .MuiListItemIcon-root": {
                      color: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List sx={{ mt: "auto" }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </DrawerStyled>

      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default MainLayout;
