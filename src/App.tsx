import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoutes";
import MainPage from "./Pages/MainPage";
import AdminPage from "./Pages/admin/AdminPage";

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
      <AdminPage />
    </ProtectedRoute>
  }
/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
