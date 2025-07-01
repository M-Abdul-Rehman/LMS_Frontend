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
  Chip,
  CircularProgress,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { ClassData } from "../api/classApi";
import { Enrollment, EnrollmentStatus } from "../api/enrollmentApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { enrollStudent } from "../features/enrollment/enrollmentSlice";

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
  enrollments: Enrollment[];
  onDownload: () => void;
}

const EnrollmentContent: React.FC<EnrollmentContentProps> = ({
  studentInfo,
  classes,
  enrollments,
  onDownload,
}) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.enrollments);

  const handleEnroll = async (classId: string) => {
    if (!studentInfo) return;
    dispatch(enrollStudent({ 
      studentId: studentInfo.studentId, 
      classId 
    }));
  };

  const getStatus = (classId: string): EnrollmentStatus | 'not-enrolled' => {
    const enrollment = enrollments.find((e) => e.class.id === classId);
    return enrollment?.status || 'not-enrolled';
  };

  const getChipColor = (status: EnrollmentStatus) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

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
    {/* Add similar safe access for other properties */}
  </Paper>
)}

      {/* My Enrollments */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
        My Enrollments
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Code</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.length > 0 ? (
                enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell>{enrollment.class.code}</TableCell>
                    <TableCell>{enrollment.class.title}</TableCell>
                    <TableCell>
                      <Chip 
                        label={enrollment.status} 
                        color={getChipColor(enrollment.status)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No enrollments yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Available Courses */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Available Courses
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Code</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Session</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes.length > 0 ? (
                classes.map((cls) => {
                  const status = getStatus(cls.id);
                  return (
                    <TableRow key={cls.id}>
                      <TableCell>{cls.code}</TableCell>
                      <TableCell>{cls.title}</TableCell>
                      <TableCell>{cls.department}</TableCell>
                      <TableCell>{cls.session}</TableCell>
                      <TableCell>{cls.semester}</TableCell>
                      <TableCell>
                        {status === 'not-enrolled' ? (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleEnroll(cls.id)}
                            disabled={loading}
                          >
                            Enroll
                          </Button>
                        ) : (
                          <Chip
                            label={status}
                            color={getChipColor(status as EnrollmentStatus)}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No courses available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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