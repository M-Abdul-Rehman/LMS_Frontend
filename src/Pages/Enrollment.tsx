import { 
  AppBar,
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  CircularProgress,
  useTheme,
  styled
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import NavDrawer from "../Components/NavDrawer";
import { useEffect, useState } from "react";

// Define interfaces for your data types
interface StudentInfo {
  rollNumber: string;
  program: string;
  academicStanding: string;
  name: string;
  term: string;
  allowedCreditHours: number;
  selectedCreditHours: number;
}

interface Course {
  id: number;
  code: string;
  name: string;
  hours: string;
  program: string;
  session: string;
}

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

function Enrollment() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
  };

  // Mock data initialization with proper types
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudentInfo({
        rollNumber: "Fc-2021/BSCS/142",
        program: "BSCS",
        academicStanding: "DROPPED OUT",
        name: "Muhammad Abdul Rehman",
        term: "Fc-2021",
        allowedCreditHours: 0,
        selectedCreditHours: 0
      });
      setCourses([
        { id: 1, code: "CSCS38", name: "Operating Systems Sec 1", hours: "3+4", program: "BSCS", session: "Sp-2023" },
        { id: 2, code: "CSCS38", name: "Operating Systems Sec 2", hours: "3+4", program: "BSCS", session: "Sp-2023" },
      ]);
    }, 1500);
  }, []);

  const handleDownloadForm = () => {
    console.log("Downloading enrollment form");
  };

  if (isLoading || !studentInfo) {
    return (
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: theme.palette.background.default
      }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <DashboardWrapper>
      <NavDrawer open={drawerOpen} onToggle={handleDrawerToggle} />
      
      <MainContent sx={{ 
        ml: drawerOpen ? '240px' : '56px',
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}>
        <AppBar 
          position="fixed"
          sx={{
            width: drawerOpen ? `calc(100% - 240px)` : `calc(100% - 56px)`,
            ml: drawerOpen ? '240px' : '56px',
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[1],
            p: 2,
          }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Learning Management System
            </Typography>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={handleLogout}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                py: 1
              }}
            >
              Logout
            </Button>
          </Box>
        </AppBar>
        
        <ContentArea>
          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 4,
            color: theme.palette.text.primary
          }}>
            Add Drop Courses
          </Typography>

          {/* Student Information */}
          <Paper sx={{ p: 3, mb: 4, backgroundColor: theme.palette.grey[100] }}>
            <Typography variant="h6" gutterBottom>
              Roll Number: {studentInfo.rollNumber}
            </Typography>
            <Typography>
              <strong>Program:</strong> {studentInfo.program}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              <strong>Academic Standing:</strong> {studentInfo.academicStanding}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Student Name: {studentInfo.name}
            </Typography>
            <Typography>
              <strong>Term:</strong> {studentInfo.term}
            </Typography>
            <Typography>
              <strong>Allow Credit Hours:</strong> {studentInfo.allowedCreditHours}
            </Typography>
            <Typography>
              <strong>Selected Credit Hours:</strong> {studentInfo.selectedCreditHours}
            </Typography>
          </Paper>

          {/* Note */}
          <Paper sx={{ p: 2, mb: 4, backgroundColor: theme.palette.warning.light }}>
            <Typography>
              <strong>Note:</strong> Courses Add Drop options have been closed. Kindly Download your Enrollment Form, and submit it to your Coordinator.
            </Typography>
          </Paper>

          {/* Curriculum Courses */}
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Curriculum Courses
          </Typography>

          {/* Table Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ display: 'inline-block', mr: 2 }}>
                Show
              </Typography>
              <select style={{ padding: '5px', borderRadius: '4px' }}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </Box>
            <Box>
              <Button 
                variant="contained" 
                startIcon={<Download />}
                onClick={handleDownloadForm}
                sx={{ textTransform: 'none' }}
              >
                Generate Enrollment Form
              </Button>
            </Box>
          </Box>

          {/* Courses Table */}
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: theme.palette.grey[200] }}>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>COURSE CODE</TableCell>
                  <TableCell>COURSE NAME</TableCell>
                  <TableCell>CREDIT HOURS</TableCell>
                  <TableCell>PROGRAM</TableCell>
                  <TableCell>SESSION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.id}</TableCell>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.hours}</TableCell>
                    <TableCell>{course.program}</TableCell>
                    <TableCell>{course.session}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2">
              Showing 1 to {courses.length} of 100 entries
            </Typography>
            <Box>
              <Button variant="outlined" size="small" sx={{ mr: 1 }}>Previous</Button>
              {[1, 2, 3, 4, 5].map((num) => (
                <Button 
                  key={num} 
                  variant="outlined" 
                  size="small" 
                  sx={{ minWidth: '32px', mr: 1 }}
                >
                  {num}
                </Button>
              ))}
              <Button variant="outlined" size="small">Next</Button>
            </Box>
          </Box>
        </ContentArea>
      </MainContent>
    </DashboardWrapper>
  );
}

export default Enrollment;