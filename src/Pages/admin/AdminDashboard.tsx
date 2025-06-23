import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  CircularProgress,
} from '@mui/material';
import AdminNavDrawer from '../../Components/AdminNavDrawer';
import AdminStatsCards from '../../Components/AdminStatsCards';
import AdminRecentActivity from '../../Components/AdminRecentActivity';

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

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <AdminNavDrawer open={drawerOpen} onToggle={handleDrawerToggle} />
      
      <MainContent sx={{ 
        ml: drawerOpen ? '240px' : '56px',
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}>
        <ContentArea>
          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 4,
            color: theme.palette.text.primary
          }}>
            Admin Dashboard
          </Typography>
          
          <AdminStatsCards />
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
              <AdminRecentActivity />
          </Grid>
        </ContentArea>
      </MainContent>
    </DashboardWrapper>
  );
};

export default AdminDashboard;