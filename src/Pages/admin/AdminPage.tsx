// src/pages/admin/AdminPage.tsx
import { useState, useEffect } from "react";
import { Box, Typography, useTheme, styled } from "@mui/material";
import AdminNavDrawer from "../../Components/AdminNavDrawer";
import AdminStatsCards from "../../Components/AdminStatsCards";
import AdminRecentActivity from "../../Components/AdminRecentActivity";
import AdminStudentsContent from "../../Components/AdminStudentsContent";
import AdminClassesContent from "../../Components/AdminClassesContent";
import {
  fetchAllStudents,
  deleteStudent,
  updateStudent,
  registerStudent,
} from "../../api/studentApi";
import {
  fetchAllClasses,
  deleteClass,
  updateClass,
  registerClass,
} from "../../api/classApi";
import { StudentData, ClassData } from "../../api/types";
import AdminEnrollmentsContent from "../../Components/AdminEnrollmentsContent";

const DashboardWrapper = styled(Box)({
  display: "flex",
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
});

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  marginLeft: open ? 240 : 56,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  overflowY: "auto",
}));

const AdminPage = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    if (activeTab === "students" || activeTab === "classes") {
      loadData();
    }
  }, [activeTab]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (activeTab === "students") {
        const studentsData = await fetchAllStudents();
        setStudents(studentsData);
      } else if (activeTab === "classes") {
        const classesData = await fetchAllClasses();
        setClasses(classesData);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddStudent = async (studentData: StudentData) => {
    try {
      setIsLoading(true);
      const newStudent = await registerStudent(studentData);
      setStudents([...students, newStudent]);
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to add student");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStudent = async (
    studentId: string,
    studentData: Partial<StudentData>
  ) => {
    try {
      setIsLoading(true);
      const updatedStudent = await updateStudent(studentId, studentData);
      setStudents(
        students.map((s) => (s.studentId === studentId ? updatedStudent : s))
      );
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to update student");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      setIsLoading(true);
      await deleteStudent(studentId);
      setStudents(students.filter((s) => s.studentId !== studentId));
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to delete student");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClass = async (classData: Omit<ClassData, "id">) => {
    try {
      setIsLoading(true);
      const newClass = await registerClass(classData);
      setClasses([...classes, newClass]);
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to add class");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateClass = async (
    classId: string,
    classData: Partial<ClassData>
  ) => {
    try {
      setIsLoading(true);
      const updatedClass = await updateClass(classId, classData);
      setClasses(classes.map((c) => (c.id === classId ? updatedClass : c)));
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to update class");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClass = async (classId: string) => {
    try {
      setIsLoading(true);
      await deleteClass(classId);
      setClasses(classes.filter((c) => c.id !== classId));
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to delete class");
      return false;
    } finally {
      setIsLoading(false);
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
          <AdminStudentsContent
            students={students}
            isLoading={isLoading}
            error={error}
            onRefresh={loadData}
            onAddStudent={handleAddStudent}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        );
      case "classes":
        return (
          <AdminClassesContent
            classes={classes}
            isLoading={isLoading}
            error={error}
            onRefresh={loadData}
            onAddClass={handleAddClass}
            onUpdateClass={handleUpdateClass}
            onDeleteClass={handleDeleteClass}
          />
        );
      case "enrollments":
        return <AdminEnrollmentsContent />;
      default:
        return <AdminStatsCards />;
    }
  };

  return (
    <DashboardWrapper>
      <AdminNavDrawer
        open={drawerOpen}
        onToggle={handleDrawerToggle}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />
      <MainContent open={drawerOpen}>
        <ContentArea>
          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 4,
            color: theme.palette.text.primary
          }}>
            {activeTab === "dashboard" && "Admin Dashboard"}
            {activeTab === "students" && "Student Management"}
            {activeTab === "classes" && "Class Management"}
            {activeTab === "enrollments" && "Enrollment Management"}
          </Typography>
          {renderContent()}
        </ContentArea>
      </MainContent>
    </DashboardWrapper>
  );
};

export default AdminPage;
