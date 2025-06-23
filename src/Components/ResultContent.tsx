import {
  Select,
  Typography,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  SelectChangeEvent,
  Box,
} from "@mui/material";

interface ResultContentProps {
  academicYear: string;
  onYearChange: (event: SelectChangeEvent<string>) => void;
  courses: Array<{
    id: number;
    name: string;
    code: string;
    teacher: string;
    grade: string;
  }>;
}

const ResultContent: React.FC<ResultContentProps> = ({
  academicYear,
  onYearChange,
  courses,
}) => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Result
      </Typography>

      <Select
        value={academicYear}
        onChange={onYearChange}
        sx={{ width: "100%", mb: 4 }}
      >
        <MenuItem value="Fa2021">Fall 2021</MenuItem>
        <MenuItem value="Sp2022">Spring 2022</MenuItem>
        <MenuItem value="Fa2022">Fall 2022</MenuItem>
      </Select>

      <Box sx={{ mb: 4, p: 2 }}>
        <Typography variant="body1">
          <strong>Note:</strong> CGPA means Cumulative Grade Point Average and is
          the measuring grade for your overall performance during an academic
          year. SGPA is Semester Grade Point Average that adds all the CGPAs
          after an educational program.
        </Typography>
      </Box>

      <Box sx={{ mb: 4, p: 2 }}>
        <Typography variant="h5">
          <strong>Semester GPA:</strong> 3.00
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Course Name</TableCell>
              <TableCell align="center">Course Code</TableCell>
              <TableCell align="center">Course Teacher</TableCell>
              <TableCell align="center">Course Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell align="center">{course.id}</TableCell>
                <TableCell align="center">{course.name}</TableCell>
                <TableCell align="center">{course.code}</TableCell>
                <TableCell align="center">{course.teacher}</TableCell>
                <TableCell align="center">{course.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ResultContent;