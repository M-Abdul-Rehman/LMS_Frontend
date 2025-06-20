import { AppBar, Box, Button, CircularProgress, Typography, useTheme, styled } from "@mui/material";
import NavDrawer from "../Components/NavDrawer";
import CardGroup from "../Components/CardGroup";
import DataTables from "../Components/DataTables";
import { useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";

const DashboardWrapper = styled(Box)({
  display: "flex",
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
});

const MainContent = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minWidth: 0, // Prevent flexbox overflow
});

const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  overflowY: "auto",
}));

function Home() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (isLoading) {
    return (
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: theme.palette.background.default
      }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <DashboardWrapper>
      <NavDrawer open={drawerOpen} onToggle={handleDrawerToggle} />
      
      <MainContent sx={{ 
        ml: drawerOpen ? '240px' : '56px',
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}>
        <AppBar 
          position="fixed"
          sx={{
            width: drawerOpen ? `calc(100% - 240px)` : `calc(100% - 56px)`,
            ml: drawerOpen ? '240px' : '56px',
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[1],
            p: 2,
          }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Learning Management System
            </Typography>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={handleLogout}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                py: 1
              }}
            >
              Logout
            </Button>
          </Box>
        </AppBar>
        
        <ContentArea ref={contentRef}>
          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 4,
            color: theme.palette.text.primary
          }}>
            Dashboard
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <CardGroup />
          </Box>
          
          <Box>
            <DataTables />
          </Box>
        </ContentArea>
      </MainContent>
    </DashboardWrapper>
  );
}

export default Home;