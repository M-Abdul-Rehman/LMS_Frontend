import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
  Box,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { ClassData } from "../api/classApi";

interface EnrollmentContentProps {
  studentInfo: {
    studentId: string;
    firstName: string;
    lastName: string;
    session: string;
    department: string;
    rollNumber: string;
    email: string;
  } | null;
  classes: ClassData[];
  error: string | null;
  onDownload: () => void;
}

const EnrollmentContent: React.FC<EnrollmentContentProps> = ({
  studentInfo,
  classes,
  error,
  onDownload,
}) => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Course Enrollment
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Student Information */}
      {studentInfo && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Student ID: {studentInfo.studentId}
          </Typography>
          <Typography>
            <strong>Name:</strong> {studentInfo.firstName} {studentInfo.lastName}
          </Typography>
          <Typography>
            <strong>Email:</strong> {studentInfo.email}
          </Typography>
          <Typography>
            <strong>Session:</strong> {studentInfo.session}
          </Typography>
          <Typography>
            <strong>Department:</strong> {studentInfo.department}
          </Typography>
          <Typography>
            <strong>Roll Number:</strong> {studentInfo.rollNumber}
          </Typography>
        </Paper>
      )}

      {/* Available Courses */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Available Courses
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Code</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>Semester</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.length > 0 ? (
              classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell>{cls.code}</TableCell>
                  <TableCell>{cls.title}</TableCell>
                  <TableCell>{cls.department}</TableCell>
                  <TableCell>{cls.session}</TableCell>
                  <TableCell>{cls.semester}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No courses available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={onDownload}
        >
          Generate Enrollment Form
        </Button>
      </Box>
    </>
  );
};

export default EnrollmentContent;