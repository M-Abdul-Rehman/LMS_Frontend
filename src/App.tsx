import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import RegisterStudent from "./Pages/admin/RegisterStudents";
import Home from "./Pages/Home";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Result from "./Pages/Result";
import Enrollment from "./Pages/Enrollment";
import AdminDashboard from "./Pages/admin/AdminDashboard";

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
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/result"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/enrollment"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Enrollment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/register/student" element={<RegisterStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
