import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<string>;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserAuthorization = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (!token) {
        navigate("/");
      }
      if (role) {
        if (!allowedRoles.includes(role)) {
          navigate("/");
        }
        // Automatically upgrade student role to admin if accessing admin routes
        if (role === "admin" && window.location.pathname.startsWith("/admin")) {
          return; // Allow access
        }
      }
    };
    checkUserAuthorization();
  }, [allowedRoles, navigate]);
  return <React.Fragment>{children}</React.Fragment>;
};
export default ProtectedRoute;
