import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MainLayout from "../Components/MainLayout";
import DashboardContent from "../Components/DashboardContent";
import EnrollmentContent from "../Components/EnrollmentContent";
import ResultContent from "../Components/ResultContent";
import { getStudent } from "../features/student/studentSlice";
import { getClasses } from "../features/class/classSlice";
import { fetchEnrollments } from "../features/enrollment/enrollmentSlice";
import { setActiveTab, setAcademicYear } from "../features/ui/uiSlice";
import { SelectChangeEvent } from "@mui/material";

interface CourseResult {
  id: number; 
  name: string;
  code: string;
  teacher: string;
  grade: string;
}

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { activeTab, academicYear } = useAppSelector((state) => state.ui);
  const { student } = useAppSelector((state) => state.student);
  const { classes } = useAppSelector((state) => state.classes);
  const { enrollments } = useAppSelector((state) => state.enrollments);
  const { studentId } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (studentId) {
      dispatch(getStudent(studentId));
      
      if (activeTab === "enrollment") {
        dispatch(getClasses());
        dispatch(fetchEnrollments(studentId));
      }
    }
  }, [activeTab, dispatch, studentId]);

  const handleDownloadForm = () => {
    console.log("Downloading enrollment form");
  };

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    dispatch(setAcademicYear(event.target.value));
  };

  const adaptedEnrollments = enrollments.map(enrollment => ({
    ...enrollment,
    student: enrollment.student ? {
      id: enrollment.student.studentId,
      firstName: enrollment.student.firstName,
      lastName: enrollment.student.lastName
    } : null
  }));

  // Updated mock data with numeric IDs
  const mockCourses: CourseResult[] = [
    {
      id: 1,  // Now a number instead of string
      name: "Computer Science 101",
      code: "CS123",
      teacher: "Ali Ahmed",
      grade: "B+",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "enrollment":
        return (
          <EnrollmentContent
            studentInfo={student}
            classes={classes}
            enrollments={adaptedEnrollments}
            onDownload={handleDownloadForm}
          />
        );
      case "result":
        return (
          <ResultContent
            academicYear={academicYear}
            onYearChange={handleYearChange}
            courses={mockCourses}
          />
        );
      default:
        return <DashboardContent />;
    }
  };

  return (
    <MainLayout 
      activeTab={activeTab}
      onTabChange={(tab) => dispatch(setActiveTab(tab))}
    >
      {renderContent()}
    </MainLayout>
  );
};

export default MainPage;