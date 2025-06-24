import { Box, Typography } from "@mui/material";
import CardGroup from "./CardGroup";
import DataTables from "./DataTables";

const DashboardContent = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 600,
        mb: 4,
      }}>
        Dashboard
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <CardGroup />
      </Box>
      
      <Box>
        <DataTables />
      </Box>
    </>
  );
};

export default DashboardContent;