import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function DataTables() {
  return (
    <Box sx={{ display: "flex", margin: "50px 10%", gap: "10%" }}>
      <Box sx={{ width: "40%", height: "250px" }}>
        <Typography
          sx={{
            backgroundColor: "#406A90",
            width: "100%",
            padding: "5px 15px",
            color: "white",
          }}
          variant="h6"
        >
          Academic Calander
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ minWidth: "100%", padding: "5px 15px", height: "100%" }}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Activity</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ opacity: 0.8 }}>
              <TableRow>
                <TableCell component="th" scope="row">
                  Enrollment Start
                </TableCell>
                <TableCell component="th" scope="row">
                  10 March 2024
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Semester Start
                </TableCell>
                <TableCell component="th" scope="row">
                  11 March 2024
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Enrollment End
                </TableCell>
                <TableCell component="th" scope="row">
                  19 March 2024
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Semester Freeze
                </TableCell>
                <TableCell component="th" scope="row">
                  20 March 2024
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ width: "40%", height: "250px" }}>
        <Typography
          sx={{
            backgroundColor: "#8390F9",
            width: "100%",
            padding: "5px 15px",
            color: "white",
          }}
          variant="h6"
        >
          Current Course Enrolled
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ minWidth: "100%", padding: "5px 15px", height: "100%" }}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead sx={{ opacity: 0.7 }}>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Teacher Name</TableCell>
                <TableCell>T/L</TableCell>
                <TableCell>P</TableCell>
                <TableCell>A</TableCell>
                <TableCell>%</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Computer Science 101
                </TableCell>
                <TableCell component="th" scope="row">
                  Sir Ali Ahmed
                </TableCell>
                <TableCell component="th" scope="row">
                  Theory
                </TableCell>
                <TableCell component="th" scope="row">
                  10
                </TableCell>
                <TableCell component="th" scope="row">
                  9
                </TableCell>
                <TableCell component="th" scope="row">
                  90%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default DataTables;
