
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
  Snackbar,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { enrollStudent, fetchEnrollments } from "../features/enrollment/enrollmentSlice";
import { useState, useEffect } from "react";
import { getClasses } from "../features/class/classSlice";

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

interface ClassData {
  id: string;
  title: string;
  code: string;
  semester: string;
  session: string;
  department: string;
  instructorId?: string;
  createdAt?: string;
}

type EnrollmentStatus = 'pending' | 'approved' | 'rejected';

interface Enrollment {
  id: string;
  student: {
    id: string;
    firstName?: string;
    lastName?: string;
  } | null;
  class: ClassData;
  status: EnrollmentStatus;
  enrolledAt: string;
}

const EnrollmentContent: React.FC<EnrollmentContentProps> = ({
  studentInfo,
  onDownload,
}) => {
  const dispatch = useAppDispatch();
  const { enrollments, loading: enrollmentLoading, error } = useAppSelector((state) => state.enrollments);
  const { classes, loading: classLoading } = useAppSelector((state) => state.classes);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState<Record<string, 'loading' | 'idle'>>({});

  // Fetch data on component mount
  useEffect(() => {
    if (studentInfo?.studentId) {
      dispatch(fetchEnrollments(studentInfo.studentId));
      dispatch(getClasses());
    }
  }, [dispatch, studentInfo]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleEnroll = async (classId: string) => {
    if (!studentInfo) return;
    
    try {
      setEnrollmentStatus(prev => ({ ...prev, [classId]: 'loading' }));
      await dispatch(enrollStudent({ 
        studentId: studentInfo.studentId, 
        classId 
      })).unwrap();
      
      // Refresh enrollments after successful enrollment
      dispatch(fetchEnrollments(studentInfo.studentId));
    } catch (err: any) {
      console.error("Enrollment failed:", err);
      setErrorMessage(err.message || "Enrollment failed. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setEnrollmentStatus(prev => ({ ...prev, [classId]: 'idle' }));
    }
  };

  const getStatus = (classId: string): EnrollmentStatus | 'not-enrolled' => {
    const enrollment = enrollments.find((e) => e.class.id === classId);
    return enrollment?.status || 'not-enrolled';
  };

  const getChipColor = (status: EnrollmentStatus | 'not-enrolled') => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const isLoading = enrollmentLoading || classLoading;

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Course Enrollment
      </Typography>

      {/* Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage || "An error occurred. Please try again."}
        </Alert>
      </Snackbar>

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
            <strong>Department:</strong> {studentInfo.department}
          </Typography>
          <Typography>
            <strong>Session:</strong> {studentInfo.session}
          </Typography>
        </Paper>
      )}

      {/* My Enrollments */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
        My Enrollments
      </Typography>

      {isLoading ? (
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
                    No enrollments found
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

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : classes.length === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          No courses available for enrollment at this time
        </Alert>
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
              {classes.map((cls) => {
                const status = getStatus(cls.id);
                const isEnrolling = enrollmentStatus[cls.id] === 'loading';
                
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
                          disabled={isEnrolling}
                        >
                          {isEnrolling ? (
                            <CircularProgress size={24} />
                          ) : (
                            "Enroll"
                          )}
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
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={onDownload}
          disabled={isLoading}
        >
          Generate Enrollment Form
        </Button>
      </Box>
    </>
  );
};

export default EnrollmentContent;