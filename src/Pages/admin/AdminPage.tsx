import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { 
  Box, 
  Typography, 
  useTheme, 
  Paper,
  CircularProgress,
  Alert
} from "@mui/material";
import AdminNavDrawer from "../../Components/AdminNavDrawer";
import AdminStatsCards from "../../Components/AdminStatsCards";
import AdminRecentActivity from "../../Components/AdminRecentActivity";
import AdminStudentsContent from "../../Components/AdminStudentsContent";
import AdminClassesContent from "../../Components/AdminClassesContent";
import AdminEnrollmentsContent from "../../Components/AdminEnrollmentsContent";
import { 
  fetchAdminStudents, 
  fetchAdminClasses,
  registerStudent,
  updateStudent,
  deleteStudent,
  registerClass,
  updateClass,
  deleteClass
} from "../../features/admin/adminSlice";
import { setActiveTab, setIsLoading } from "../../features/ui/uiSlice";
import { ClassData, StudentData } from "../../api/types";

const AdminPage = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((state) => state.ui);
  const { students, classes, loading, error } = useAppSelector((state) => state.admin);
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    if (activeTab === "students" || activeTab === "classes") {
      dispatch(setIsLoading(true));
      if (activeTab === "students") {
        dispatch(fetchAdminStudents());
      } else if (activeTab === "classes") {
        dispatch(fetchAdminClasses());
      }
    }
  }, [activeTab, dispatch]);

  const handleAddStudent = async (studentData: StudentData) => {
    try {
      await dispatch(registerStudent(studentData)).unwrap();
      dispatch(fetchAdminStudents());
      return true;
    } catch (err) {
      console.error("Failed to add student:", err);
      return false;
    }
  };

  const handleUpdateStudent = async (studentId: string, data: Partial<StudentData>) => {
    try {
      await dispatch(updateStudent({ studentId, data })).unwrap();
      dispatch(fetchAdminStudents());
      return true;
    } catch (err) {
      console.error("Failed to update student:", err);
      return false;
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      await dispatch(deleteStudent(studentId)).unwrap();
      dispatch(fetchAdminStudents());
      return true;
    } catch (err) {
      console.error("Failed to delete student:", err);
      return false;
    }
  };

  const handleAddClass = async (classData: Omit<ClassData, 'id'>) => {
    try {
      await dispatch(registerClass(classData)).unwrap();
      dispatch(fetchAdminClasses());
      return true;
    } catch (err) {
      console.error("Failed to add class:", err);
      return false;
    }
  };

  const handleUpdateClass = async (classId: string, data: Partial<ClassData>) => {
    try {
      await dispatch(updateClass({ id: classId, data })).unwrap();
      dispatch(fetchAdminClasses());
      return true;
    } catch (err) {
      console.error("Failed to update class:", err);
      return false;
    }
  };

  const handleDeleteClass = async (classId: string) => {
    try {
      await dispatch(deleteClass(classId)).unwrap();
      dispatch(fetchAdminClasses());
      return true;
    } catch (err) {
      console.error("Failed to delete class:", err);
      return false;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <AdminStatsCards />
            <Box sx={{ mt: 4 }}>
              <AdminRecentActivity />
            </Box>
          </>
        );
      case "students":
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <AdminStudentsContent
              students={students}
              isLoading={loading}
              error={error}
              onRefresh={() => dispatch(fetchAdminStudents())}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
            />
          </Paper>
        );
      case "classes":
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <AdminClassesContent
              classes={classes}
              isLoading={loading}
              error={error}
              onRefresh={() => dispatch(fetchAdminClasses())}
              onAddClass={handleAddClass}
              onUpdateClass={handleUpdateClass}
              onDeleteClass={handleDeleteClass}
            />
          </Paper>
        );
      case "enrollments":
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <AdminEnrollmentsContent />
          </Paper>
        );
      default:
        return (
          <>
            <AdminStatsCards />
            <Box sx={{ mt: 4 }}>
              <AdminRecentActivity />
            </Box>
          </>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminNavDrawer
        open={drawerOpen}
        onToggle={() => setDrawerOpen(!drawerOpen)}
        onTabChange={(tab) => dispatch(setActiveTab(tab))}
        activeTab={activeTab}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px', // Matches AppBar height
          marginLeft: `0px`,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: `100%`,
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            mb: 4,
            color: theme.palette.text.primary
          }}
        >
          {activeTab === "dashboard" && "Admin Dashboard"}
          {activeTab === "students" && "Student Management"}
          {activeTab === "classes" && "Class Management"}
          {activeTab === "enrollments" && "Enrollment Management"}
        </Typography>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminPage;