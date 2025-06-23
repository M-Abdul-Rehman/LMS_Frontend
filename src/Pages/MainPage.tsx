import { useState, useEffect } from "react";
import MainLayout from "../Components/MainLayout";
import DashboardContent from "../Components/DashboardContent";
import EnrollmentContent from "../Components/EnrollmentContent";
import ResultContent from "../Components/ResultContent";
import { fetchStudentById } from "../api/studentApi";
import { fetchAllClasses } from "../api/classApi";
import { ClassData } from "../api/classApi";
import { SelectChangeEvent } from "@mui/material";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [academicYear, setAcademicYear] = useState("Fa2021");

  useEffect(() => {
    if (activeTab === "enrollment") {
      loadEnrollmentData();
    }
  }, [activeTab]);

  const loadEnrollmentData = async () => {
    try {
      setIsLoading(true);
      const student = JSON.parse(localStorage.getItem("student") || "{}");
      if (student?.studentId) {
        const studentData = await fetchStudentById(student.studentId);
        setStudentInfo(studentData);
      }
      const allClasses = await fetchAllClasses();
      setClasses(allClasses);
    } catch (err) {
      setError("Failed to load enrollment data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadForm = () => {
    console.log("Downloading enrollment form");
  };

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setAcademicYear(event.target.value);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "enrollment":
        return (
          <EnrollmentContent
            studentInfo={studentInfo}
            classes={classes}
            error={error}
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
              // ... other courses
            ]}
          />
        );
      default:
        return <DashboardContent />;
    }
  };

  return (
    <MainLayout 
      isLoading={isLoading}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </MainLayout>
  );
};

export default MainPage;