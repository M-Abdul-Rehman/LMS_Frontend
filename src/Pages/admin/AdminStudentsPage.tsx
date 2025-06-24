import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  styled,
  Stack,
  Alert,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { fetchAllStudents, deleteStudent, updateStudent, registerStudent, StudentData } from '../../api/studentApi';
import AdminNavDrawer from '../../Components/AdminNavDrawer';

// Styled components
const DashboardWrapper = styled(Box)({
  display: "flex",
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
});

const MainContent = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
});

const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  overflowY: "auto",
}));

// Form data type with all required fields
interface StudentFormData {
  firstName: string;
  lastName: string;
  session: string;
  department: string;
  rollNumber: string;
  email: string;
  password: string;
}

const AdminStudentsPage: React.FC = () => {
  const theme = useTheme();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<StudentData | null>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    session: '',
    department: '',
    rollNumber: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch all students
  useEffect(() => {
    const abortController = new AbortController();
    const loadStudents = async () => {
      try {
        const data = await fetchAllStudents();
        setStudents(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Failed to fetch students:', error);
          setError('Failed to load students');
          setStudents([]);
        }
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
    return () => abortController.abort();
  }, []);

  // Form handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    const requiredFields: Array<{name: keyof StudentFormData, label: string}> = [
      {name: 'firstName', label: 'First Name'},
      {name: 'lastName', label: 'Last Name'},
      {name: 'session', label: 'Session'},
      {name: 'department', label: 'Department'},
      {name: 'rollNumber', label: 'Roll Number'},
      {name: 'email', label: 'Email'}
    ];

    for (const field of requiredFields) {
      if (!formData[field.name].trim()) {
        setError(`${field.label} is required`);
        return false;
      }
    }

    if (!currentStudent && !formData.password.trim()) {
      setError('Password is required for new students');
      return false;
    }

    return true;
  };

  // Action handlers
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleModalClose = () => setModalOpen(false);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const handleAddClick = () => {
    setCurrentStudent(null);
    setFormData({
      firstName: '',
      lastName: '',
      session: '',
      department: '',
      rollNumber: '',
      email: '',
      password: '',
    });
    setModalOpen(true);
    setError('');
  };

  const handleEditClick = (student: StudentData) => {
    setCurrentStudent(student);
    setFormData({
      firstName: student.firstName ?? '',
      lastName: student.lastName ?? '',
      session: student.session ?? '',
      department: student.department ?? '',
      rollNumber: student.rollNumber ?? '',
      email: student.email ?? '',
      password: '',
    });
    setModalOpen(true);
    setError('');
  };

  const handleDeleteClick = (student: StudentData) => {
    setCurrentStudent(student);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setError('');
      if (currentStudent) {
        // For updates, only include password if it was changed
        const updateData = formData.password.trim() 
          ? formData 
          : {
              firstName: formData.firstName,
              lastName: formData.lastName,
              session: formData.session,
              department: formData.department,
              rollNumber: formData.rollNumber,
              email: formData.email
            };
        
        const updatedStudent = await updateStudent(currentStudent.studentId!, updateData);
        setStudents(students.map(s => 
          s.studentId === currentStudent.studentId ? updatedStudent : s
        ));
      } else {
        // For new students, all fields are required
        if (!formData.session || !formData.department || !formData.rollNumber) {
          throw new Error('Missing required fields for student ID generation');
        }
        const studId = `${formData.session}-${formData.department}-${formData.rollNumber}`;
        const newStudent: StudentData = {
          studentId: studId.replace(/\s+/g, '-'),
          firstName: formData.firstName,
          lastName: formData.lastName,
          session: formData.session,
          department: formData.department,
          rollNumber: formData.rollNumber,
          email: formData.email,
          password: formData.password,
        };
        const createdStudent = await registerStudent(newStudent);
        setStudents([...students, createdStudent]);
      }
      setModalOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    }
  };

  const confirmDelete = async () => {
    if (!currentStudent?.studentId) return;
    try {
      await deleteStudent(currentStudent.studentId);
      setStudents(students.filter(s => s.studentId !== currentStudent.studentId));
    } catch (error) {
      console.error('Failed to delete student:', error);
      setError('Failed to delete student');
    } finally {
      setDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        backgroundColor: theme.palette.background.default 
      }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <DashboardWrapper>
      <AdminNavDrawer open={drawerOpen} onToggle={handleDrawerToggle} />
      
      <MainContent sx={{ 
        ml: drawerOpen ? '240px' : '56px',
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}>
        <ContentArea>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Student Management
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={handleAddClick}
              sx={{ minWidth: '180px' }}
            >
              Add New Student
            </Button>
          </Stack>

          {error && !modalOpen && !deleteModalOpen && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TableContainer component={Paper} sx={{ boxShadow: theme.shadows[3] }}>
            <Table>
              <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Session</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <TableRow key={student.studentId}>
                      <TableCell>{student.studentId || 'N/A'}</TableCell>
                      <TableCell>{student.firstName ? `${student.firstName} ${student.lastName}` : 'Unknown Student'}</TableCell>
                      <TableCell>{student.email || 'No email provided'}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.session}</TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>
                        <IconButton 
                          color="primary" 
                          onClick={() => handleEditClick(student)}
                          aria-label="edit"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteClick(student)}
                          aria-label="delete"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Student Form Modal */}
          <Dialog 
            open={modalOpen} 
            onClose={handleModalClose}
            maxWidth="sm" 
            fullWidth
          >
            <DialogTitle>
              {currentStudent ? 'Edit Student' : 'Add New Student'}
            </DialogTitle>
            <DialogContent>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              
              <TextField
                margin="dense"
                label="First Name"
                name="firstName"
                fullWidth
                required
                value={formData.firstName}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Last Name"
                name="lastName"
                fullWidth
                required
                value={formData.lastName}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Session"
                name="session"
                fullWidth
                required
                value={formData.session}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Department"
                name="department"
                fullWidth
                required
                value={formData.department}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Roll Number"
                name="rollNumber"
                fullWidth
                required
                value={formData.rollNumber}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Password"
                name="password"
                type="password"
                fullWidth
                required={!currentStudent}
                value={formData.password}
                onChange={handleFormChange}
                helperText={currentStudent ? "Leave blank to keep current password" : undefined}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button 
                onClick={handleSubmit} 
                variant="contained" 
                color="primary"
              >
                {currentStudent ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Modal */}
          <Dialog 
            open={deleteModalOpen} 
            onClose={handleDeleteModalClose}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete {currentStudent?.firstName} {currentStudent?.lastName}?
                <br />
                <strong>This action cannot be undone.</strong>
              </Typography>
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteModalClose}>Cancel</Button>
              <Button 
                onClick={confirmDelete} 
                color="error" 
                variant="contained"
              >
                Confirm Delete
              </Button>
            </DialogActions>
          </Dialog>
        </ContentArea>
      </MainContent>
    </DashboardWrapper>
  );
};

export default AdminStudentsPage;
