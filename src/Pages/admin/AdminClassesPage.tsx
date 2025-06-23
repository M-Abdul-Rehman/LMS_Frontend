// src/pages/admin/AdminClassesPage.tsx
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
import { fetchAllClasses, deleteClass, updateClass, registerClass, ClassData } from '../../api/classApi';
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

interface ClassFormData {
  title: string;
  code: string;
  semester: string;
  session: string;
  department: string;
  instructorId: string;
}

const AdminClassesPage: React.FC = () => {
  const theme = useTheme();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<ClassData | null>(null);
  const [formData, setFormData] = useState<ClassFormData>({
    title: '',
    code: '',
    semester: '',
    session: '',
    department: '',
    instructorId: '',
  });
  const [error, setError] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch all classes
  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await fetchAllClasses();
        setClasses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
        setError('Failed to load classes');
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };
    loadClasses();
  }, []);

  // Form handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    const requiredFields: Array<keyof ClassFormData> = [
      'title', 'code', 'semester', 
      'session', 'department'
    ];

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }

    return true;
  };

  // Action handlers
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleModalClose = () => setModalOpen(false);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

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
    setError('');
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
    setError('');
  };

  const handleDeleteClick = (cls: ClassData) => {
    setCurrentClass(cls);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setError('');
      if (currentClass) {
        const updatedClass = await updateClass(currentClass.id, formData);
        setClasses(classes.map(c => 
          c.id === currentClass.id ? updatedClass : c
        ));
      } else {
        const createdClass = await registerClass(formData);
        setClasses([...classes, createdClass]);
      }
      setModalOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    }
  };

  const confirmDelete = async () => {
    if (!currentClass?.id) return;
    try {
      await deleteClass(currentClass.id);
      setClasses(classes.filter(c => c.id !== currentClass.id));
    } catch (error) {
      console.error('Failed to delete class:', error);
      setError('Failed to delete class');
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
              Class Management
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={handleAddClick}
              sx={{ minWidth: '180px' }}
            >
              Add New Class
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
                {classes.length > 0 ? (
                  classes.map((cls) => (
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
                          aria-label="edit"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteClick(cls)}
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
                      No classes found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Class Form Modal */}
          <Dialog 
            open={modalOpen} 
            onClose={handleModalClose}
            maxWidth="sm" 
            fullWidth
          >
            <DialogTitle>
              {currentClass ? 'Edit Class' : 'Add New Class'}
            </DialogTitle>
            <DialogContent>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              
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
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button 
                onClick={handleSubmit} 
                variant="contained" 
                color="primary"
              >
                {currentClass ? 'Update' : 'Add'}
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
                Are you sure you want to delete {currentClass?.title} ({currentClass?.code})?
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

export default AdminClassesPage;