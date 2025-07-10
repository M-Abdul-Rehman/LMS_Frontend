import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginSuccess } from "../features/auth/authSlice";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const sessions = ["Fa2020", "Fa2021", "Fa2022", "Fa2023"];
const departments = ["CS", "EE", "ME", "CE"];

const Login: React.FC = () => {
  const [session, setSession] = useState("");
  const [department, setDepartment] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null); // Reset previous errors
    
    if (!session || !department || !rollNumber || !password) {
      setError("Please fill all fields");
      return;
    }

    const username = `${session}-${department}-${rollNumber}`;

    try {
      const response = await axios.post(
        "https://lmsbackend-production-6d1b.up.railway.app/auth/login",
        { username, password } 
      );

      // Extract role from response
      const role = response.data.user?.role || "student";
      
      dispatch(loginSuccess({ 
        token: response.data.access_token, 
        role,
        studentId: username
      }));
      
      navigate(role === "admin" ? "/admin" : "/home");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || 
        "Invalid credentials. Please try again."
      );
    }
  };

  const styles = {
    container: {
      backgroundImage: `url(${"https://www.oxfordscholastica.com/wp-content/uploads/2023/07/cambridge-college.jpg"})`,
      backgroundSize: "cover",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
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
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            University LMS
          </Typography>
          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth error={!session && !!error}>
              <InputLabel>Session</InputLabel>
              <Select
                value={session}
                label="Session"
                onChange={(e) => setSession(e.target.value)}
              >
                {sessions.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth error={!department && !!error}>
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Roll Number"
              variant="outlined"
              fullWidth
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              error={!rollNumber && !!error}
              helperText={!rollNumber && !!error ? "Required" : ""}
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
          </Box>
        </CardContent>

        <CardActions sx={{ flexDirection: "column", px: 2 }}>
          {error && (
            <Typography variant="body2" sx={styles.errorText}>
              {error}
            </Typography>
          )}
          
          <Button 
            fullWidth 
            variant="contained" 
            onClick={handleLogin}
            sx={styles.loginButton}
          >
            Sign In
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Login;