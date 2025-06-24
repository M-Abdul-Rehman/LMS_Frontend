import { Box, Typography, useTheme } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DataTables: React.FC = () => {
  const theme = useTheme();

  const academicCalendar = [
    { activity: "Enrollment Start", date: "10 March 2024" },
    { activity: "Semester Start", date: "11 March 2024" },
    { activity: "Enrollment End", date: "19 March 2024" },
    { activity: "Semester Freeze", date: "20 March 2024" },
  ];

  const currentCourses = [
    {
      course: "Computer Science 101",
      teacher: "Sir Ali Ahmed",
      type: "Theory",
      present: 10,
      absent: 1,
      percentage: "90%",
    },
    {
      course: "Mathematics",
      teacher: "Dr. Sarah Khan",
      type: "Theory",
      present: 8,
      absent: 2,
      percentage: "80%",
    },
    {
      course: "Software Lab",
      teacher: "Prof. Ahmed Raza",
      type: "Practical",
      present: 12,
      absent: 0,
      percentage: "100%",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        mt: 4,
      }}
    >
      {/* Academic Calendar Table */}
      <Box
        sx={{
          flex: 1,
          boxShadow: theme.shadows[2],
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            backgroundColor: theme.palette.primary.main,
            p: 2,
            color: theme.palette.primary.contrastText,
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          Academic Calendar
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Activity</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {academicCalendar.map((item, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  <TableCell>{item.activity}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Current Courses Table */}
      <Box
        sx={{
          flex: 1,
          boxShadow: theme.shadows[2],
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            backgroundColor: theme.palette.secondary.main,
            p: 2,
            color: theme.palette.secondary.contrastText,
            fontWeight: 600,
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          Current Courses
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Teacher</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Present</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Absent</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCourses.map((course, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  <TableCell>{course.course}</TableCell>
                  <TableCell>{course.teacher}</TableCell>
                  <TableCell>{course.type}</TableCell>
                  <TableCell>{course.present}</TableCell>
                  <TableCell>{course.absent}</TableCell>
                  <TableCell>{course.percentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DataTables;
