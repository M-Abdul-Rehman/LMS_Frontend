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

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { activeTab, academicYear } = useAppSelector((state) => state.ui);
  const { student } = useAppSelector((state) => state.student);
  const { classes } = useAppSelector((state) => state.classes);
  const { enrollments } = useAppSelector((state) => state.enrollments);
  const { studentId } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (activeTab === "enrollment" && studentId) {
      dispatch(getStudent(studentId));
      dispatch(getClasses());
      dispatch(fetchEnrollments(studentId));
    }
  }, [activeTab, dispatch, studentId]);

  const handleDownloadForm = () => {
    console.log("Downloading enrollment form");
  };

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    dispatch(setAcademicYear(event.target.value));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "enrollment":
        return (
          <EnrollmentContent
            studentInfo={student}
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