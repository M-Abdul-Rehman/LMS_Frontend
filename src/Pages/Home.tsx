import { AppBar, Box, Typography} from "@mui/material";
import NavDrawer from "../Components/NavDrawer";
import CardGroup from "../Components/CardGroup";

function Home() {
  const styles = {
    wrapper: {
      display: "flex",
      width: "100%",
      height: "100vh",
      backgroundColor: "#f0f0f0",
    },
    appbar: {
      backgroundColor: "#ffffff",
      display: "flex",
      alignItems: "start",
      boxShadow: "none",
      padding: "16px",
      width: "calc(100% - 90px)",
      zIndex: 120,
    },
    dashboard: {
      flexGrow: 1,
      padding: "20px",
      marginTop: "60px",
      marginLeft: "90px",
    },
  };
  return (
    <Box sx={styles.wrapper}>
      <NavDrawer />
      <AppBar sx={styles.appbar}>
        <Typography variant="h5" color="initial" sx={{ opacity: 0.8 }}>
          Learning Management System
        </Typography>
      </AppBar>
      <Box sx={styles.dashboard}>
        <Typography variant="h4" color="initial">
          Dashboard:
        </Typography>
        <CardGroup/>
      </Box>
    </Box>
  );
}

export default Home;
