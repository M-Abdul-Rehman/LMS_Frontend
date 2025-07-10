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
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const AdminLoginModal = () => {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    setError(null); // Reset previous errors
    
    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }

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
      setError('Invalid admin credentials');
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    card: {
      width: 400,
      padding: "20px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
      borderRadius: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.92)",
      backdropFilter: "blur(10px)",
    },
    errorText: {
      color: "#d32f2f",
      textAlign: "center",
      fontWeight: 500,
      marginBottom: "10px",
    },
    loginButton: {
      marginTop: "8px",
      padding: "10px 20px",
      fontWeight: "bold",
      background: "linear-gradient(45deg, #1976d2 30%, #21a1f1 90%)",
    },
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="admin-login-modal"
      sx={styles.container}
    >
      <Paper sx={styles.card}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
          Admin Login
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!username && !!error}
            helperText={!username && !!error ? "Required" : ""}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!password && !!error}
            helperText={!password && !!error ? "Required" : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && (
            <Typography variant="body2" sx={styles.errorText}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleLogin}
              disabled={!username || !password}
              sx={styles.loginButton}
            >
              Login
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Modal>
  );
};

export default AdminLoginModal;