import { useState, useEffect } from "react";
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
import {
  Enrollment,
  requestEnrollment,
  getStudentEnrollments,
  EnrollmentStatus,
} from "../api/enrollmentApi";

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
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  useEffect(() => {
    if (studentInfo?.studentId) {
      loadEnrollments();
    }
  }, [studentInfo]);

  const loadEnrollments = async () => {
    setLoading(true);
    try {
      const data = await getStudentEnrollments(studentInfo!.studentId);
      setEnrollments(data);
    } catch (err) {
      setEnrollError("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (classId: string) => {
    if (!studentInfo) return;

    try {
      setLoading(true);
      await requestEnrollment(studentInfo.studentId, classId);
      loadEnrollments(); // Refresh enrollments
    } catch (err) {
      setEnrollError("Failed to enroll in class");
    } finally {
      setLoading(false);
    }
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

      {enrollError && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {enrollError}
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