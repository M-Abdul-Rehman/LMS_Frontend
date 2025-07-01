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
import { StudentData } from "../api/types";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { activeTab, academicYear } = useAppSelector((state) => state.ui);
  const { student } = useAppSelector((state) => state.student);
  const { classes } = useAppSelector((state) => state.classes);
  const { enrollments } = useAppSelector((state) => state.enrollments);

  useEffect(() => {
    if (activeTab === "enrollment") {
      const studentFromStorage = JSON.parse(
        localStorage.getItem("student") || "{}"
      );
      if (studentFromStorage?.studentId) {
        dispatch(getStudent(studentFromStorage.studentId));
        dispatch(getClasses());
        dispatch(fetchEnrollments(studentFromStorage.studentId));
      }
    }
  }, [activeTab, dispatch]);

  const handleDownloadForm = () => {
    console.log("Downloading enrollment form");
  };

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    dispatch(setAcademicYear(event.target.value));
  };
  const isValidStudent = (
    student: StudentData | null
  ): student is StudentData => {
    return !!student?.studentId;
  };
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "enrollment":
        return (
          <EnrollmentContent
            studentInfo={isValidStudent(student) ? student : null}
            classes={classes}
            enrollments={enrollments}
            onDownload={handleDownloadForm}
          />
        );
      case "result":
        return (
          <ResultContent
            academicYear={academicYear}
            onYearChange={handleYearChange}
            courses={[
              {
                id: 1,
                name: "Computer Science 101",
                code: "CS123",
                teacher: "Ali Ahmed",
                grade: "B+",
              },
            ]}
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
