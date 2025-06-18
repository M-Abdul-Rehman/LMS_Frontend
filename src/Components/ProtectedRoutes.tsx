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
      if (role && !allowedRoles.includes(role)) {
        navigate("/");
      }
    };
    checkUserAuthorization();
  }, [allowedRoles, navigate]);
  return <React.Fragment>{children}</React.Fragment>;
};
export default ProtectedRoute;