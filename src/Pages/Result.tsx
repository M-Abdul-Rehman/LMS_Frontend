import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Select,
  Typography,
  MenuItem, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell,
} from "@mui/material";
import NavDrawer from "../Components/NavDrawer";
import CardGroup from "../Components/CardGroup";
import DataTables from "../Components/DataTables";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Result() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
      flexDirection: "row",
      justifyContent: "space-between",
    },
    dashboard: {
      flexGrow: 1,
      padding: "20px",
      marginTop: "60px",
      marginLeft: "90px",
    },
    loaderContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
    },
  };

  if (isLoading) {
    return (
      <Box sx={styles.loaderContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={styles.wrapper}>
      <NavDrawer />
      <AppBar sx={styles.appbar}>
        <Typography variant="h5" color="initial" sx={{ opacity: 0.8 }}>
          Learning Management System
        </Typography>
        <Button
          onClick={() => {
            localStorage.removeItem("student");
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </Button>
      </AppBar>
      <Box sx={styles.dashboard}>
        <Typography variant="h4" color="initial">
          Result:
        </Typography>
        <Select
          defaultValue="Select Year"
          sx={{
            width: "100%",
            margin: "20px auto",
            backgroundColor: "#fff",
            color: "#000",
          }}
        >
          <MenuItem key={"Fa2021"} value={"Fa2021"}>
            Fa2021
          </MenuItem>
        </Select>
        <Box sx={{ display: "flex", marginLeft: "20px" }}>
          <Typography variant="body1" sx={{ fontSize: "20px" }} color="red">
            Note:
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "20px" }} color="initial">
            CGPA means Cumulative Grade Point Average and is the measuring grade
            for your overall performance during an academic year. SGPA is
            Semester Grade Point Average that adds all the CGPAs after an
            educational program.
          </Typography>
        </Box>
        <Box marginTop={4} sx={{ display: "flex",alignItems: "center", justifyContent: "center",gap: "20px" }}>
            <Typography variant="h4" textAlign={"center"} fontWeight={600} color="initial">Semester GPA:</Typography>
            <Typography variant="h4" textAlign={"center"} fontWeight={600} color="red">3.00</Typography>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#f5f5f5" ,opacity: 0.8}}>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Course Name</TableCell>
                    <TableCell align="center">Course Code</TableCell>
                    <TableCell align="center">Course Teacher</TableCell>
                    <TableCell align="center">Course Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" align="center" scope="row">1</TableCell>
                    <TableCell component="th" align="center" scope="row">Computer Science 101</TableCell>
                    <TableCell component="th" align="center" scope="row">CS123</TableCell>
                    <TableCell component="th" align="center" scope="row">Ali Ahmed</TableCell>
                    <TableCell component="th" align="center" scope="row">B+</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default Result;
