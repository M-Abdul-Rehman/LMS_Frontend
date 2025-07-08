import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoutes";
import MainPage from "./Pages/MainPage";
import AdminPage from "./Pages/admin/AdminPage";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AdminLoginModal from "./Components/AdminLoginModal";

function App() {
  return (
    <Provider store={store}>
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
            <Route path="/admin-login" element={<AdminLoginModal />} />
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
    </Provider>
  );
}

export default App;