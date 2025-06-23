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
  Home as HomeIcon,
  DataUsage as DataUsageIcon,
  MilitaryTech as MilitaryTechIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavDrawerProps {
  open: boolean;
  onToggle: () => void;
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    whiteSpace: "nowrap",
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  zIndex: theme.zIndex.drawer + 1,
}));

function NavDrawer({ open, onToggle }: NavDrawerProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const navItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/home",
      iconColor: theme.palette.primary.main,
    },
    {
      text: "Enrollment",
      icon: <DataUsageIcon />,
      path: "/enrollment",
      iconColor: theme.palette.secondary.main,
    },
    {
      text: "Result",
      icon: <MilitaryTechIcon />,
      path: "/exam/result",
      iconColor: theme.palette.success.main,
    },
  ];

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <StyledAppBar position="fixed">
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
              Learning Management System
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
        sx={{
          width: open ? 240 : 56,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: open ? 240 : 56,
            boxSizing: "border-box",
            borderRight: "none",
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[3],
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Toolbar />{" "}
        {/* This empty Toolbar is for proper spacing below the AppBar */}
        <List sx={{ px: 1 }}>
          {navItems.map((item) => {
            const isActive = activePath === item.path;
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
                  onClick={() => handleNavigation(item.path)}
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
}

export default NavDrawer;
