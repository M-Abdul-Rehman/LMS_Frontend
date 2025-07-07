import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { loginSuccess } from '../features/auth/authSlice';
import {
  Modal,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';

const AdminLoginModal = () => {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    // Hardcoded admin credentials
    const adminCredentials = {
      username: 'admin',
      password: 'admin123'
    };

    if (username === adminCredentials.username && password === adminCredentials.password) {
      dispatch(loginSuccess({
        token: 'admin-token',
        role: 'admin',
        studentId: 'admin-id' // Using a dummy ID for admin
      }));
      navigate('/admin');
    } else {
      alert('Invalid admin credentials');
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="admin-login-modal"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Admin Login
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleLogin}
              disabled={!username || !password}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
};

export default AdminLoginModal;