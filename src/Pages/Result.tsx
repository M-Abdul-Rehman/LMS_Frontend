import { 
  AppBar, 
  Box, 
  Button, 
  CircularProgress, 
  Select, 
  Typography, 
  MenuItem, 
  TableContainer, 
  Paper, 
  Table, 
  TableHead, 
  TableRow, 
  TableBody, 
  TableCell,
  useTheme,
  styled,
  SelectChangeEvent
} from "@mui/material";
import NavDrawer from "../Components/NavDrawer";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const DashboardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: theme.palette.grey[50],
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  padding: theme.spacing(2),
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
}));

function Result() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [academicYear, setAcademicYear] = useState('Fa2021');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setAcademicYear(event.target.value);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const courses = [
    { 
      id: 1, 
      name: "Computer Science 101", 
      code: "CS123", 
      teacher: "Ali Ahmed", 
      grade: "B+" 
    },
    { 
      id: 2, 
      name: "Data Structures", 
      code: "CS201", 
      teacher: "Sarah Khan", 
      grade: "A-" 
    },
    { 
      id: 3, 
      name: "Algorithms", 
      code: "CS301", 
      teacher: "Ahmed Raza", 
      grade: "A" 
    }
  ];

  if (isLoading) {
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
        marginLeft: drawerOpen ? '240px' : '56px',
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}>
        <StyledAppBar position="fixed" sx={{
          width: drawerOpen ? 'calc(100% - 240px)' : 'calc(100% - 56px)',
          marginLeft: drawerOpen ? '240px' : '56px',
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
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
        </StyledAppBar>
        
        <DashboardContainer>
          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 4,
            color: theme.palette.text.primary
          }}>
            Result
          </Typography>

          <Select
            value={academicYear}
            onChange={handleYearChange}
            sx={{
              width: '100%',
              mb: 4,
              backgroundColor: theme.palette.background.paper,
              '& .MuiSelect-select': {
                py: 1.5
              }
            }}
          >
            <MenuItem value="Fa2021">Fall 2021</MenuItem>
            <MenuItem value="Sp2022">Spring 2022</MenuItem>
            <MenuItem value="Fa2022">Fall 2022</MenuItem>
          </Select>

          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            p: 2,
            backgroundColor: theme.palette.warning.light,
            borderRadius: 1
          }}>
            <Typography variant="body1" sx={{ 
              fontWeight: 600,
              mr: 1,
              color: theme.palette.warning.dark
            }}>
              Note:
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              CGPA means Cumulative Grade Point Average and is the measuring grade
              for your overall performance during an academic year. SGPA is
              Semester Grade Point Average that adds all the CGPAs after an
              educational program.
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 4,
            p: 2,
            backgroundColor: theme.palette.primary.light,
            borderRadius: 1
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600,color: theme.palette.primary.contrastText }}>
              Semester GPA:
            </Typography>
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.contrastText,
            }}>
              3.00
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={{ 
            boxShadow: theme.shadows[2],
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ 
                  backgroundColor: theme.palette.grey[200],
                  '& th': {
                    fontWeight: 600,
                    py: 2
                  }
                }}>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Course Name</TableCell>
                  <TableCell align="center">Course Code</TableCell>
                  <TableCell align="center">Course Teacher</TableCell>
                  <TableCell align="center">Course Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow 
                    key={course.id}
                    hover
                    sx={{ '&:last-child td': { borderBottom: 0 } }}
                  >
                    <TableCell align="center">{course.id}</TableCell>
                    <TableCell align="center">{course.name}</TableCell>
                    <TableCell align="center">{course.code}</TableCell>
                    <TableCell align="center">{course.teacher}</TableCell>
                    <TableCell align="center" sx={{ 
                      fontWeight: 600,
                      color: course.grade === 'A' ? theme.palette.success.main : 
                             course.grade === 'B+' ? theme.palette.warning.main : 
                             theme.palette.text.primary
                    }}>
                      {course.grade}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardContainer>
      </MainContent>
    </DashboardWrapper>
  );
}

export default Result;