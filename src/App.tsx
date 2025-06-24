import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoutes";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import AdminStudentsPage from "./Pages/admin/AdminStudentsPage";
import AdminClassesPage from "./Pages/admin/AdminClassesPage";
import MainPage from "./Pages/MainPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminStudentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/classes"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminClassesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
