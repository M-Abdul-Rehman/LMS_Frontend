// src/Components/admin/AdminStudentsContent.tsx
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Add, Edit, Delete, Refresh } from "@mui/icons-material";
import { StudentData } from "../api/types";
import { useState } from "react";

interface AdminStudentsContentProps {
  students: StudentData[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  onAddStudent: (student: StudentData) => Promise<boolean>;
  onUpdateStudent: (id: string, data: Partial<StudentData>) => Promise<boolean>;
  onDeleteStudent: (id: string) => Promise<boolean>;
}

const AdminStudentsContent: React.FC<AdminStudentsContentProps> = ({
  students,
  isLoading,
  error,
  onRefresh,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<StudentData | null>(null);
  const [formData, setFormData] = useState<StudentData>({
    studentId: '',
    firstName: '',
    lastName: '',
    session: '',
    department: '',
    rollNumber: '',
    email: '',
    password: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    setCurrentStudent(null);
    setFormData({
      studentId: '',
      firstName: '',
      lastName: '',
      session: '',
      department: '',
      rollNumber: '',
      email: '',
      password: '',
    });
    setModalOpen(true);
  };

  const handleEditClick = (student: StudentData) => {
    setCurrentStudent(student);
    setFormData({
      studentId: student.studentId || '',
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      session: student.session || '',
      department: student.department || '',
      rollNumber: student.rollNumber || '',
      email: student.email || '',
      password: '',
    });
    setModalOpen(true);
  };

  const handleDeleteClick = (student: StudentData) => {
    setCurrentStudent(student);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async () => {
    if (currentStudent) {
      const success = await onUpdateStudent(currentStudent.studentId!, formData);
      if (success) setModalOpen(false);
    } else {
      const success = await onAddStudent(formData);
      if (success) setModalOpen(false);
    }
  };

  const confirmDelete = async () => {
    if (currentStudent?.studentId) {
      const success = await onDeleteStudent(currentStudent.studentId);
      if (success) setDeleteModalOpen(false);
    }
  };

  if (isLoading && students.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5">All Students</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={onRefresh}
          >
            Refresh
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={handleAddClick}
          >
            Add Student
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
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
            {students.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.session}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>
                  <IconButton 
                    color="primary"
                    onClick={() => handleEditClick(student)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleDeleteClick(student)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Student Form Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentStudent ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
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
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {currentStudent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {currentStudent?.firstName} {currentStudent?.lastName}?
            <br />
            <strong>This action cannot be undone.</strong>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminStudentsContent;