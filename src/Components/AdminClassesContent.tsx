// src/Components/admin/AdminClassesContent.tsx
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
import { ClassData } from "../api/types";
import { useState } from "react";

interface AdminClassesContentProps {
  classes: ClassData[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  onAddClass: (cls: Omit<ClassData, 'id'>) => Promise<boolean>;
  onUpdateClass: (id: string, data: Partial<ClassData>) => Promise<boolean>;
  onDeleteClass: (id: string) => Promise<boolean>;
}

const AdminClassesContent: React.FC<AdminClassesContentProps> = ({
  classes,
  isLoading,
  error,
  onRefresh,
  onAddClass,
  onUpdateClass,
  onDeleteClass,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<ClassData | null>(null);
  const [formData, setFormData] = useState<Omit<ClassData, 'id'>>({
    title: '',
    code: '',
    semester: '',
    session: '',
    department: '',
    instructorId: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    setCurrentClass(null);
    setFormData({
      title: '',
      code: '',
      semester: '',
      session: '',
      department: '',
      instructorId: '',
    });
    setModalOpen(true);
  };

  const handleEditClick = (cls: ClassData) => {
    setCurrentClass(cls);
    setFormData({
      title: cls.title,
      code: cls.code,
      semester: cls.semester,
      session: cls.session,
      department: cls.department,
      instructorId: cls.instructorId || '',
    });
    setModalOpen(true);
  };

  const handleDeleteClick = (cls: ClassData) => {
    setCurrentClass(cls);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async () => {
    if (currentClass) {
      const success = await onUpdateClass(currentClass.id, formData);
      if (success) setModalOpen(false);
    } else {
      const success = await onAddClass(formData);
      if (success) setModalOpen(false);
    }
  };

  const confirmDelete = async () => {
    if (currentClass?.id) {
      const success = await onDeleteClass(currentClass.id);
      if (success) setDeleteModalOpen(false);
    }
  };

  if (isLoading && classes.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5">All Classes</Typography>
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
            Add Class
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
              <TableCell>Code</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Instructor ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.code}</TableCell>
                <TableCell>{cls.title}</TableCell>
                <TableCell>{cls.department}</TableCell>
                <TableCell>{cls.session}</TableCell>
                <TableCell>{cls.semester}</TableCell>
                <TableCell>{cls.instructorId || '-'}</TableCell>
                <TableCell>
                  <IconButton 
                    color="primary"
                    onClick={() => handleEditClick(cls)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleDeleteClick(cls)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Class Form Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentClass ? 'Edit Class' : 'Add New Class'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            required
            value={formData.title}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Code"
            name="code"
            fullWidth
            required
            value={formData.code}
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
            label="Semester"
            name="semester"
            fullWidth
            required
            value={formData.semester}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Instructor ID"
            name="instructorId"
            fullWidth
            value={formData.instructorId}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {currentClass ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {currentClass?.title} ({currentClass?.code})?
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

export default AdminClassesContent;