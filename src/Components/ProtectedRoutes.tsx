import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const navigate = useNavigate();
  const { token, role } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      if (allowedRoles.includes("admin")) {
        navigate("/admin-login");
      } else {
        navigate("/");
      }
    } else if (role && !allowedRoles.includes(role)) {
      navigate("/");
    }
  }, [token, role, allowedRoles, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;