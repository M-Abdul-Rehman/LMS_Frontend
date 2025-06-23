import { Box, CircularProgress, useTheme, styled, Typography } from "@mui/material";
import NavDrawer from "../Components/NavDrawer";
import CardGroup from "../Components/CardGroup";
import DataTables from "../Components/DataTables";
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
  minWidth: 0,
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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
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