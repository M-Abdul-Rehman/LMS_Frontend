import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { registerStudent } from '../../api/studentApi';


const RegisterStudent: React.FC = () => {
  const [formData, setFormData] = useState({
    studentId:'',
    firstName: '',
    lastName: '',
    session: '',
    department: '',
    rollNumber: '',
    email: '',
    password: '',
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const studId = `${formData.session}-${formData.department}-${formData.rollNumber}`;
    const newStudent = { ...formData, studentId: studId }; // construct updated object

    console.log(newStudent.studentId); // ✅ will log correct value

    await registerStudent(newStudent);

    setSnackbar({
      open: true,
      message: 'Student registered successfully!',
      severity: 'success',
    });

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
  } catch (err) {
    setSnackbar({
      open: true,
      message: 'Registration failed.',
      severity: 'error',
    });
  }
};


  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Register Student
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Session"
            name="session"
            fullWidth
            margin="normal"
            value={formData.session}
            onChange={handleChange}
          />
          <TextField
            label="Department"
            name="department"
            fullWidth
            margin="normal"
            value={formData.department}
            onChange={handleChange}
          />
          <TextField
            label="Roll Number"
            name="rollNumber"
            fullWidth
            margin="normal"
            value={formData.rollNumber}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterStudent;
