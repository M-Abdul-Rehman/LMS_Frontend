import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Typography, CircularProgress, Alert, Stack, Chip, IconButton, 
  Tooltip, MenuItem, Select, FormControl, InputLabel 
} from '@mui/material';
import { Refresh, CheckCircle, Cancel, Delete } from '@mui/icons-material';
import { Enrollment, EnrollmentStatus, getAllEnrollments, updateEnrollmentStatus, deleteEnrollment } from '../api/enrollmentApi';

const AdminEnrollmentsContent: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<EnrollmentStatus | 'all'>('all');

  const loadEnrollments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllEnrollments(statusFilter === 'all' ? undefined : statusFilter);
      setEnrollments(data);
    } catch (err) {
      setError('Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadEnrollments();
  }, [loadEnrollments]);

  const handleApprove = async (id: string) => {
    try {
      setLoading(true);
      await updateEnrollmentStatus(id, 'approved');
      await loadEnrollments();
    } catch (err) {
      setError('Failed to approve enrollment');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setLoading(true);
      await updateEnrollmentStatus(id, 'rejected');
      await loadEnrollments();
    } catch (err) {
      setError('Failed to reject enrollment');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteEnrollment(id);
      await loadEnrollments();
    } catch (err) {
      setError('Failed to delete enrollment');
    } finally {
      setLoading(false);
    }
  };

  const getChipColor = (status: EnrollmentStatus) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStudentName = (enrollment: Enrollment) => {
    return enrollment.student 
      ? `${enrollment.student.firstName} ${enrollment.student.lastName}`
      : "Unknown Student";
  };

  const getStudentId = (enrollment: Enrollment) => {
    return enrollment.student?.studentId || "N/A";
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5">Enrollment Requests</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as EnrollmentStatus | 'all')}
              label="Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadEnrollments}
            disabled={loading}
          >
            Refresh
          </Button>
        </Stack>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading && enrollments.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.length > 0 ? (
                enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell>
                      {getStudentName(enrollment)}
                      <Typography variant="body2" color="textSecondary">
                        ID: {getStudentId(enrollment)}
                      </Typography>
                    </TableCell>
                    <TableCell>{enrollment.class.title}</TableCell>
                    <TableCell>{enrollment.class.code}</TableCell>
                    <TableCell>
                      {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={enrollment.status} 
                        color={getChipColor(enrollment.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {enrollment.status === 'pending' && (
                          <>
                            <Tooltip title="Approve">
                              <IconButton 
                                color="success"
                                onClick={() => handleApprove(enrollment.id)}
                                disabled={loading}
                              >
                                <CheckCircle />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Reject">
                              <IconButton 
                                color="error"
                                onClick={() => handleReject(enrollment.id)}
                                disabled={loading}
                              >
                                <Cancel />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        <Tooltip title="Delete">
                          <IconButton 
                            color="error"
                            onClick={() => handleDelete(enrollment.id)}
                            disabled={loading}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No enrollment requests
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default AdminEnrollmentsContent;