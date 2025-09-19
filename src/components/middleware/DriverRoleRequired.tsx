import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../lib/AppContext";

interface DriverRoleRequiredProps {
  children: ReactNode;
}

const DriverRoleRequired: React.FC<DriverRoleRequiredProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAppContext();

  if (user?.role != "DRIVER") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default DriverRoleRequired;
