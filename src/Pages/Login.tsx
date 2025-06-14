import React, { useState } from "react";
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
} from "@mui/material";
import { fetchStudentById } from "../api/studentApi";
import { useNavigate } from "react-router";

const sessions = ["Fa2020", "Fa2021", "Fa2022", "Fa2023"];
const departments = ["CS", "EE", "ME", "CE"];

function Login() {
  const [session, setSession] = useState("");
  const [department, setDepartment] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleLogin = () => {
    if (!session || !department || !rollNumber || !password) {
      alert("Please fill all fields");
      return;
    }
    const studentId = `${session}-${department}-${rollNumber}`;
    fetchStudentById(studentId)
      .then((student) => {
        if (student.studentId && student.password === password) {
          navigate("/home")
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        alert("Login failed. Please try again.");
      });
  };

  const styles = {
    container: {
      backgroundImage: `url(${"https://www.oxfordscholastica.com/wp-content/uploads/2023/07/cambridge-college.jpg"})`,
      backgroundSize: "cover",
      display: "flex",
      justifyContent: "center",
      height: "100vh",
    },
    card: {
      width: 400,
      margin: "auto",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "20px",
      backgroundColor: "#fff",
    },
  };

  return (
    <Box sx={styles.container}>
      <Card variant="outlined" sx={styles.card}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
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

            <FormControl fullWidth>
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
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Login;
