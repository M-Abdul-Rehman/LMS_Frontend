import React, { useEffect, useState, useCallback } from 'react';
import { 
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Typography, CircularProgress, Alert, Stack, Chip, IconButton, 
  Tooltip, MenuItem, Select, FormControl, InputLabel 
} from '@mui/material';
import { Refresh, CheckCircle, Cancel, Delete } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  fetchAllEnrollments, 
  updateEnrollmentStatus, 
  removeEnrollment,
  EnrollmentStatus
} from '../features/enrollment/enrollmentSlice';
import { Enrollment } from '../api/types';

const AdminEnrollmentsContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    enrollments, 
    loading, 
    error 
  } = useAppSelector((state) => state.enrollments);
  
  const [statusFilter, setStatusFilter] = useState<EnrollmentStatus | 'all'>('all');

  // Wrap loadEnrollments in useCallback to memoize it
  const loadEnrollments = useCallback(() => {
    dispatch(fetchAllEnrollments(statusFilter === 'all' ? undefined : statusFilter));
  }, [dispatch, statusFilter]);

  useEffect(() => {
    loadEnrollments();
  }, [loadEnrollments]); // Now we can safely include loadEnrollments in dependencies


  const handleApprove = async (id: string) => {
    try {
      await dispatch(updateEnrollmentStatus({ id, status: 'approved' })).unwrap();
      loadEnrollments();
    } catch (err) {
      console.error('Failed to approve enrollment:', err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await dispatch(updateEnrollmentStatus({ id, status: 'rejected' })).unwrap();
      loadEnrollments();
    } catch (err) {
      console.error('Failed to reject enrollment:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(removeEnrollment(id)).unwrap();
      loadEnrollments();
    } catch (err) {
      console.error('Failed to delete enrollment:', err);
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