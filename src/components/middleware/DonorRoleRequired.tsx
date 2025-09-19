import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../lib/AppContext";

interface DonorRoleRequiredProps {
  children: ReactNode;
}

const DonorRoleRequired: React.FC<DonorRoleRequiredProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAppContext();

  if (user?.role != "DONOR") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default DonorRoleRequired;
